const { html } = require("common-tags");

function Button({ text, type, className = "" }) {
  return html`
    <button class="button ${type} ${className}">
      <div class="button-inner">${text}</div>
    </button>
  `;
}

module.exports = Button;
