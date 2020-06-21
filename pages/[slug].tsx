import { Article, Layout } from "amdxg-components";
import { GetStaticProps } from "next";
import ReactDOMServer from "react-dom/server";
import pages from "../gen/pages.json";
import ssgConfig from "../amdxg.config";
import Head from "next/head";

type Props = {
  slug: string;
  toc: Array<any>;
  history: Array<any>;
  frontmatter: {
    description?: string;
    title: string;
    created: number;
    tags?: string[];
  };
  tags: string[];
  html: string;
};

export const config = { amp: true };

export function getStaticPaths() {
  const paths = pages.map((page) => {
    return `/${page.slug}`;
  });
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (props) => {
  const slug = props.params.slug;
  const { default: Doc, toc, frontmatter } = await import(
    `../docs/${slug}.mdx`
  );
  const { default: history } = await import(`../gen/${slug}.history.json`);
  return {
    props: {
      slug,
      toc,
      history,
      tags: frontmatter.tags || [],
      frontmatter: frontmatter || { title: slug, created: 0, tags: [] },
      html: ReactDOMServer.renderToStaticMarkup(<Doc amp />),
    } as Props,
  };
};

export default (props: Props) => (
  <>
    <Head>
      <title>
        {props.frontmatter.title} - {ssgConfig.siteName}
      </title>
      <meta property="og:title" content={props.frontmatter.title} />
      <meta
        property="og:description"
        content={props.frontmatter.description ?? ""}
      />
      <meta property="og:url" content={ssgConfig.host + "/" + props.slug} />
      <meta name="twitter:card" content="summary" />
      <meta
        property="og:image"
        content={ssgConfig.host + "/ogp/" + props.slug + ".png"}
      />
    </Head>
    <Layout config={ssgConfig}>
      <Article
        ssgConfig={ssgConfig}
        history={props.history}
        toc={props.toc}
        title={props.frontmatter.title}
        tags={props.tags}
      >
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: props.html }}
        />
      </Article>
    </Layout>
  </>
);
