import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "@/components/layout/section/Section";
import { CaseStudy } from "./CaseStudy";
import {
  mockCaseStudyProps,
  mockCaseStudyScreenshots,
  mockCaseStudySurfaces,
} from "./CaseStudy.mocks";

const meta: Meta<typeof CaseStudy> = {
  title: "Blocks/CaseStudy",
  component: CaseStudy,
  argTypes: {},
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Section>
        <Story />
      </Section>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CaseStudy>;

/** Default render — the 5-beat narrative with no screenshots (asset-agnostic). */
export const Playground: Story = {
  args: mockCaseStudyProps,
};

/** With approved screenshots slotted into the strip. */
export const WithScreenshots: Story = {
  args: {
    ...mockCaseStudyProps,
    screenshots: mockCaseStudyScreenshots,
  },
};

export const Surfaces: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "2rem" }}>
      {mockCaseStudySurfaces.map((props) => (
        <Section key={props.surface} surface={props.surface}>
          <CaseStudy {...props} />
        </Section>
      ))}
    </div>
  ),
  args: mockCaseStudyProps,
};
