<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Catalogue data lives in `src/lib/catalog.ts`, basket state in `src/lib/basket.tsx` (localStorage), enquiry schema + `submitEnquiry` stub in `src/lib/enquiry.ts`; why: swap these modules for backend calls without touching pages.
- Product prices stay `null` ("Request a Quote") unless the farm supplies real figures; why: no invented prices or claims.
