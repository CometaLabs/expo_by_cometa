import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Entypo from "react-native-vector-icons/Entypo";

import "./global.css";

export default function Page() {
  const router = useRouter();
  const pages = [
    {
      id: "1",
      title: "Glovo by Cometa",
      logo: "https://play-lh.googleusercontent.com/iTpx7rDQGJQd4dHVwhsKmSpQv72zyJ6M4df8smHO7rGCOJUKeKZtynrft0NWlnf47w=w240-h480-rw",
      active: true,
      path: "/glovo",
    },
    {
      id: "2",
      title: "Zara by Cometa (Soon)",
      logo: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/30/24/99/30249968-15c5-3c69-58fe-243ed30ea653/AppIcon-0-1x_U007emarketing-0-7-0-sRGB-0-85-220-0.png/460x0w.webp",
      active: false,
      path: "/zara",
    },
    {
      id: "3",
      title: "Airbnb by Cometa (Soon)",
      logo: "https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0=w240-h480-rw",
      active: false,
    },
    {
      id: "4",
      title: "Tinder by Cometa (Soon)",
      logo: "https://play-lh.googleusercontent.com/fDpoqIbZ884ylRnMK8Lx9Fu4DsLQk5yt4f9WkxeOAPpGnzc9BTi_YKkMsLvoMdx7Uzg=w240-h480-rw",
      active: false,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Can Cometa do it? ☄️</Text>
      <FlatList
        data={pages}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  router.push(item?.path);
                }}
                disabled={!item?.active}
              >
                <View style={styles.row}>
                  <View style={styles.leftRow}>
                    <Image source={item?.logo} style={styles.logo} />
                    <Text
                      style={[
                        styles.rowTitle,
                        !item?.active && styles.disabledTitle,
                      ]}
                    >
                      {item.title}
                    </Text>
                  </View>
                  <Entypo name="chevron-right" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: "white",
  },
  title: {
    fontSize: 55,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: "400",
    paddingHorizontal: 16,
  },
  leftRow: { flexDirection: "row", alignItems: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 16,
  },
  disabledTitle: {
    color: "grey",
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 8,
  },
});
