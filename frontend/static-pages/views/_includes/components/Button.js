const { html } = require("common-tags");

function Button({ text, type }) {
  return html`
    <button class="button ${type}">
      <div class="button-inner">${text}</div>
    </button>
  `;
}

module.exports = Button;
