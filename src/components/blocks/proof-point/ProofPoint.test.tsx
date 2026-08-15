import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

// next-intl's createNavigation Link pulls in next/navigation, which is not
// available in the jsdom unit environment. Replace it with a plain anchor so
// the block is exercised at the seam.
vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { ProofPoint } from "./ProofPoint";
import { mockProofPointProps } from "./ProofPoint.mocks";

describe("ProofPoint", () => {
  it("renders the proof statement and link label", () => {
    render(<ProofPoint {...mockProofPointProps} />);

    expect(screen.getByText(mockProofPointProps.content)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: mockProofPointProps.linkLabel })
    ).toBeInTheDocument();
  });

  it("links to the full story", () => {
    render(<ProofPoint {...mockProofPointProps} />);

    expect(
      screen.getByRole("link", { name: mockProofPointProps.linkLabel })
    ).toHaveAttribute("href", mockProofPointProps.href);
  });

  it("applies the surface as a data attribute", () => {
    render(<ProofPoint {...mockProofPointProps} />);

    expect(
      screen.getByText(mockProofPointProps.content).closest("div")
    ).toHaveAttribute("data-surface", mockProofPointProps.surface);
  });
});
