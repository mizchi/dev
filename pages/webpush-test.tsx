import Head from "next/head";
import pages from "../gen/pages.json";
import ssgConfig from "../mdxx-ssg.json";
import format from "date-fns/format";
import { Layout } from "mdxx-ssg-components";

export const config = { amp: true };

const host = ssgConfig.host;
// const host = "http://localhost:3000";

const appId = "23eccca3-c595-4532-ab6a-ac80845daf40";
function AmpWebPush(props: any) {
  return (
    // @ts-ignore
    <amp-web-push {...props} />
  );
}

function AmpImg(props: any) {
  // @ts-ignore
  return <amp-img {...props} />;
}

function AmpWebPushWidget(props: any) {
  // @ts-ignore
  return <amp-web-push-widget {...props} />;
}

function PushWidget() {
  return (
    <>
      <AmpWebPushWidget
        visibility="subscribed"
        layout="fixed"
        width="250"
        height="80"
      >
        <button
          // @ts-ignore
          on="tap:amp-web-push.unsubscribe"
        >
          Unsubscribe from Notifications
        </button>
      </AmpWebPushWidget>

      <AmpWebPushWidget
        visibility="unsubscribed"
        layout="fixed"
        width="245"
        height="45"
      >
        <button
          // @ts-ignore
          on="tap:amp-web-push.unsubscribe"
        >
          Subscribe
        </button>
      </AmpWebPushWidget>
    </>
  );
}

export default () => {
  return (
    <>
      <Head>
        <title>{ssgConfig.siteName}</title>
      </Head>
      <Layout ssgConfig={ssgConfig}>
        <AmpWebPush
          id="amp-web-push"
          layout="nodisplay"
          helper-iframe-url={`${host}/amp-web-push-helper-frame.html`}
          permission-dialog-url={`${host}/amp-web-push-permission-dialog.html`}
          service-worker-url={`${host}/sw.js`}
        />
        <PushWidget />
      </Layout>
    </>
  );
};
