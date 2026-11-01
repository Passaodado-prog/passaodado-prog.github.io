(function (window) {
  "use strict";
  const MEDIA_BASE_URL = "https://raw.githubusercontent.com/Passaodado-prog/-som-na-mesa-midias/main/";
  const hostname = String(window.location.hostname || "").toLowerCase();
  const privateIPv4 = /^(?:10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})$/.test(hostname);
  const localHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "0.0.0.0" || hostname.endsWith(".local") || privateIPv4 || window.location.protocol === "file:";
  function somNaMesaMediaUrl(path) {
    const value = String(path == null ? "" : path).trim().replace(/\\/g, "/");
    if (!value) throw new Error("O catalogo nao informou o caminho da midia.");
    if (/^(?:https?:|blob:|data:)/i.test(value)) return value;
    const relativePath = value.replace(/^\/+/, "");
    if (localHost) return new URL(relativePath, document.baseURI).href;
    return new URL(relativePath, MEDIA_BASE_URL).href;
  }
  window.somNaMesaMediaUrl = somNaMesaMediaUrl;
  window.SOM_NA_MESA_MEDIA_BASE_URL = MEDIA_BASE_URL;
})(window);