import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Slot } from ".";

describe("packages/DatePickerMega/components/Slot", () => {
  it("clones a valid React element and merges props", () => {
    const Child = (props: any) => <div {...props}>child</div>;
    const ref = createRef<HTMLDivElement>();

    const element = <Child data-test="original" ref={ref} />;
    const result = Slot({
      children: element,
      "data-extra": "extra",
      ref,
    }) as any;

    expect(result.props["data-test"]).toBe("original");
    expect(result.props["data-extra"]).toBe("extra");
    expect(result.ref).toBe(ref);
  });

  it("returns null if children is not a valid React element", () => {
    const result = Slot({ children: "not an element" });
    expect(result).toBeNull();
  });

  it("preserves child props when merging", () => {
    const Child = (props: any) => <span {...props}>child</span>;
    const element = <Child foo="bar" />;
    const result = Slot({ children: element, baz: "qux" }) as any;

    expect(result.props.foo).toBe("bar");
    expect(result.props.baz).toBe("qux");
  });

  it("gives priority to props.ref over child ref", () => {
    const Child = (props: any) => <span {...props}>child</span>;
    const childRef = createRef<HTMLSpanElement>();
    const propRef = createRef<HTMLSpanElement>();
    const element = <Child ref={childRef} />;
    const result = Slot({ children: element, ref: propRef }) as any;

    expect(result.ref).toBe(propRef);
  });

  it("falls back to child ref if props.ref is not provided", () => {
    const Child = (props: any) => <span {...props}>child</span>;
    const childRef = createRef<HTMLSpanElement>();
    const element = <Child ref={childRef} />;
    const result = Slot({ children: element }) as any;

    expect(result.ref).toBe(childRef);
  });
});
