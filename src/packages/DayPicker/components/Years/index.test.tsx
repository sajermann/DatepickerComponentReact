import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Years } from ".";
import * as forMock from "../../hooks/useDatePickerCalendar";

describe("packages/DayPicker/components/Years", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("must return null - view mode !== years", async () => {
    const years = [
      {
        year: 2024,
        isSelected: false,
        isDisabled: false,
        onClick: () => vi.fn(),
        text: "Jan",
      },
      {
        year: 2025,
        isSelected: false,
        isDisabled: false,
        onClick: () => vi.fn(),
        text: "Fev",
      },
      {
        year: 2026,
        isSelected: false,
        isDisabled: false,
        onClick: () => vi.fn(),
        text: "Mar",
      },
    ];
    vi.spyOn(forMock, "useDatePickerCalendar").mockReturnValue({
      years,
      viewMode: "days",
    } as any);

    const { queryByText } = render(<Years />);
    expect(queryByText(years[0].text)).not.toBeInTheDocument();
  });

  it("must return years - view mode === years", async () => {
    const years = [
      {
        year: 2024,
        isSelected: false,
        isDisabled: false,
        isThisYear: false,
        onClick: () => vi.fn(),
        text: "Jan",
      },
      {
        year: 2025,
        isSelected: false,
        isDisabled: false,
        isThisYear: false,
        onClick: () => vi.fn(),
        text: "Fev",
      },
      {
        year: 2026,
        isSelected: true,
        isDisabled: true,
        isThisYear: true,
        onClick: () => vi.fn(),
        text: "Mar",
      },
    ];
    vi.spyOn(forMock, "useDatePickerCalendar").mockReturnValue({
      years,
      viewMode: "years",
    } as any);

    const { queryByText } = render(<Years />);
    expect(queryByText(years[0].text)).toBeInTheDocument();
    expect(queryByText(years[1].text)).toBeInTheDocument();
    expect(queryByText(years[2].text)).toBeInTheDocument();
  });
});
