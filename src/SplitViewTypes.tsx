import { MutableRefObject, ReactChild, ReactElement, ReactNode } from "react";
import { ViewStyle } from "react-native";

export type SplitPanelProp = {
  column: SplitViewColumn;
  style?: ViewStyle;
  children: ReactElement | undefined;
};

export type SplitViewProps = {
  columns: Partial<Record<SplitViewColumn, ReactElement>>;
  preferredDisplayMode?: SplitViewDisplayMode;
  preferredPrimaryColumnWidthFraction?: number;
  preferredSupplementaryColumnWidthFraction?: number | void;
  onDisplayModeChange?: (displayMode: SplitViewDisplayMode) => void;
};

export type ChildViewController<T = any> = MutableRefObject<T>;

export enum SplitViewDisplayMode {
  secondaryOnly,
  oneBesideSecondary,
  twoBesideSecondary,

  /**
   * TODO
   */
  twoDisplaceSecondary,
  /**
   * TODO
   */
  oneOverSecondary,
  /**
   * TODO
   */
  twoOverSecondary,

  /**
   * @experimental
   */
  supplementaryOnly = 30,
}

export enum SplitViewColumn {
  primary,
  supplementary,
  secondary,
  compact,
}

export type SplitViewContextState = {
  /**
   * if isCollapsed is true, show `.compact` column or `.secondary` column
   */
  isCollapsed: boolean;
  /**
   * only worked when `isCollapsed` is `true`
   */
  displayMode: SplitViewDisplayMode;
  viewController(column: SplitViewColumn): ChildViewController;
  viewControllers: Record<SplitViewColumn, ChildViewController>;
  setViewController(view: JSX.Element, column: SplitViewColumn): void;

  show(column: SplitViewColumn): void;
  hide(column: SplitViewColumn): void;
};
