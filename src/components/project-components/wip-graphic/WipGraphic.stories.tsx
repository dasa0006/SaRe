import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import WipGraphic from "./WipGraphic";

const meta = {
  title: "project-components/WipGraphic",
  component: WipGraphic,
} satisfies Meta<typeof WipGraphic>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
