import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function HorizontalRule({
  marginTop,
  marginBottom,
}: {
  marginTop?: number;
  marginBottom?: number;
}) {
  return (
    <View
      style={[styles.line, { marginTop, marginBottom }]}
      // className="border-y h-4 bg-gray-200/20 border-black/10 "
    ></View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 10,
    borderTopColor: Colors.gray,
    borderBottomColor: Colors.gray,
    backgroundColor: "rgba(229 231 235 / 0.2)",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});

export default HorizontalRule;
