import { Layout } from "../components/Layout";
import { AmpScript } from "../components/AmpScript";

export const config = {
  amp: true,
};

export default () => {
  const host =
    process.env.NODE_ENV === "production"
      ? "https://mizchi.dev/"
      : "http://localhost:3000/";

  return (
    <Layout>
      <AmpScript layout="container" src={`${host}/static/amp-script/hello.js`}>
        <button>Hello amp-script!</button>
      </AmpScript>
    </Layout>
  );
};
