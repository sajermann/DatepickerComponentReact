import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { delay } from "~/utils/delay";
import { Button } from ".";

describe("Components/Button", () => {
  it(`should call function onClick`, async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Button
        data-testid="Button"
        disabled={false}
        colorStyle="mono"
        type="button"
        onClick={onClick}
      >
        Clique aqui
      </Button>
    );
    const button = getByTestId("Button");
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });

  it(`should be disabled`, async () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Button data-testid="Button" disabled type="button" onClick={onClick}>
        Clique aqui
      </Button>
    );
    const button = getByTestId("Button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it(`should be disabled`, async () => {
    let ttt = false;

    const onClick = () => {
      ttt = true;
    };

    const { getByTestId } = render(
      <Button
        data-testid="Button"
        colorStyle="mono"
        type="button"
        onClick={onClick}
      >
        Clique aqui
      </Button>
    );
    const button = getByTestId("Button");
    await userEvent.click(button);
    await delay(3000);
    await waitFor(() => {
      expect(ttt).toBe(true);
    });
  });
});
