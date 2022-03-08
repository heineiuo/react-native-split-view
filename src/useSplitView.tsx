import { useContext } from "react";
import { SplitViewContext } from "./SplitViewContext";
import { SplitViewContextState } from "./SplitViewTypes";

export const useSplitView = (): SplitViewContextState => {
  return useContext(SplitViewContext);
};
