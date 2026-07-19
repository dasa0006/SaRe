"use client";

import { Section } from "../layout/section/Section";
import WipGraphic from "../project-components/wip-graphic/WipGraphic";

/**
 * Index page composition component.
 *
 * Combines Hero, FeatureGrid, and CTA blocks to form the landing page.
 * Messages are read from the `Hero`, `FeatureGrid`, and `CTA` namespaces.
 */
export default function Index() {
  return (
    <>
      <Section>
        <WipGraphic />
      </Section>
    </>
  );
}
