import { bulk, nanoid, uuidV4 } from "./ids.js";

const kindEl = document.getElementById("kind");
const countEl = document.getElementById("count");
const sizeEl = document.getElementById("size");
const sizeRow = document.getElementById("size-row");
const outputEl = document.getElementById("output");
const btnGen = document.getElementById("btn-gen");
const btnCopy = document.getElementById("btn-copy");
const btnClear = document.getElementById("btn-clear");
const noteEl = document.getElementById("kind-note");

function syncKind() {
  const nano = kindEl.value === "nanoid";
  sizeRow.hidden = !nano;
  noteEl.textContent = nano
    ? "NanoID：預設 URL 安全字母；長度可調（非官方套件，行為對齊常見實作）。"
    : "UUID v4：隨機；符合 RFC 4122 版本／變體位元。";
}

function generate() {
  const count = Number(countEl.value) || 1;
  const lines =
    kindEl.value === "nanoid"
      ? bulk(count, () => nanoid(Number(sizeEl.value) || 21))
      : bulk(count, uuidV4);
  outputEl.value = lines.join("\n");
}

kindEl.addEventListener("change", () => {
  syncKind();
  generate();
});
btnGen.addEventListener("click", generate);
btnClear.addEventListener("click", () => {
  outputEl.value = "";
});
btnCopy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(outputEl.value);
    btnCopy.textContent = "已複製";
    setTimeout(() => {
      btnCopy.textContent = "複製";
    }, 1500);
  } catch {
    /* ignore */
  }
});

syncKind();
generate();
