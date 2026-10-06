/**
 * Redirect back to the Mizuho app immediately.
 * Intended for ASWebAuthenticationSession (iOS) / Custom Tabs (Android).
 *
 *   Success: mizuho://connect-account/result?status=success&linkageType=corporate_dc
 *   Failure: mizuho://connect-account/result?status=failure&errorCode=TEST-001
 */
(function () {
  var LINKS = {
    success:
      "mizuho://connect-account/result?status=success&linkageType=corporate_dc",
    failure:
      "mizuho://connect-account/result?status=failure&errorCode=TEST-001",
  };

  function urlFor(status) {
    return LINKS[status] || LINKS.success;
  }

  function redirect(status) {
    window.location.replace(urlFor(status));
  }

  window.MizuhoDeepLink = { redirect: redirect, urlFor: urlFor, links: LINKS };
})();
