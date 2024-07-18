const { html } = require("common-tags");

function Button({ text }) {
  return html`
    <button class="button">
      <div class="button-inner">${text}</div>
    </button>
  `;
}

module.exports = Button;
