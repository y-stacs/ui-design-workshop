const isGitHubPages = location.hostname.endsWith("github.io");
const BASE_PATH = isGitHubPages ? "/ui-design-workshop/" : "/";


//find and map the page URL path for both localhost and github pages
function updateRoutePaths(root = document) {
  root.querySelectorAll("[data-route]").forEach((link) => {
    const route = link.dataset.route.replace(/^\/+/, "");
    link.href = `${BASE_PATH}${route}`;
  });
}


//find and map the page-content image path for both localhost and github pages
function updateAssetPaths(root = document) {
  root.querySelectorAll("[data-asset]").forEach((element) => {
    const assetPath = element.dataset.asset.replace(/^\/+/, "");
    element.src = `${BASE_PATH}${assetPath}`;
    // element.setAttribute("src", `${BASE_PATH}${assetPath}`);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
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

        //find and map the layout component path for both localhost and github pages
        placeholder.querySelectorAll("[data-route]").forEach((link) => {
          const route = link.dataset.route;
          link.href = `${BASE_PATH}${route}`;
        });

        //find and map the image path for both localhost and github pages
        placeholder.querySelectorAll("[data-asset]").forEach((img) => {
          img.src = `${BASE_PATH}${img.dataset.asset}`;
        });
      } catch (error) {
        console.error("Component loading error:", error);
      }
    }),
  );

  updateRoutePaths();
  updateAssetPaths();
  
});
