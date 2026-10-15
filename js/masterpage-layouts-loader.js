document.addEventListener("DOMContentLoaded", async () => {
  const placeholders = document.querySelectorAll("[data-include]");

  await Promise.all(
    [...placeholders].map(async (placeholder) => {
      const file = placeholder.dataset.include;

      try {
        const response = await fetch(file);

        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }

        placeholder.innerHTML = await response.text();
      } catch (error) {
        console.error(error);
      }
    })
  );
});
