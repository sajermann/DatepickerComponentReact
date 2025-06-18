import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from ".";

function Mock() {
  return (
    <>
      <Popover>
        <PopoverAnchor className="hover:cursor-default">
          <PopoverPortal>
            <PopoverContent>
              <PopoverArrow />
              <span>Opened</span>
            </PopoverContent>
          </PopoverPortal>
        </PopoverAnchor>
        <PopoverTrigger asChild>
          <button>Click To Open</button>
        </PopoverTrigger>
      </Popover>
    </>
  );
}

describe("packages/DatePickerMega/components/Popover", () => {
  it("must render text after trigger click", async () => {
    const { getByText, findByText, queryByText } = render(<Mock />);
    expect(queryByText("Opened")).not.toBeInTheDocument();
    const buttonToOpen = getByText("Click To Open");
    fireEvent.click(buttonToOpen);
    const openedText = await findByText("Opened");
    expect(openedText).toBeInTheDocument();
  });
});
