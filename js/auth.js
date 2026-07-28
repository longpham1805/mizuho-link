/**
 * Simple client-side login gate for the test flow.
 * Default account: admin / admin
 */
(function () {
  var STORAGE_KEY = "mizuho_link_auth";
  var DEFAULT_USER = "admin";
  var DEFAULT_PASS = "admin";

  function isLoggedIn() {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  }

  function login(username, password) {
    if (username === DEFAULT_USER && password === DEFAULT_PASS) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
  }

  /** Redirect to login if not authenticated. */
  function requireAuth() {
    if (!isLoggedIn()) {
      var next = encodeURIComponent(
        location.pathname.split("/").pop() + location.search
      );
      location.replace("login.html?next=" + next);
      return false;
    }
    return true;
  }

  window.MizuhoAuth = {
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    requireAuth: requireAuth,
    DEFAULT_USER: DEFAULT_USER,
  };
})();
