"use client";
import Prism from "prismjs";
import parse from "html-react-parser";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import React, { useEffect } from "react";

interface Props {
  data: string;
}

const ParseHTML = ({ data }: Props) => {
  const [parsedHtml, setParsedHtml] = React.useState<React.ReactNode | null>(
    null
  );

  useEffect(() => {
    const parsed = parse(data);
    setParsedHtml(parsed);
  }, [data]);

  useEffect(() => {
    // Highlight the code after the parsed HTML is rendered
    Prism.highlightAll();
  }, [parsedHtml]); // Run this effect when parsedHtml changes

  if (parsedHtml === null) return null;

  return <div className={"markdown w-full min-w-full"}>{parsedHtml}</div>;
};

export default ParseHTML;
