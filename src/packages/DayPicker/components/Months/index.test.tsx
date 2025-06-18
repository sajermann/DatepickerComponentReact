import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Months } from ".";
import * as forMock from "../../hooks/useDatePickerCalendar";

describe("packages/DayPicker/components/Months", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("must return null - view mode !== months", async () => {
    vi.spyOn(forMock, "useDatePickerCalendar").mockReturnValue({
      months: [
        {
          month: 1,
          isSelected: false,
          isDisabled: false,
          onClick: () => vi.fn(),
          text: "Jan",
        },
        {
          month: 2,
          isSelected: false,
          isDisabled: false,
          onClick: () => vi.fn(),
          text: "Fev",
        },
        {
          month: 3,
          isSelected: false,
          isDisabled: false,
          onClick: () => vi.fn(),
          text: "Mar",
        },
      ],
      viewMode: "days",
    } as any);

    const { queryByText } = render(<Months />);
    expect(queryByText("Jan")).not.toBeInTheDocument();
  });

  it("must return months - view mode === months", async () => {
    vi.spyOn(forMock, "useDatePickerCalendar").mockReturnValue({
      months: [
        {
          month: 1,
          isSelected: false,
          isDisabled: false,
          onClick: () => vi.fn(),
          text: "Jan",
        },
        {
          month: 2,
          isSelected: false,
          isDisabled: false,
          onClick: () => vi.fn(),
          text: "Fev",
        },
        {
          month: 3,
          isSelected: true,
          isDisabled: true,
          onClick: () => vi.fn(),
          text: "Mar",
        },
      ],
      viewMode: "months",
    } as any);

    const { queryByText } = render(<Months />);
    expect(queryByText("Jan")).toBeInTheDocument();
    expect(queryByText("Fev")).toBeInTheDocument();
    expect(queryByText("Mar")).toBeInTheDocument();
  });
});
