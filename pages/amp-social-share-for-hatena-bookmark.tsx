// generated by scripts/new-page.js
import Doc, {
  frontmatter,
  // @ts-ignore
} from "../docs/amp-social-share-for-hatena-bookmark.mdx";
import { Layout, Article } from "mdxx-ssg-components";
import ssgConfig from "../mdxx-ssg.json";

export const config = {
  amp: true,
};

export default () => (
  <Layout ssgConfig={ssgConfig}>
    <Article ssgConfig={ssgConfig} title={frontmatter.title}>
      <Doc amp />
    </Article>
  </Layout>
);