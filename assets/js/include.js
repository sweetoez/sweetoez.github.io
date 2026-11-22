document.addEventListener("DOMContentLoaded", () => {
  async function loadSlots(root) {
    const slots = [...root.querySelectorAll("[data-include]")];
    await Promise.all(slots.map(async (slot) => {
      const name = slot.dataset.include;
      const response = await fetch(`/partials/${name}.html`);
      if (!response.ok) throw new Error(`Could not load shared partial: ${name} (${response.status})`);
      const template = document.createElement("template");
      template.innerHTML = await response.text();
      slot.replaceWith(template.content);
    }));
    if (document.querySelector("[data-include]")) await loadSlots(document);
  }
  loadSlots(document)
    .then(() => document.dispatchEvent(new Event("includes:ready")))
    .catch((error) => console.error(error));
});
