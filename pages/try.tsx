import { AmpScript, Layout } from "mdxx-ssg-components";
import ssgConfig from "../mdxx-ssg.json";
import ssrBar from "../public/static/amp-script/bar/ssr";
import ssrHello from "../public/static/amp-script/hello/ssr";

export const config = {
  amp: true,
};

const host =
  process.env.NODE_ENV === "production"
    ? "https://mizchi.dev/"
    : "http://localhost:3000/";

function Bar(props: any) {
  const encoded = Buffer.from(JSON.stringify(props)).toString("base64");
  return (
    <AmpScript
      sandbox="allow-forms"
      layout="container"
      src={`${host}static/amp-script/bar/run.js`}
    >
      <div
        className="root"
        id={encoded}
        dangerouslySetInnerHTML={{ __html: ssrBar(props) }}
      />
    </AmpScript>
  );
}

function Hello(props: any) {
  const encoded = Buffer.from(JSON.stringify(props)).toString("base64");
  return (
    <AmpScript
      sandbox="allow-forms"
      layout="container"
      src={`${host}static/amp-script/hello/run.js`}
    >
      <div
        className="root"
        id={encoded}
        dangerouslySetInnerHTML={{ __html: ssrHello(props) }}
      />
    </AmpScript>
  );
}

export default () => {
  return (
    <Layout ssgConfig={ssgConfig}>
      <Hello foo={1} bar={"xxx"} />
      <Bar initialValue={3} />
    </Layout>
  );
};
