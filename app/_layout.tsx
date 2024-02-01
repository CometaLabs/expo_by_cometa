import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Stack } from "expo-router";
import "react-native-gesture-handler";
const Root = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={"index"}
          options={{
            title: "Can it be done by Cometa? ☄️",
          }}
        />
        <Stack.Screen
          name={"glovo/index"}
          options={{
            title: "Glovo by Cometa",
            animation: "slide_from_bottom",
            animationDuration: 150,
          }}
        />
      </Stack>
    </>
  );
};

export default Root;

const styles = StyleSheet.create({});
