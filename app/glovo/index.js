import React from "react";
import { StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";

import AnimatedCircles from "../../containers/glovo/AnimatedCircles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const GlovoScreen = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="#FFC244FF" />
      <GestureHandlerRootView style={styles.container}>
        <AnimatedCircles />
      </GestureHandlerRootView>
    </>
  );
};

export default GlovoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC244FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
