import { createIcon } from "../create-icon";

export const IconInfoFilled = createIcon(
  { displayName: "IconInfoFilled", defaultFill: "currentColor", filled: true },
  () => (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm1 4a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4Z"
    />
  )
);
