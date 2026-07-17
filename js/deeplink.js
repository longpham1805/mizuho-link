/**
 * Build mizuho:// deep link and return the user to the app.
 *
 * Contract (N001 ConnectAccount):
 *   Success: mizuho://connect-account/result?status=success&linkageType={type}
 *   Failure: mizuho://connect-account/result?status=failure&errorCode={code}
 *
 * Page query params (set by backend when serving HTML):
 *   ?linkageType=corporate_dc   (success)
 *   ?errorCode=APP-MSG-ERR-0001 (failure)
 *   ?auto=0                     (disable auto redirect)
 *   ?delay=1500                 (auto redirect delay in ms)
 */
(function () {
  var SCHEME = "mizuho://connect-account/result";
  var DEFAULT_DELAY_MS = 1500;

  function getParams() {
    return new URLSearchParams(window.location.search);
  }

  function buildDeepLink(status) {
    var params = getParams();
    var out = new URLSearchParams();
    out.set("status", status);

    if (status === "success") {
      var linkageType = params.get("linkageType");
      if (linkageType) out.set("linkageType", linkageType);
    } else {
      var errorCode = params.get("errorCode");
      if (errorCode) out.set("errorCode", errorCode);
    }

    return SCHEME + "?" + out.toString();
  }

  function openDeepLink(url) {
    // Custom-scheme navigation; iframe/location tricks are unreliable across browsers.
    window.location.href = url;
  }

  function init(status) {
    var deepLink = buildDeepLink(status);
    var params = getParams();
    var button = document.getElementById("return-btn");
    var hint = document.getElementById("auto-hint");
    var autoDisabled = params.get("auto") === "0";
    var delay = Number(params.get("delay"));
    if (!Number.isFinite(delay) || delay < 0) delay = DEFAULT_DELAY_MS;

    if (button) {
      button.setAttribute("href", deepLink);
      button.addEventListener("click", function (event) {
        event.preventDefault();
        openDeepLink(deepLink);
      });
    }

    if (!autoDisabled) {
      if (hint) {
        hint.hidden = false;
        hint.textContent =
          "アプリに自動で戻ります。戻らない場合は下のボタンを押してください。";
      }
      window.setTimeout(function () {
        openDeepLink(deepLink);
      }, delay);
    }
  }

  window.MizuhoDeepLink = { init: init, buildDeepLink: buildDeepLink };
})();
