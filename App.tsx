import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { SplitView } from "./src";

function PrimaryColumn() {
  return (
    <View>
      <Text>PrimaryColumn</Text>
    </View>
  );
}

function SecondardColumn() {
  return (
    <View>
      <Text>SecondardColumn</Text>
    </View>
  );
}

function SupplementaryColumn() {
  return (
    <View>
      <Text>SupplementaryColumn</Text>
    </View>
  );
}

export default function App() {
  const [displayMode, setDisplayMode] = useState(
    SplitView.DisplayMode.twoBesideSecondary
  );

  return (
    <SplitView
      preferredDisplayMode={displayMode}
      onDisplayModeChange={setDisplayMode}
      columns={{
        [SplitView.Column.primary]: <PrimaryColumn></PrimaryColumn>,
        [SplitView.Column.supplementary]: (
          <SupplementaryColumn></SupplementaryColumn>
        ),
        [SplitView.Column.secondary]: <SecondardColumn></SecondardColumn>,
      }}
    ></SplitView>
  );
}
