import { createIcon } from "../create-icon";

export const IconXMarkFilled = createIcon(
  { displayName: "IconXMarkFilled", defaultFill: "currentColor", filled: true },
  () => (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-1.293 7.293a1 1 0 0 0-1.414 1.414L10.586 12l-1.293 1.293a1 1 0 1 0 1.414 1.414L12 13.414l1.293 1.293a1 1 0 0 0 1.414-1.414L13.414 12l1.293-1.293a1 1 0 0 0-1.414-1.414L12 10.586l-1.293-1.293Z"
    />
  )
);
