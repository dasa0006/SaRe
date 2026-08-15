import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "@/components/layout/section/Section";
import { FounderSpotlights } from "./FounderSpotlights";
import {
  mockFounderSpotlightsProps,
  mockFounderSpotlightsSurfaces,
} from "./FounderSpotlights.mocks";

const meta: Meta<typeof FounderSpotlights> = {
  title: "Blocks/FounderSpotlights",
  component: FounderSpotlights,
  argTypes: {},
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Section surface="subtle">
        <Story />
      </Section>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FounderSpotlights>;

export const Playground: Story = {
  args: mockFounderSpotlightsProps,
};

export const Surfaces: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "2rem" }}>
      {mockFounderSpotlightsSurfaces.map((props) => (
        <Section key={props.surface} surface={props.surface}>
          <FounderSpotlights {...props} />
        </Section>
      ))}
    </div>
  ),
  args: mockFounderSpotlightsProps,
};
