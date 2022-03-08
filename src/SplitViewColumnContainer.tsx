import { cloneElement, forwardRef, useImperativeHandle, useMemo } from "react";
import { createElement, useColorScheme, View } from "react-native";

import { SplitPanelProp, SplitViewColumn } from "./SplitViewTypes";

const { secondary, compact } = SplitViewColumn;

export const SplitViewColumnContainer = forwardRef(
  function SplitViewColumnContainerInner(
    props: SplitPanelProp,
    ref
  ): JSX.Element | null {
    const { children, style, column } = props;
    const child = useMemo(() => {
      if (!children) {
        return null;
      }

      return cloneElement(children, { ref });
    }, [children]);

    return <View style={props.style}>{child}</View>;
  }
);
