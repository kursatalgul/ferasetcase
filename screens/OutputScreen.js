import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
} from "react-native";
import { getImageSource } from "../firebase/imageService";
import { LinearGradient } from "expo-linear-gradient";

export default function OutputScreen({ route, navigation }) {
  const { prompt, selectedStyle, imageUrl } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" style="light" />

      <ImageBackground
        source={require("../assets/images/bgradient.png")}
        style={styles.background}
        resizeMode="stretch"
      >
        <ScrollView
          style={{ flex: 1, paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Design</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/mock.png")}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.promptContainer}>
            <LinearGradient
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 16,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              colors={["rgba(41, 56, 220, 0.1)", "rgba(148, 61, 255, 0.1)"]}
            >
              <View style={styles.promptHeader}>
                <Text style={styles.promptTitle}>Prompt</Text>
                <TouchableOpacity style={styles.copyButton}>
                  <Image
                    source={require("../assets/images/copy.png")}
                    style={{ width: 16, height: 16, marginRight: 6 }}
                  />
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.promptText}>{prompt}</Text>
              <View style={styles.styleChip}>
                <Text style={styles.styleText}>{selectedStyle}</Text>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  background: {
    zIndex: 0,
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "300",
  },
  logoContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 342,
    height: 342,
  },
  promptContainer: {
    backgroundColor: "rgba(39, 39, 42, 1)",
    margin: 20,
    borderRadius: 12,
  },
  promptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 4,
  },
  promptText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  styleChip: {
    backgroundColor: "rgba(250, 250, 250, 0.1)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  styleText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
