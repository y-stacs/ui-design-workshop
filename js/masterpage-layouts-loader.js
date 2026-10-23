
document.addEventListener("DOMContentLoaded", async () => {
  const isGitHubPages = location.hostname.endsWith("github.io");

  const BASE_PATH = isGitHubPages
    ? "/ui-design-workshop/"
    : "/";

  const placeholders = document.querySelectorAll("[data-include]");

  await Promise.all(
    [...placeholders].map(async (placeholder) => {
      const file = placeholder.dataset.include.replace(/^\/+/, "");
      const url = `${BASE_PATH}${file}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to load ${url}`);
        }

        placeholder.innerHTML = await response.text();

        // Update navigation links after loading the component
        placeholder.querySelectorAll("[data-route]").forEach((link) => {
          const route = link.dataset.route;
          link.href = `${BASE_PATH}${route}`;
        });
      } catch (error) {
        console.error("Component loading error:", error);
      }
    })
  );
});









// document.addEventListener("DOMContentLoaded", async () => {
//   const placeholders = document.querySelectorAll("[data-include]");

//   await Promise.all(
//     [...placeholders].map(async (placeholder) => {
//       const file = placeholder.dataset.include;

//       try {
//         const response = await fetch(file);

//         if (!response.ok) {
//           throw new Error(`Failed to load ${file}`);
//         }

//         placeholder.innerHTML = await response.text();
//       } catch (error) {
//         console.error(error);
//       }
//     })
//   );
// });
