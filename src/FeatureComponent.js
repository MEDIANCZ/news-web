import React, { Component } from "react";
import "./App.css";
import { parseMarkdownLine } from "./MarkdownUtils";

export default class FeatureComponent extends Component {
  getParts(markdown) {
    return markdown.split("\n").map(parseMarkdownLine);
  }

  render() {
    return (
      <section
        className="resume-section p-3 p-lg-5 d-flex flex-column"
        id={"section-" + this.props.number.toString()}
      >
        <div className="my-auto">{this.getParts(this.props.data)}</div>
      </section>
    );
  }
}
