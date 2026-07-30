import {
  ABOUT,
  SERVICES,
  CONTACT,
  PRIVACY,
  COOKIE_POLICY,
} from "@/lib/config/routes";

// ── Types ─────────────────────────────────────────────────────────

export interface NavLink {
  /** Display label (used as fallback and for analytics). */
  label: string;
  href: string;
  /** Optional key for i18n translation under the `SiteHeader.nav` namespace. */
  i18nKey?: string;
}

export interface HeaderCTA {
  label: string;
  href: string;
}

/**
 * A surface is the background colour context a Section or Block sits on.
 *
 * - `"white"`   — light background, dark text
 * - `"subtle"`  — slightly off-white/light-grey, dark text
 * - `"dark"`    — dark background, light text
 * - `"accent"`  — brand accent background, light text
 */
export type Surface = "white" | "subtle" | "dark" | "accent";

// ── Navigation data ───────────────────────────────────────────────

export const mainNavLinks: NavLink[] = [
  { label: "Home", i18nKey: "home", href: "/" },
  { label: "Services", i18nKey: "services", href: SERVICES },
  { label: "About", i18nKey: "about", href: ABOUT },
  { label: "Contact", i18nKey: "contact", href: CONTACT },
];

export const headerCTAs: HeaderCTA[] = [];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", i18nKey: "privacy", href: PRIVACY },
  { label: "Cookie Policy", i18nKey: "cookiePolicy", href: COOKIE_POLICY },
];
