"use client";

import { Section } from "@/components/layout/section/Section";
import WipGraphic from "@/components/project-components/wip-graphic/WipGraphic";

/**
 * Index page composition component.
 *
 * Renders a full-page WipGraphic as an under-development indicator
 * for the landing page. The WipGraphic displays the brand name in
 * varied typographic treatments.
 */
export default function Index() {
  return (
    <>
      <Section surface="white">
        <WipGraphic />
      </Section>
    </>
  );
}
