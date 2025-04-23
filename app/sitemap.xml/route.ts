export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const urls = ["", "/genre/action", "/genre/comedy"];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (url) => `
        <url>
          <loc>${baseUrl}${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>${url === "" ? "1.0" : "0.8"}</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
