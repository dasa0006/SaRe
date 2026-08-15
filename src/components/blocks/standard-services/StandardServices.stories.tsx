import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "@/components/layout/section/Section";
import { StandardServices } from "./StandardServices";
import { mockStandardServicesProps } from "./StandardServices.mocks";

const meta: Meta<typeof StandardServices> = {
  title: "Blocks/StandardServices",
  component: StandardServices,
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
type Story = StoryObj<typeof StandardServices>;

export const Playground: Story = {
  args: mockStandardServicesProps,
};
