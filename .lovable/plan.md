## Goal
Remove the "Over de winkel" page and the "Stuur ons een bericht" contact form, while improving the site's SEO with proper metadata, canonical links, and structured data.

## Changes

### 1. Remove "Over de winkel" page
- Delete `src/routes/over.tsx`
- Remove `/over` from the navigation array in `src/components/SiteLayout.tsx`
- Remove `/over` from `src/routes/sitemap[.]xml.ts`

### 2. Remove "Stuur ons een bericht" contact form
- In `src/routes/contact.tsx`: remove the entire `<form>` block and its related state (`useState`, `FormEvent`, `z`, `Send` import, `contactSchema`, `status`, `errors`, `onSubmit`)
- Keep the contact info card, opening hours, and Google Maps iframe
- Adjust layout: since the form is removed, the remaining content can use a simpler layout without the `lg:col-span-2` / `lg:col-span-1` split

### 3. SEO improvements
- `src/routes/__root.tsx`:
  - Change `<html lang="en">` to `<html lang="nl-BE">`
  - Replace placeholder meta (`title: "Lovable App"`, `description: "Lovable Generated Project"`, `og:title`, `og:description`, `author`, `twitter:site`) with proper Meso Market Lede defaults
  - Add JSON-LD `Organization` schema in `scripts`
- `src/routes/index.tsx`:
  - Add `og:url` meta tag (`content: "/"`)
  - Add canonical link (`rel: "canonical"`, `href: "/"`)
- `src/routes/contact.tsx`:
  - Add `og:url` meta tag (`content: "/contact"`)
  - Add canonical link (`rel: "canonical"`, `href: "/contact"`)

### Technical notes
- TanStack Start route file deletion (`over.tsx`) will cause the auto-generated `routeTree.gen.ts` to regenerate on next build
- All `og:url` and canonical hrefs use relative paths since no custom domain is configured yet
- The `og:image` on the home page currently references an ES module import (`hero`). Without a project URL we cannot make it absolute, so it stays as-is for now
