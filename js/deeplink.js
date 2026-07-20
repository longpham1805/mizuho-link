/**
 * Return to the Mizuho app via deep link.
 *
 * Fixed links (current test flow):
 *   Success: mizuho://connect-account/result?status=success&linkageType=corporate_dc
 *   Failure: mizuho://connect-account/result?status=failure&errorCode=TEST-001
 *
 * Optional page query params:
 *   ?auto=0     disable auto redirect
 *   ?delay=1500 auto redirect delay (ms)
 */
(function () {
  var LINKS = {
    success:
      "mizuho://connect-account/result?status=success&linkageType=corporate_dc",
    failure:
      "mizuho://connect-account/result?status=failure&errorCode=TEST-001",
  };
  var DEFAULT_DELAY_MS = 1500;

  function getParams() {
    return new URLSearchParams(window.location.search);
  }

  function openDeepLink(url) {
    window.location.href = url;
  }

  function init(status) {
    var deepLink = LINKS[status] || LINKS.success;
    var params = getParams();
    var button = document.getElementById("return-btn");
    var hint = document.getElementById("auto-hint");
    var errorCodeEl = document.getElementById("error-code");
    var autoDisabled = params.get("auto") === "0";
    var delay = Number(params.get("delay"));
    if (!Number.isFinite(delay) || delay < 0) delay = DEFAULT_DELAY_MS;

    if (status === "failure" && errorCodeEl) {
      errorCodeEl.hidden = false;
      errorCodeEl.textContent = "エラーコード: TEST-001";
    }

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

  window.MizuhoDeepLink = { init: init, links: LINKS };
})();
