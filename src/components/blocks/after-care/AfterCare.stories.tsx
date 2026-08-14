import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "@/components/layout/section/Section";
import { AfterCare } from "./AfterCare";
import { mockAfterCareProps, mockAfterCareSurfaces } from "./AfterCare.mocks";

const meta: Meta<typeof AfterCare> = {
  title: "Blocks/AfterCare",
  component: AfterCare,
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
type Story = StoryObj<typeof AfterCare>;

export const Playground: Story = {
  args: mockAfterCareProps,
};

export const Surfaces: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "2rem" }}>
      {mockAfterCareSurfaces.map((props) => (
        <Section key={props.surface} surface={props.surface}>
          <AfterCare {...props} />
        </Section>
      ))}
    </div>
  ),
  args: mockAfterCareProps,
};
