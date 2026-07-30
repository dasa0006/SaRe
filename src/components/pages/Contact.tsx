"use client";

import { Section } from "@/components/layout/section/Section";
import WipGraphic from "@/components/project-components/wip-graphic/WipGraphic";

/**
 * Contact page composition component.
 *
 * Renders a full-page WipGraphic as an under-development indicator
 * for the contact page.
 */
export default function Contact() {
  return (
    <>
      <Section surface="white">
        <WipGraphic />
      </Section>
    </>
  );
}
