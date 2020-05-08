import Head from "next/head";
import pages from "../gen/pages.json";
import ssgConfig from "../mdxx-ssg.json";
import format from "date-fns/format";
import { Layout } from "mdxx-ssg-components";

export const config = { amp: true };

export default () => {
  return (
    <>
      <Head>
        <title>{ssgConfig.siteName}</title>
      </Head>
      <Layout ssgConfig={ssgConfig}>
        <div>
          {pages.map((page, index) => {
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
