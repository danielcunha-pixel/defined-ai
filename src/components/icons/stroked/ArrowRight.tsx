import { createIcon } from "../create-icon";

export const IconArrowRight = createIcon(
  { displayName: "IconArrowRight" },
  () => (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  )
);
