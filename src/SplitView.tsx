import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { PlatformColor } from "react-native-platform-color";

import { SplitViewColumnContainer } from "./SplitViewColumnContainer";
import { SplitViewContext } from "./SplitViewContext";
import {
  SplitViewColumn,
  SplitViewDisplayMode,
  SplitViewProps,
} from "./SplitViewTypes";
import { useCanSplit } from "./useCanSplit";

export function SplitView(props: SplitViewProps): JSX.Element {
  const { width } = useWindowDimensions();
  const {
    columns,
    preferredDisplayMode = SplitViewDisplayMode.twoBesideSecondary,
    preferredPrimaryColumnWidthFraction,
    preferredSupplementaryColumnWidthFraction,
    onDisplayModeChange,
  } = props;
  const canSplit = useCanSplit();
  const [prevPreferredDisplayMode, setPrevPreferredDisplayMode] =
    useState(preferredDisplayMode);
  const [displayMode, setDisplayMode] = useState(preferredDisplayMode);

  const primaryRef = useRef<any>();
  const supplementaryRef = useRef<any>();
  const secondaryRef = useRef<any>();
  const compactRef = useRef<any>();
  const [primaryView, setPrimaryView] = useState(
    columns[SplitView.Column.primary]
  );
  const [supplementaryView, setSupplementaryView] = useState(
    columns[SplitView.Column.supplementary]
  );
  const [secondaryView, setSecondaryView] = useState(
    columns[SplitView.Column.secondary]
  );
  const [compactView, setCompactView] = useState(
    columns[SplitView.Column.compact]
  );

  const viewController = useCallback((column: SplitViewColumn) => {
    return [primaryRef, supplementaryRef, secondaryRef, compactRef][column];
  }, []);

  const isCollapsed = useMemo(() => {
    return !canSplit;
  }, [canSplit]);

  const setViewController = useCallback(
    (view: JSX.Element, column: SplitViewColumn) => {
      [setPrimaryView, setSupplementaryView, setSecondaryView, setCompactView][
        column
      ](view);
    },
    []
  );

  const show = useCallback(
    (column: SplitViewColumn) => {
      if (displayMode === SplitViewDisplayMode.secondaryOnly) {
        if (column === SplitViewColumn.primary) {
          setDisplayMode(SplitViewDisplayMode.oneBesideSecondary);
        }
      } else if (displayMode === SplitViewDisplayMode.oneBesideSecondary) {
        if (column === SplitViewColumn.supplementary) {
          setDisplayMode(SplitViewDisplayMode.twoBesideSecondary);
        }
      }
    },
    [displayMode]
  );

  const hide = useCallback(
    (column: SplitViewColumn) => {
      if (displayMode === SplitViewDisplayMode.oneBesideSecondary) {
        if (column === SplitViewColumn.primary) {
          setDisplayMode(SplitViewDisplayMode.secondaryOnly);
        }
      } else if (displayMode === SplitViewDisplayMode.twoBesideSecondary) {
        if (column === SplitViewColumn.primary) {
          setDisplayMode(SplitViewDisplayMode.secondaryOnly);
        } else if (column === SplitViewColumn.supplementary) {
          setDisplayMode(SplitViewDisplayMode.oneBesideSecondary);
        }
      }
    },
    [displayMode]
  );

  const value = {
    isCollapsed,
    setViewController,
    viewController,
    viewControllers: {
      0: primaryRef,
      1: supplementaryRef,
      2: secondaryRef,
      3: compactRef,
    },
    displayMode,
    show,
    hide,
  };

  const primaryDisplay = [
    SplitViewDisplayMode.twoBesideSecondary,
    SplitViewDisplayMode.twoDisplaceSecondary,
    SplitViewDisplayMode.twoOverSecondary,
  ].includes(displayMode)
    ? "flex"
    : "none";

  const supplymentaryDisplay = [
    SplitViewDisplayMode.supplementaryOnly,
    SplitViewDisplayMode.twoBesideSecondary,
    SplitViewDisplayMode.twoDisplaceSecondary,
    SplitViewDisplayMode.twoOverSecondary,
  ].includes(displayMode)
    ? "flex"
    : "none";

  useEffect(() => {
    setPrevPreferredDisplayMode(preferredDisplayMode);
  }, [preferredDisplayMode]);

  useEffect(() => {
    /**
     * 当preferredDisplayMode变化且与displayMode不同时，说明
     * 是外部组件改变了preferredDisplay的值
     */
    if (preferredDisplayMode === prevPreferredDisplayMode) {
      return;
    }

    setDisplayMode(preferredDisplayMode);
  }, [preferredDisplayMode, prevPreferredDisplayMode]);

  useEffect(() => {
    if (onDisplayModeChange) {
      onDisplayModeChange(displayMode);
    }
  }, [displayMode, onDisplayModeChange]);

  const primaryWF = preferredPrimaryColumnWidthFraction ?? 0.2;
  const supplementaryWF = preferredSupplementaryColumnWidthFraction ?? 0.32;

  return (
    <SplitViewContext.Provider value={value}>
      {isCollapsed ? (
        <SplitViewColumnContainer
          ref={compactRef}
          column={SplitViewColumn.compact}
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          {compactView ?? secondaryView}
        </SplitViewColumnContainer>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <SplitViewColumnContainer
            ref={primaryRef}
            column={SplitViewColumn.primary}
            style={{
              flex: 1,
              display: primaryDisplay,
              maxWidth: width * primaryWF,
              borderRightWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
              backgroundColor: PlatformColor("systemBackground"),
            }}
          >
            {primaryView}
          </SplitViewColumnContainer>
          <SplitViewColumnContainer
            ref={supplementaryRef}
            column={SplitViewColumn.supplementary}
            style={{
              display: supplymentaryDisplay,
              flex: 1,
              maxWidth: width * supplementaryWF,
              borderRightWidth: 1,
              borderColor: "rgba(0,0,0,0.1)",
              backgroundColor: PlatformColor("systemBackground"),
            }}
          >
            {supplementaryView}
          </SplitViewColumnContainer>
          <SplitViewColumnContainer
            ref={secondaryRef}
            column={SplitViewColumn.secondary}
            style={{
              flex: 1,
              overflow: "hidden",
            }}
          >
            {secondaryView}
          </SplitViewColumnContainer>
        </View>
      )}
    </SplitViewContext.Provider>
  );
}

SplitView.DisplayMode = SplitViewDisplayMode;
SplitView.Column = SplitViewColumn;
