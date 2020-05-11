importScripts("https://cdn.ampproject.org/sw/amp-sw.js");

/*
  Checkout https://github.com/ampproject/amp-sw/ to learn more about how to configure
*/
AMP_SW.init({
  assetCachingOptions: [
    {
      regexp: /\.(png|jpg|woff2|woff|css|js|html)/,
      cachingStrategy: "CACHE_FIRST", // options are NETWORK_FIRST | CACHE_FIRST | STALE_WHILE_REVALIDATE
    },
  ],
  // offlinePageOptions: {
  //   url: "/offline",
  //   assets: [],
  // },
});

console.log("start sw");
