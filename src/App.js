import React, { Component } from "react";
import "./App.css";
import Header from "./HeaderComponent";
import Content from "./ContentComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updates: {}
    };
  }

  compareFiles(a, b) {
    let aDate = Date.parse(a.date);
    let bDate = Date.parse(b.date);

    if (aDate < bDate) {
      return -1;
    }
    if (aDate > bDate) {
      return 1;
    }

    return 0;
  }

  getActualFilePath(props) {
    if (props.match && props.location.pathname.length > 1) {
      return decodeURIComponent(props.location.pathname.slice(1)) + ".md";
    }
    return this.state.updates[0].fileName;
  }

  fetchUpdates() {
    fetch("data/index.json")
      .then(r => r.json())
      .then(rt => rt.files.sort(this.compareFiles).reverse())
      .then(rt => this.setState({ updates: rt }))
      .catch(e => console.log("Došlo k chybě: " + e));
  }

  componentWillMount() {
    this.fetchUpdates();
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            path="/"
            children={props => {
              if (this.state.updates.length > 0) {
                let filePath = this.getActualFilePath(props);
                return (
                  <React.Fragment>
                    <Header data={this.state.updates} actualFilePath={filePath}/>
                    <Content
                      filePath={filePath}
                      hash={props.location.hash}
                    />
                  </React.Fragment>
                );
              }
              return <div />;
            }}
          />
        </React.Fragment>
      </Router>
    );
  }
}