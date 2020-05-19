import Head from "next/head";
import React from "react";
import { Layout, Slide } from "amdxg-components";
// @ts-ignore
import rawMdx from "!raw-loader!../../slides/develop-mizchi-dev.mdx";
import _config from "../../amdxg.config";
// @ts-ignore
import Doc from "../../slides/develop-mizchi-dev.mdx";

export default () => {
  return (
    <>
      <Head>
        <title>next.js で自分のブログを作る</title>
      </Head>
      <Layout config={_config}>
        <Slide rawMdx={rawMdx} />
        <div className="markdown-body" style={{ paddingTop: 20 }}>
          <hr />
          <Doc />
        </div>
      </Layout>
    </>
  );
};
