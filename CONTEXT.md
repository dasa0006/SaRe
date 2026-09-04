# SaRe

This is the domain document for the SaRe website — a production-grade Next.js marketing site with a composable architecture of Primitives, Blocks, Layouts, and Surfaces. Messages are split into pre-translated Base Messages and per-project Custom Messages.

## Language

**Primitive**:
A low-level, single-purpose presentational component with no business meaning.

**Block**:
A page-level content composer that composes primitives into a reusable marketing pattern.
_Avoid_: Section, Page Section

**Layout**:
A structural shell component responsible for page chrome and positioning.

**Surface**:
The background color context a Section or Block sits on. One of `"white"`, `"subtle"`, `"dark"`, or `"accent"`.

**Page**:
A route that composes Layout and Blocks into a complete page.

**Section**:
A narrow wrapper around Blocks providing background Surface and vertical spacing. Not to be confused with the generic concept of a "page section."
_Avoid_: Block, Page Section

**Base Message**:
A translation string whose translation cost is borne by the template author. Base Messages are pre-translated for all shipped locales before the project receives them, and are never extracted for re-translation per project.
_Avoid_: Template Message

**Custom Message**:
A translation string whose translation cost is borne by the project. Custom Messages are extracted and sent to the project's translators on every project for every locale.
_Avoid_: Project Message

**Component CSS**:
A CSS file co-located in the same directory as its component's TSX file, present only when the component defines `@layer components` classes (variants, sizes, states). Not every component has a Component CSS file — components built purely from Tailwind utility classes do not. Component CSS files use PascalCase filenames matching their component (e.g., `Section.tsx` → `Section.css`). All Component CSS files are imported explicitly by `globals.css`. This applies across all architectural categories (ui, blocks, layout, pages).
