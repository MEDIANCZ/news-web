import React, { Component } from "react";
import "./ClickableImageComponent.css";

export default class ClickableImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false
    };
  }

  render() {
    return (
      <div
        className="image-container"
        onClick={() => this.setState({ play: !this.state.play })}
      >
        <img
          src={this.state.play ? this.props.playSource : this.props.stopSource}
          className="inner-image"
          key="play-image"
          alt={this.props.altText}
          title={this.props.title}
        />
        {this.state.play ? null : (
          <div className="image-overlay" key="image-overlay">
            <div className="image-overlay-content">
              <i className="far fa-play-circle" />
            </div>
          </div>
        )}
      </div>
    );
  }
}
