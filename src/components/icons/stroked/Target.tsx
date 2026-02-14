import { createIcon } from "../create-icon";

export const IconTarget = createIcon(
  { displayName: "IconTarget" },
  () => (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  )
);
