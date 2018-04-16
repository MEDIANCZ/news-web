import React from "react";
import marked from "marked";
import "./App.css";
import $ from "jquery";
import ClickableImageComponent from "./ClickableImageComponent";

export const parseMarkdownLine = (l, i) => {
  let html = marked(l);
  let parsedElement = $(html)[0];
  if (
    parsedElement &&
    parsedElement.children.length === 1 &&
    parsedElement.children[0].tagName === "IMG" &&
    parsedElement.children[0].src.endsWith(".gif")
  ) {
    let imageElement = parsedElement.children[0];
    return (
      <ClickableImageComponent
        stopSource={imageElement.src.replace(".gif", ".png")}
        playSource={imageElement.src}
        key={i}
        altText={imageElement.alt}
        title={imageElement.title}
      />
    );
  } else {
    return <p dangerouslySetInnerHTML={{ __html: html }} key={i} />;
  }
};

export const parseMarkdown = markdown => {
  let parts = markdown.split("##");
  return {
    title: parts[0],
    sections: parts.slice(1).map(p => ({
      markdown: "##" + p,
      title: p.split("\n")[0]
    }))
  };
};
