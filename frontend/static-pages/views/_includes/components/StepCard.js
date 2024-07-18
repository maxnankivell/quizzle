const { html } = require("common-tags");

function StepCard({ number, text }) {
  return html`
    <div class="step-card">
      <div class="step-card-header"><h3>${number}</h3></div>
      <div class="step-card-description"><p>${text}</p></div>
    </div>
  `;
}

module.exports = StepCard;
