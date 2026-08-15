import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FounderSpotlights } from "./FounderSpotlights";
import { mockFounderSpotlightsProps } from "./FounderSpotlights.mocks";

describe("FounderSpotlights", () => {
  it("renders the section heading at level 2", () => {
    render(<FounderSpotlights {...mockFounderSpotlightsProps} />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: mockFounderSpotlightsProps.heading,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders each founder's name, role one-liner and background", () => {
    render(<FounderSpotlights {...mockFounderSpotlightsProps} />);

    for (const founder of mockFounderSpotlightsProps.founders) {
      expect(
        screen.getByRole("heading", { level: 3, name: founder.name })
      ).toBeInTheDocument();
      expect(screen.getByText(founder.role)).toBeInTheDocument();
      expect(screen.getByText(founder.background)).toBeInTheDocument();
    }
  });

  it("renders one spotlight per founder", () => {
    render(<FounderSpotlights {...mockFounderSpotlightsProps} />);

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
      mockFounderSpotlightsProps.founders.length
    );
  });

  it("applies the surface as a data attribute", () => {
    const { rerender } = render(
      <FounderSpotlights {...mockFounderSpotlightsProps} />
    );
    expect(
      screen.getByText(mockFounderSpotlightsProps.heading).closest("div")
    ).toHaveAttribute("data-surface", mockFounderSpotlightsProps.surface);

    rerender(
      <FounderSpotlights {...mockFounderSpotlightsProps} surface="subtle" />
    );
    expect(
      screen.getByText(mockFounderSpotlightsProps.heading).closest("div")
    ).toHaveAttribute("data-surface", "subtle");
  });

  it("forwards an additional className", () => {
    render(
      <FounderSpotlights
        {...mockFounderSpotlightsProps}
        className="my-custom-class"
      />
    );

    expect(
      screen.getByText(mockFounderSpotlightsProps.heading).closest("div")
    ).toHaveClass("my-custom-class");
  });
});
