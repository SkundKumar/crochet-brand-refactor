# Crux SEO Audit

**Audit date:** 2026-09-17  
**Scope:** Next.js application routes, shared layout/components, product data, assets, and crawl/indexation controls in this repository.  
**Routes reviewed:** `/`, `/shop`, and `/product/[id]` (including the 63-product catalog and query-string filter/pagination behavior).

## Executive summary

The site has a good baseline for a JavaScript storefront: it uses semantic links, server-rendered route components, descriptive product image alt text in the main templates, a document language, responsive image sizing, and unique product titles/descriptions for valid product IDs. However, it is not ready for dependable organic discovery or ecommerce rich results.

The highest-impact issues are:

1. There is no `robots.txt`, `sitemap.xml`, canonical URL strategy, or `metadataBase`.
2. Unknown product IDs render the first product instead of a 404, creating duplicate/soft-404 URLs.
3. The home page has no descriptive `<h1>`; the shared logo renders `<h1>Crux</h1>` on every route.
4. There is no Product, BreadcrumbList, Organization, or WebSite JSON-LD.
5. Category links advertise query URLs that the shop page does not read, and catalog filtering/pagination is primarily client-side and not represented as crawlable route state.
6. Product images are forced to `loading="eager"` by the custom image wrapper, which can inflate initial loading cost and hurt Core Web Vitals.

## Priority scale

- **P0:** Indexation, duplicate-content, or rich-result blocker; fix before launch.
- **P1:** High-impact technical or template issue; fix in the next SEO release.
- **P2:** Important quality, UX, or content improvement.
- **P3:** Cleanup or longer-term growth opportunity.

## Route and template findings

| Priority | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|
| P0 | No crawl-control or URL discovery files | No `app/robots.ts`, `app/sitemap.ts`, `public/robots.txt`, or sitemap exists | Search engines have no first-party sitemap of the 63 product URLs and no explicit crawl policy | Add Next metadata routes for `robots.txt` and `sitemap.xml`; include home, shop, and every valid product URL. |
| P0 | No canonical URLs | [`app/layout.tsx`](./app/layout.tsx) and [`app/product/[id]/page.tsx`](./app/product/[id]/page.tsx) define no `alternates.canonical`; there is also no `metadataBase` | Query-string variants and trailing/host variants can fragment signals; Google must infer the preferred URL | Set a production `metadataBase`, emit canonical URLs for every indexable route, and decide whether `shop?category=` pages are indexable. |
| P0 | Invalid product IDs are soft 404s and duplicate the first product | [`app/product/[id]/page.tsx`](./app/product/[id]/page.tsx) lines 16 and 24 use `getProductById(id) ?? products[0]` | Every typo, stale link, or arbitrary ID can index as the first product with misleading title/content | Call `notFound()` when the ID is absent. Add `generateStaticParams()` for the 63 known products if static generation is desired. |
| P1 | Homepage has no descriptive H1; logo is an H1 on every page | [`components/boty/header.tsx`](./components/boty/header.tsx) renders an H1 logo globally; [`components/boty/hero.tsx`](./components/boty/hero.tsx) uses H2 for “Woven With Care” | The home page's primary topic is not expressed as a heading, while shop/product pages receive an extra brand H1 | Render the logo as a non-heading element/link and use one descriptive home H1 (for example, “Handcrafted Crochet Pieces”). Keep one route-specific H1 on shop and product pages. |
| P1 | Metadata is incomplete for search and social sharing | [`app/layout.tsx`](./app/layout.tsx) only sets one generic title, description, and deprecated `keywords` | No Open Graph image/title, Twitter card, locale, site URL, canonical base, or route-specific shop/home metadata; link previews will be weak | Add `metadataBase`, title templates, route metadata for home/shop, Open Graph, Twitter, and a branded social image. Remove reliance on `keywords`. |
| P1 | Product metadata omits commerce and share context | [`app/product/[id]/page.tsx`](./app/product/[id]/page.tsx) only returns `title` and `description` | Product snippets lack consistent brand/category context and social preview data | Build metadata from the product with a stable title/description, canonical URL, `openGraph.images`, product image, and a `noindex`/404 policy for invalid IDs. |
| P1 | No structured data | No JSON-LD exists anywhere in `app/` or `components/` | Product rich results, breadcrumbs, organization identity, and site search eligibility are not communicated | Add server-rendered JSON-LD: `Organization`/`WebSite` site-wide, `BreadcrumbList` on shop/product pages, and `Product` with `Offer`, `image`, `description`, `brand`, `sku`/`mpn`, availability, and price currency on product pages. Validate in Rich Results Test. |
| P1 | Category URLs are broken or misleading | [`components/boty/footer.tsx`](./components/boty/footer.tsx) links to `/shop?category=...`, but [`app/shop/page.tsx`](./app/shop/page.tsx) never reads `category` | Users and crawlers following footer category links see all products, causing intent mismatch and wasting internal-link equity | Read and validate `category` from `searchParams`; preferably make category pages server-rendered and give each allowed category a stable title, description, canonical, and index/noindex policy. |
| P1 | Catalog state is not reliably crawlable | [`app/shop/page.tsx`](./app/shop/page.tsx) is a client component; category state is not URL-synced and pagination is changed with browser history | Search engines and users cannot reliably share or discover filtered pages; server HTML does not represent a stable URL state | Move filter/pagination state to `searchParams` in a server page, preserve it in links, add `rel="next"`/`rel="prev"` only where applicable, and canonicalize or noindex thin facets. |
| P1 | Product image loading is forced eager | [`components/Image.tsx`](./components/Image.tsx) sets `loading="eager"` on every ImageKit image, regardless of `priority` | All visible and below-the-fold product images compete for bandwidth, harming LCP/INP on shop pages | Remove the unconditional eager override. Let `priority`/`loading` flow through, use `priority` only for the LCP image, and keep meaningful `sizes`. |
| P1 | Social links have incorrect destinations and labels | [`components/boty/footer.tsx`](./components/boty/footer.tsx) labels three links Instagram/Facebook/Twitter but sends all to the same X URL | Trust signals and external profile discovery are incorrect; users may report broken social links | Replace with verified, platform-specific URLs or remove unavailable profiles. Keep accessible labels aligned with the destination. |
| P2 | Footer legal/support links all resolve to home | [`components/boty/footer.tsx`](./components/boty/footer.tsx) sends privacy, terms, FAQ, shipping, returns, contact, and about links to `/` | Important trust and quality content is absent; ecommerce users and quality evaluators cannot verify policies | Create real pages (or remove links until they exist), add unique metadata, and link them from the footer. |
| P2 | Site identity is inconsistent | [`components/boty/footer.tsx`](./components/boty/footer.tsx) says “© … Boty” while metadata and headers say “Crux” | Brand inconsistency weakens entity signals and user trust | Use Crux consistently in copyright, visible copy, metadata, structured data, and social profiles. |
| P2 | Favicon MIME type is wrong | [`app/layout.tsx`](./app/layout.tsx) declares `/images/heroo.png` as `image/svg+xml` | Browsers and crawlers may ignore or mishandle the icon | Declare the actual PNG MIME type or use a correctly named SVG/PNG icon file. |
| P2 | Shared image fallback hides missing alt data | [`components/Image.tsx`](./components/Image.tsx) defaults missing alt text to `"Image"` | Generic alt text is poor accessibility and weak image relevance; future content can silently ship without useful alternatives | Require `alt` at call sites or provide a meaningful, context-specific fallback. Keep decorative imagery explicitly `alt=""`. |
| P2 | Product detail text is hidden behind client interaction | [`components/boty/product-client.tsx`](./components/boty/product-client.tsx) renders details in accordion panels with closed content at runtime | The content is present in the initial React render, but visual/JS behavior is fragile and the page has limited visible explanatory copy | Keep the core product summary, materials, care, and delivery content visibly available in semantic sections; use disclosure only for secondary detail. |
| P2 | Product copy is short and repetitive across the catalog | [`data/products.ts`](./data/products.ts) contains 63 products with brief descriptions and repeated delivery/care language | Pages may have low unique topical depth and weak long-tail relevance | Expand unique, useful copy around materials, dimensions, use cases, recipient/occasion, care, shipping, and availability without keyword stuffing. |
| P2 | Currency and offer semantics are only visual | [`components/boty/product-client.tsx`](./components/boty/product-client.tsx) displays `₹` text but no machine-readable offer data | Search engines cannot reliably infer price, currency, availability, or sale pricing | Expose `INR` and valid numeric price/availability in Product JSON-LD; ensure displayed and structured values stay synchronized. |
| P3 | Homepage imports unused sections | [`app/page.tsx`](./app/page.tsx) imports `FeatureSection`, `Testimonials`, `CTABanner`, and `Newsletter` but does not render them | Not a direct ranking issue, but it indicates missing content sections and creates maintenance noise | Either render useful, indexable content sections or remove unused imports/components. |

## Positive signals observed

- [`app/layout.tsx`](./app/layout.tsx) sets `lang="en"` and a viewport theme color.
- Valid product pages have route-specific titles and descriptions from product data.
- Main catalog and product images use descriptive product names in `alt` attributes.
- Product and shop cards use real `<a>` links through `next/link`, which is preferable to click-only navigation.
- The product page has a single route-specific H1 in [`components/boty/product-client.tsx`](./components/boty/product-client.tsx).
- Product listing images specify responsive `sizes`; this should be preserved while correcting eager loading.
- The site has a clear internal path from home to shop to product detail pages.

## Recommended implementation order

### Release 1: protect indexation and fix the critical template signals

1. Add `metadataBase`, canonical URLs, route metadata, Open Graph/Twitter metadata, and a stable brand image.
2. Add `app/robots.ts` and `app/sitemap.ts`; generate valid product URLs from the catalog.
3. Replace the product fallback with `notFound()`.
4. Fix heading hierarchy: one descriptive H1 per page, no global logo H1.
5. Fix the favicon MIME type and Crux/Boty copy inconsistency.

### Release 2: improve ecommerce eligibility and crawlable navigation

1. Add Product, BreadcrumbList, Organization, and WebSite JSON-LD.
2. Make category and pagination state server-readable and URL-stable.
3. Decide which category/facet pages are valuable indexable landing pages; canonicalize or noindex the rest.
4. Correct social links and create real policy/support pages.
5. Remove the unconditional eager image loading.

### Release 3: grow organic relevance and validate

1. Expand unique product/category content and add descriptive category introductions.
2. Add image dimensions, product availability, and inventory policy to the data model if applicable.
3. Run Lighthouse/PageSpeed on mobile and desktop, then test LCP/CLS/INP after image changes.
4. Validate all sitemap URLs, canonical tags, noindex rules, JSON-LD, and 404 behavior in Search Console and Rich Results Test.

## Acceptance checklist

- [ ] `/robots.txt` returns 200 and points to the production sitemap.
- [ ] `/sitemap.xml` contains only canonical, valid URLs and includes all intended products.
- [ ] A random invalid `/product/not-a-real-id` returns a real 404 response and no product metadata.
- [ ] Home, shop, and product pages each have exactly one descriptive H1.
- [ ] Every indexable route has one self-referencing canonical URL.
- [ ] Product pages emit valid Product and BreadcrumbList JSON-LD with INR offers.
- [ ] Category footer links show the requested category and have an intentional indexation policy.
- [ ] Social and legal links resolve to their actual destinations.
- [ ] Mobile audits confirm only the LCP image is prioritized/eager.
