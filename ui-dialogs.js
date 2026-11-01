/*
 * Componente único de confirmações, avisos e erros do SOM NA MESA.
 * Use SomNaMesaDialogs.confirm(), .alert(), .warning() ou .error().
 * Não use alert(), confirm() ou prompt() nativos no código do projeto.
 */
(() => {
  "use strict";

  if (window.SomNaMesaDialogs) return;

  const dialog = document.createElement("dialog");
  dialog.className = "smd-dialog";
  dialog.setAttribute("aria-labelledby", "smdDialogTitle");
  dialog.setAttribute("aria-describedby", "smdDialogMessage");
  dialog.innerHTML = `
    <section class="smd-dialog-card">
      <button class="smd-dialog-close" type="button" aria-label="Fechar janela">×</button>
      <div class="smd-dialog-icon" aria-hidden="true"></div>
      <p class="smd-dialog-eyebrow">SOM NA MESA</p>
      <h2 id="smdDialogTitle"></h2>
      <p id="smdDialogMessage" class="smd-dialog-message"></p>
      <section class="smd-dialog-detail" hidden>
        <h3></h3>
        <p></p>
      </section>
      <div class="smd-dialog-actions">
        <button class="smd-dialog-btn smd-dialog-btn-primary" type="button" data-smd-confirm>Confirmar</button>
        <button class="smd-dialog-btn smd-dialog-btn-secondary" type="button" data-smd-cancel>Cancelar</button>
      </div>
    </section>
  `;
  document.body.appendChild(dialog);

  const icon = dialog.querySelector(".smd-dialog-icon");
  const eyebrow = dialog.querySelector(".smd-dialog-eyebrow");
  const title = dialog.querySelector("#smdDialogTitle");
  const message = dialog.querySelector("#smdDialogMessage");
  const detail = dialog.querySelector(".smd-dialog-detail");
  const detailTitle = detail.querySelector("h3");
  const detailMessage = detail.querySelector("p");
  const confirmButton = dialog.querySelector("[data-smd-confirm]");
  const cancelButton = dialog.querySelector("[data-smd-cancel]");
  const closeButton = dialog.querySelector(".smd-dialog-close");

  const queue = [];
  let active = null;

  function normalizeOptions(input, mode) {
    const options = typeof input === "string" ? { message: input } : (input || {});
    const kind = options.kind || (mode === "confirm" ? "warning" : "info");
    const defaults = {
      info: { icon: "ℹ️", eyebrow: "INFORMAÇÃO", title: "Aviso" },
      success: { icon: "✅", eyebrow: "CONCLUÍDO", title: "Tudo certo" },
      warning: { icon: "⚠️", eyebrow: "ATENÇÃO", title: "Confira antes de continuar" },
      error: { icon: "⛔", eyebrow: "NÃO FOI POSSÍVEL", title: "Verifique esta informação" },
      danger: { icon: "🗑️", eyebrow: "AÇÃO IMPORTANTE", title: "Confirmar ação?" }
    };
    const preset = defaults[kind] || defaults.info;
    return {
      mode,
      kind,
      icon: options.icon || preset.icon,
      eyebrow: options.eyebrow || preset.eyebrow,
      title: options.title || preset.title,
      message: options.message || "Confira as informações antes de continuar.",
      detailTitle: options.detailTitle || "O que vai acontecer?",
      detail: options.detail || "",
      confirmText: options.confirmText || (mode === "alert" ? "Entendi" : "Confirmar"),
      cancelText: options.cancelText || "Cancelar",
      danger: options.danger === true || kind === "danger"
    };
  }

  function finish(result) {
    if (!active) return;
    const current = active;
    active = null;
    if (dialog.open && typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("smd-dialog-open");
    if (current.previousFocus && current.previousFocus.isConnected && typeof current.previousFocus.focus === "function") {
      current.previousFocus.focus();
    }
    current.resolve(Boolean(result));
    window.setTimeout(showNext, 0);
  }

  function showNext() {
    if (active || !queue.length) return;
    active = queue.shift();
    active.previousFocus = document.activeElement;
    const options = active.options;
    icon.textContent = options.icon;
    eyebrow.textContent = options.eyebrow;
    title.textContent = options.title;
    message.textContent = options.message;
    detail.hidden = !options.detail;
    detailTitle.textContent = options.detailTitle;
    detailMessage.textContent = options.detail;
    confirmButton.textContent = options.confirmText;
    cancelButton.textContent = options.cancelText;
    cancelButton.hidden = options.mode === "alert";
    confirmButton.className = options.danger
      ? "smd-dialog-btn smd-dialog-btn-danger"
      : "smd-dialog-btn smd-dialog-btn-primary";
    dialog.dataset.kind = options.kind;
    document.body.classList.add("smd-dialog-open");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    confirmButton.focus();
  }

  function enqueue(input, mode) {
    const options = normalizeOptions(input, mode);
    return new Promise((resolve) => {
      queue.push({ options, resolve, previousFocus: null });
      showNext();
    });
  }

  confirmButton.addEventListener("click", () => finish(true));
  cancelButton.addEventListener("click", () => finish(false));
  closeButton.addEventListener("click", () => finish(active && active.options.mode === "alert"));
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    finish(active && active.options.mode === "alert");
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) finish(active && active.options.mode === "alert");
  });

  window.SomNaMesaDialogs = Object.freeze({
    confirm(options) { return enqueue(options, "confirm"); },
    alert(options) { return enqueue(options, "alert"); },
    info(options) { return enqueue({ ...(typeof options === "string" ? { message: options } : options), kind: "info" }, "alert"); },
    warning(options) { return enqueue({ ...(typeof options === "string" ? { message: options } : options), kind: "warning" }, "alert"); },
    error(options) { return enqueue({ ...(typeof options === "string" ? { message: options } : options), kind: "error" }, "alert"); }
  });
})();
