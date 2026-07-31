import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "@/components/layout/section/Section";
import { TrustSignals } from "./TrustSignals";
import {
  mockTrustSignalsProps,
  mockTrustSignalsTextOnly,
  mockTrustSignalsWithLogos,
  mockTrustSignalsSurfaces,
} from "./TrustSignals.mocks";

const meta: Meta<typeof TrustSignals> = {
  title: "Blocks/TrustSignals",
  component: TrustSignals,
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
type Story = StoryObj<typeof TrustSignals>;

export const Playground: Story = {
  args: mockTrustSignalsProps,
};

export const TextOnly: Story = {
  args: mockTrustSignalsTextOnly,
};

export const WithLogos: Story = {
  args: mockTrustSignalsWithLogos,
};

export const Surfaces: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "2rem" }}>
      {mockTrustSignalsSurfaces.map((props) => (
        <Section key={props.surface} surface={props.surface}>
          <TrustSignals {...props} />
        </Section>
      ))}
    </div>
  ),
  args: mockTrustSignalsProps,
};
