import React, { Component } from "react";
import marked from "marked";
import "./App.css";
import $ from "jquery";
import FeatureComponent from "./FeatureComponent";
import { parseMarkdown } from "./MarkdownUtils";

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  getSections() {
    if (this.state.data.sections) {
      return this.state.data.sections.map((s, i) => (
        <FeatureComponent data={s.markdown} key={i.toString()} number={i} />
      ));
    } else {
      return [];
    }
  }

  getTitle() {
    if (this.state.data.title) {
      let html = { __html: marked(this.state.data.title) };
      return <div className="p-3 p-lg-5" dangerouslySetInnerHTML={html} />;
    } else {
      return <React.Fragment />;
    }
  }

  getNavigation() {
    let sections = this.state.data.sections;
    if (sections) {
      return (
        <div className="p-3 p-lg-5">
          <p>
            Níže naleznete seznam nejdůležitějších změn. Většina z nových funkcí
            a oprav v této verzi vznikla na základě Vašich připomínek. Děkujeme!
          </p>

          <p>
            Při spuštění aplikace se dostupná aktualizace nabídne sama. Pokud
            byste měli jakékoliv otázky ohledně nových verzí, neváhejte se na
            nás obrátit.
          </p>

          <strong>Seznam změn:</strong>
          <ul>
            {sections.map((s, i) => (
              <li key={i.toString()} className="feature-link">
                <a href={"#" + i}>{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <div />;
  }

  fetchUpdate(fileName) {
    fetch(fileName)
      .then(r => r.text())
      .then(r => parseMarkdown(r))
      .then(rt => this.setState({ data: rt }))
      .catch(e => console.log("Došlo k chybě: " + e));
  }

  scrollTo(top, speed) {
    $("html").animate({ scrollTop: top }, speed);
  }

  scrollToFeature(hash) {
    if (hash) {
      let element = $("#section-" + hash.slice(1));
      if (element.length > 0) {
        this.scrollTo(element[0].offsetTop, 500);
      }
    } else {
      this.scrollTo(0, 0);
    }
  }

  componentDidUpdate(prev) {
    this.scrollToFeature(this.props.hash);

    if (this.props.filePath !== prev.filePath) {
      //Stahujeme jen v případě, kdy se aktualizoval zdrojový soubor
      this.fetchUpdate("data/" + this.props.filePath);
    }
  }

  componentWillMount() {
    this.fetchUpdate("data/" + this.props.filePath);
  }

  render() {
    let sections = this.getSections();
    return (
      <div className="container-fluid p-0">
        {this.getTitle()}
        {this.getNavigation()}
        {sections}
      </div>
    );
  }
}
