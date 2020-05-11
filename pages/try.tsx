import { AmpScript, Layout } from "mdxx-ssg-components";
import ssgConfig from "../mdxx-ssg.json";
import ssrBar from "../public/static/amp-script/bar/ssr";
import ssrHello from "../public/static/amp-script/hello/ssr";

export const config = {
  amp: true,
};

export default () => {
  const host =
    process.env.NODE_ENV === "production"
      ? "https://mizchi.dev/"
      : "http://localhost:3000/";
  return (
    <Layout ssgConfig={ssgConfig}>
      <AmpScript
        sandbox="allow-forms"
        layout="container"
        src={`${host}static/amp-script/bar/run.js`}
      >
        <div
          className="root"
          dangerouslySetInnerHTML={{ __html: ssrBar({}) }}
        />
      </AmpScript>

      <AmpScript
        layout="container"
        src={`${host}static/amp-script/hello/run.js`}
      >
        <div
          className="root"
          dangerouslySetInnerHTML={{ __html: ssrHello({}) }}
        />
      </AmpScript>
    </Layout>
  );
};
