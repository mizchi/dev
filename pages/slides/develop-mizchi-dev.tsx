import { useState, useEffect } from "react";
import Head from "next/head";
import React from "react";
import { Layout } from "amdxg-components";
// @ts-ignore
import rawMdx from "!raw-loader!../../slides/develop-mizchi-dev.mdx";
import _config from "../../amdxg.config";
// @ts-ignore
import * as amdx from "amdx";
import { compile } from "amdx-runner";
import vfile from "vfile";
// @ts-ignore
import Doc from "../../slides/develop-mizchi-dev.mdx";

export default () => {
  const file = vfile();
  file.contents = rawMdx;

  // @ts-ignore
  const parsed = amdx.parseFileToAst(file);
  parsed.childern = parsed.children.filter((node) => {
    return !["yaml", "import", "export"].includes(node.type);
  });

  const blocks = [];
  let breakCount = 0;
  for (const node of parsed.children) {
    if (node.type === "thematicBreak") {
      breakCount++;
    } else {
      if (blocks[breakCount] == null) {
        blocks[breakCount] = [node];
      } else {
        blocks[breakCount].push(node);
      }
    }
  }

  const documents = blocks.map((b) => {
    // @ts-ignore
    const hast = amdx.parseAstToHast({ type: "root", children: b });
    return compile(hast, {
      components: {},
      h: React.createElement,
      Fragment: React.Fragment,
      props: {},
    });
  });

  return (
    <>
      <Head>
        <title>next.js で自分のブログを作る</title>
      </Head>
      <Layout config={_config}>
        <Slide documents={documents} />
        <div className="markdown-body" style={{ paddingTop: 20 }}>
          <hr />
          <Doc />
        </div>
      </Layout>
    </>
  );
};

function Slide(props: { documents: Array<any> }) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      console.log(ev);
      if (ev.key === "ArrowRight") {
        if (page < props.documents.length - 1) {
          setPage((n) => n + 1);
        }
      }

      if (ev.key === "ArrowLeft") {
        if (page > 0) {
          setPage((n) => n - 1);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [page]);
  return (
    <>
      <div>
        <button disabled={page <= 0} onClick={() => setPage((n) => n - 1)}>
          prev
        </button>
        |
        <button
          disabled={page >= props.documents.length - 1}
          onClick={() => setPage((n) => n + 1)}
        >
          next
        </button>
        &nbsp;
        <span>
          {page + 1}/{props.documents.length}
        </span>
      </div>
      <hr />
      <div
        style={{
          width: "100%",
          height: "60vh",
          padding: 15,
          overflow: "auto",
          fontSize: "2em",
          background: "#fff",
        }}
      >
        <div className="markdown-body">{props.documents[page]}</div>
      </div>
    </>
  );
}

// export default () => <>wip</>;
