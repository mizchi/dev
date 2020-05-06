import Head from "next/head";
import pages from "../gen/pages.json";
import ssgConfig from "../mdxx-ssg.json";
import format from "date-fns/format";
import { Layout } from "../components/Layout";

import sortBy from "lodash.sortby";

export const config = { amp: true };

export default () => {
  return (
    <>
      <Head>
        <title>{ssgConfig.siteName}</title>
      </Head>
      <Layout>
        <div>
          {sortBy(pages, (p) => -p.created).map((page, index) => {
            // @ts-ignore
            const formatted = format(
              page.created as number,
              "yyyy/MM/dd/HH:mm"
            );
            return (
              <div key={index} style={{ paddingTop: 10 }}>
                <span>{formatted}</span>:&nbsp;
                <a href={"/" + page.slug}>{page.title}</a>
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
};
