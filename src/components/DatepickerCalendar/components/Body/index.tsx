import { memo } from "react";
import { Months } from "../Months";
import { Weeks } from "../Weeks";
import { Years } from "../Years";

export const Body = memo(() => {
  return (
    <main className="w-full flex flex-col">
      <Weeks />
      <Months />
      <Years />
    </main>
  );
});
