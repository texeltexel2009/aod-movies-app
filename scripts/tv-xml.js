const fs = require("fs");
const moviesList = require("./data/discovertvshows.json");
const prettier = require("prettier");
const getDate = new Date().toISOString();
const YOUR_AWESOME_DOMAIN = "https://yourdomain.name";
const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });
const changefreq = "monthly";
const priority = 0.8;

(async () => {
  const postList = [];
  moviesList.forEach((post) => postList.push(post.slug));

  const postListSitemap = `
        ${postList
          .map((id) => {
            return `
              <url>
                <loc>${`${YOUR_AWESOME_DOMAIN}/tv-shows/${id}`}</loc>
                <lastmod>${getDate}</lastmod>
                <changefreq>${changefreq}</changefreq>
                <priority>${priority}</priority>
              </url>`;
          })
          .join("")}
      `;

  const generatedSitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        >
          ${postListSitemap}
        </urlset>
      `;

  const formattedSitemap = [formatted(generatedSitemap)];
  // Creates xml sitemap with the name of `sitemap_movies` under public folder
  fs.writeFileSync(
    "../public/sitemap_tvshows.xml",
    formattedSitemap.toString(),
    "utf8"
  );
})();
