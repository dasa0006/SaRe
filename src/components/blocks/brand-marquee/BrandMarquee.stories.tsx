import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BrandMarquee } from "./BrandMarquee";

const meta = {
  title: "Blocks/BrandMarquee",
  component: BrandMarquee,
} satisfies Meta<typeof BrandMarquee>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
