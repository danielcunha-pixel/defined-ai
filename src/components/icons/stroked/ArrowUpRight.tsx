import { createIcon } from "../create-icon";

export const IconArrowUpRight = createIcon(
  { displayName: "IconArrowUpRight" },
  () => (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  )
);
