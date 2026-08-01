import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "@/components/layout/section/Section";
import { ServicesPreview } from "./ServicesPreview";
import {
  mockServicesPreviewProps,
  mockServicesPreviewSurfaces,
} from "./ServicesPreview.mocks";

const meta: Meta<typeof ServicesPreview> = {
  title: "Blocks/ServicesPreview",
  component: ServicesPreview,
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
type Story = StoryObj<typeof ServicesPreview>;

export const Playground: Story = {
  args: mockServicesPreviewProps,
};

export const Surfaces: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "2rem" }}>
      {mockServicesPreviewSurfaces.map((props) => (
        <Section key={props.surface} surface={props.surface}>
          <ServicesPreview {...props} />
        </Section>
      ))}
    </div>
  ),
  args: mockServicesPreviewProps,
};
