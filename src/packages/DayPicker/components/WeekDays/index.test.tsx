import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WeekDays } from ".";
import * as forMock from "../../hooks/useDatePickerCalendar";

describe("packages/DayPicker/components/WeekDays", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("must return null - view mode !== days", async () => {
    const headers = [
      {
        text: "Sun",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Mon",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Tue",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Wed",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Thu",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Fri",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Sat",
        isSelectedAllDays: false,
        isDisabled: false,
      },
    ];

    vi.spyOn(forMock, "useDatePickerCalendar").mockReturnValue({
      headers,
      viewMode: "months",
    } as any);

    const { queryByText } = render(<WeekDays />);
    expect(queryByText(headers[0].text)).not.toBeInTheDocument();
  });

  it("must return week days header - view mode === days", async () => {
    const headers = [
      {
        text: "Sun",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Mon",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Tue",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Wed",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Thu",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Fri",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Sat",
        isSelectedAllDays: false,
        isDisabled: false,
      },
    ];
    vi.spyOn(forMock, "useDatePickerCalendar").mockReturnValue({
      headers,
      viewMode: "days",
    } as any);

    const { queryByText } = render(<WeekDays />);
    expect(queryByText(headers[0].text)).toBeInTheDocument();
    expect(queryByText(headers[1].text)).toBeInTheDocument();
    expect(queryByText(headers[2].text)).toBeInTheDocument();
  });

  it("must return week days header button - view mode === days", async () => {
    const headers = [
      {
        text: "Sun",
        isSelectedAllDays: true,
        isDisabled: false,
        disabled: false,
      },
      {
        text: "Mon",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Tue",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Wed",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Thu",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Fri",
        isSelectedAllDays: false,
        isDisabled: false,
      },
      {
        text: "Sat",
        isSelectedAllDays: false,
        isDisabled: false,
      },
    ];
    vi.spyOn(forMock, "useDatePickerCalendar").mockReturnValue({
      headers,
      viewMode: "days",
      multi: {
        enableHeaderSelection: true,
      },
    } as any);

    const { getAllByRole } = render(<WeekDays />);
    expect(getAllByRole("button").length).toBe(headers.length);
  });
});
