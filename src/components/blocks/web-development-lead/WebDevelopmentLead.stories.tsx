import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "@/components/layout/section/Section";
import { WebDevelopmentLead } from "./WebDevelopmentLead";
import {
  mockWebDevelopmentLeadProps,
  mockWebDevelopmentLeadSurfaces,
} from "./WebDevelopmentLead.mocks";

const meta: Meta<typeof WebDevelopmentLead> = {
  title: "Blocks/WebDevelopmentLead",
  component: WebDevelopmentLead,
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
type Story = StoryObj<typeof WebDevelopmentLead>;

export const Playground: Story = {
  args: mockWebDevelopmentLeadProps,
};

export const Surfaces: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "2rem" }}>
      {mockWebDevelopmentLeadSurfaces.map((props) => (
        <Section key={props.surface} surface={props.surface}>
          <WebDevelopmentLead {...props} />
        </Section>
      ))}
    </div>
  ),
  args: mockWebDevelopmentLeadProps,
};
