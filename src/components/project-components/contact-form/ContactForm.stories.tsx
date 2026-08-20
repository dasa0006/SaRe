import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import { Section } from "@/components/layout/section/Section";
import { ContactForm } from "./ContactForm";
import { mockContactFormProps } from "./ContactForm.mocks";

const meta: Meta<typeof ContactForm> = {
  title: "Project Components/ContactForm",
  component: ContactForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={{}}>
        <Section surface="subtle">
          <Story />
        </Section>
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContactForm>;

export const Default: Story = {
  args: mockContactFormProps,
};

export const Success: Story = {
  args: { ...mockContactFormProps, initialStatus: "success" },
};

export const Error: Story = {
  args: { ...mockContactFormProps, initialStatus: "error" },
};
