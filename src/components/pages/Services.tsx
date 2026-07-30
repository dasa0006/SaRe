"use client";

import { Section } from "@/components/layout/section/Section";
import WipGraphic from "@/components/project-components/wip-graphic/WipGraphic";

/**
 * Services page composition component.
 *
 * Renders a full-page WipGraphic as an under-development indicator
 * for the services page.
 */
export default function Services() {
  return (
    <>
      <Section surface="white">
        <WipGraphic />
      </Section>
    </>
  );
}
