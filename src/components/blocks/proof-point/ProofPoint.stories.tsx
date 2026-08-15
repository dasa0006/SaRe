import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "@/components/layout/section/Section";
import { ProofPoint } from "./ProofPoint";
import {
  mockProofPointProps,
  mockProofPointSurfaces,
} from "./ProofPoint.mocks";

const meta: Meta<typeof ProofPoint> = {
  title: "Blocks/ProofPoint",
  component: ProofPoint,
  argTypes: {},
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Section surface="accent">
        <Story />
      </Section>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProofPoint>;

export const Playground: Story = {
  args: mockProofPointProps,
};

export const Surfaces: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "2rem" }}>
      {mockProofPointSurfaces.map((props) => (
        <Section key={props.surface} surface={props.surface}>
          <ProofPoint {...props} />
        </Section>
      ))}
    </div>
  ),
  args: mockProofPointProps,
};
