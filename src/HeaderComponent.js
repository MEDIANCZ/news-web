import React, { Component } from "react";
import "./App.css";
import { NavLink } from "react-router-dom";
import $ from "jquery";

function MenuItem(props) {
  let url = encodeURIComponent(props.fileName.replace(".md", ""));
  let className = "nav-link js-scroll-trigger";
  if (props.actualFilePath === props.fileName) {
    className += " active";
  }
  return (
    <li className="nav-item">
      <NavLink className={className} to={{ pathname: url }}>
        {props.title}
      </NavLink>
    </li>
  );
}

export default class Header extends Component {
  getItems() {
    if (this.props.data.length > 0) {
      return this.props.data.map((f, i) => (
        <MenuItem
          fileName={f.fileName}
          title={f.title}
          actualFilePath={this.props.actualFilePath}
          key={i.toString()}
        />
      ));
    } else {
      return [];
    }
  }

  componentDidMount() {
    $(".nano").nanoScroller({ scroll: "top" });
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
        id="sideNav"
      >
        <a className="navbar-brand js-scroll-trigger" href="#page-top">
          <span className="d-block d-lg-none">Kiwi & Fenix software</span>
          <span className="d-none d-lg-block mx-auto mb-2">
            <img
              className="img-fluid img-logo fenix-logo"
              src="img/fenix.png"
              alt=""
            />
            <img
              className="img-fluid img-logo kiwi-logo"
              src="img/kiwi.png"
              alt=""
            />
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="nano">
            <div className="nano-content">
              <ul className="navbar-nav">{this.getItems()}</ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
