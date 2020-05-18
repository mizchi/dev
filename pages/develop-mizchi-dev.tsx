import Head from "next/head";
import { Layout } from "amdxg-components";
// @ts-ignore
import { frontmatter } from "../slides/develop-mizchi-dev.mdx";
// @ts-ignore
import rawMdx from "!raw-loader!../slides/develop-mizchi-dev.mdx";

import config from "../amdxg.config";
import pages from "../gen/pages.json";
import { parse } from "amdx";

export const config = { amp: true };

export default () => {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <Layout config={config}></Layout>
    </>
  );
};
