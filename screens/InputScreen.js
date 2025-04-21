import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  fetchImagesFromFirebase,
  getImageSource,
} from "../firebase/imageService";
import { savePromptToFirebase } from "../firebase/promptService";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

export default function InputScreen({ navigation }) {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showReadyButton, setShowReadyButton] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const imageUrls = await fetchImagesFromFirebase();
        setImages(imageUrls);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const logoStyles = [
    { id: 1, name: "No Style" },
    { id: 2, name: "Monogram" },
    { id: 3, name: "Abstract" },
    { id: 4, name: "Mascot" },

  ];

  const handleCreate = async () => {
    setIsError(false);
    setIsSuccess(false);
    setShowReadyButton(false);

    if (!prompt.trim()) {
      setIsError(true);
      return;
    }

    setIsCreating(true);

    const selectedStyleName = logoStyles.find((style) => style.id === selectedStyle)?.name;

    if (selectedStyleName) {
      try {
        await savePromptToFirebase(prompt, selectedStyleName);
      } catch (error) {
        console.error('Error saving prompt to Firebase:', error);
      }
    }

    setTimeout(() => {
      setIsCreating(false);
      setIsSuccess(true);
      setShowReadyButton(true);
    }, 2000);
  };

  const handleReadyButtonPress = () => {
    setShowReadyButton(false);
    navigation.navigate("OutputScreen", {
      prompt,
      selectedStyle: logoStyles.find((style) => style.id === selectedStyle)
        ?.name,
      imageUrl:
        images[logoStyles.findIndex((style) => style.id === selectedStyle)],
    });
  };

  const renderStyleOption = (style, index) => (
    <View key={style.id}>
      <TouchableOpacity
        style={[
          styles.styleOption,
          selectedStyle === style.id && styles.selectedStyle,
        ]}
        onPress={() => setSelectedStyle(style.id)}
      >
        {loading ? (
          <ActivityIndicator color="#8B5CF6" />
        ) : (
          <Image
            source={getImageSource(images[index])}
            style={styles.styleImage}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.styleText,
          selectedStyle === style.id && { color: "#fff" },
        ]}
      >
        {style.name}
      </Text>
    </View>
  );

  const renderStatus = () => {
    if (isError) {
      return (
        <TouchableOpacity
          style={[styles.statusContainer, { backgroundColor: "white" }]}
          onPress={() => setIsError(false)}
        >
          <View
            style={{
              width: "20%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              backgroundColor: "rgba(239, 68, 68, 0.7)",
            }}
          >
            <Image
              source={require("../assets/images/warning.png")}
              style={{ width: 28, height: 28 }}
            />
          </View>
          <View
            style={{
              paddingLeft: 12,
              height: "100%",
              width: "80%",
              alignItems: "start",
              justifyContent: "center",
              backgroundColor: "rgba(239, 68, 68, 1)",
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
            }}
          >
            <Text style={styles.statusTitle}>Oops, something went wrong!</Text>
            <Text style={styles.statusSubtitle}>Click to try again.</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (isCreating) {
      return (
        <View style={styles.statusContainer}>
          <View
            style={{
              width: "20%",

              alignItems: "center",
            }}
          >
            <ActivityIndicator color="#FFFFFF" style={styles.statusIcon} />
          </View>
          <LinearGradient
            style={{
              width: "80%",
              padding: 16,
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 1]}
            colors={["rgba(41, 56, 220, 0.1)", "rgba(148, 61, 255, 0.1)"]}
          >
            <Text style={styles.statusTitle}>Creating Your Design...</Text>
            <Text style={styles.statusSubtitle}>Ready in 2 minutes</Text>
          </LinearGradient>
        </View>
      );
    }
    if (showReadyButton) {
      return (
        <TouchableOpacity
          style={[styles.statusContainer]}
          onPress={handleReadyButtonPress}
        >
          <View style={{ width: "20%", alignItems: "center" }}>
            <Image
              source={require("../assets/images/mock.png")}
              resizeMode="cover"
              style={styles.statusIcon}
            />
          </View>

          <LinearGradient
            style={{
              width: "80%",
              padding: 16,
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 1]}
            colors={["rgba(41, 56, 220, 1)", "rgba(148, 61, 255, 1)"]}
          >
            <View>
              <Text style={styles.statusTitle}>Your Design is Ready!</Text>
              <Text style={styles.statusSubtitle}>Tap to see it.</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" style="light" />
      <ImageBackground
        source={require("../assets/images/bgradient.png")}
        style={styles.background}
        resizeMode="stretch"
      >
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "space-between",
          }}
          style={styles.scrollView}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>AI Logo</Text>
            </View>
            {renderStatus()}
            <View
              style={{
                width: "100%",
                rowGap: 12,
                paddingHorizontal: 24,
              }}
            >
              <View style={styles.promptHeader}>
                <Text style={styles.promptTitle}>Enter Your Prompt</Text>
                <TouchableOpacity style={styles.surpriseButton}>
                  <Image
                    style={{ width: 15, height: 15, marginRight: 8 }}
                    source={require("../assets/images/suprise.png")}
                  />
                  <Text style={styles.surpriseText}>Surprise me</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <LinearGradient
                  style={{
                    width: "100%",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0, 1]}
                  colors={["rgba(41, 56, 220, 0.1)", "rgba(148, 61, 255, 0.1)"]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="A blue lion logo reading 'HEXA' in bold letters"
                    placeholderTextColor="#666666"
                    multiline
                    value={prompt}
                    onChangeText={(text) => {
                      setPrompt(text);
                      setIsError(false);
                    }}
                  />
                  <Text style={styles.charCount}>{prompt.length}/500</Text>
                </LinearGradient>
              </View>
            </View>

            <View style={styles.stylesSection}>
              <Text style={styles.stylesTitle}>Logo Styles</Text>
              <ScrollView horizontal style={styles.styleOptions}>
                {logoStyles.map((style, index) =>
                  renderStyleOption(style, index)
                )}
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 24,
              width: "100%",
            }}
          >
            <LinearGradient
              style={{
                width: "100%",
                borderRadius: 50,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 1]}
              colors={["rgba(41, 56, 220, 1)", "rgba(148, 61, 255, 1)"]}
            >
              <TouchableOpacity
                style={[
                  styles.createButton,
                  (!prompt.trim() || isCreating || showReadyButton) &&
                  styles.createButtonDisabled,
                ]}
                onPress={handleCreate}
                disabled={isCreating || showReadyButton}
              >
                <Text style={styles.createButtonText}>Create</Text>
                <Image source={require("../assets/images/elements.png")} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: "100%",
    backgroundColor: "#000",
  },
  background: {
    zIndex: 0,
    width: "100%",
    height: "100%",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    width: "100%",
    minHeight: "100%",
    paddingVertical: 24,
    position: "relative",
  },

  header: {
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
    color: "#FFFFFF",
  },
  promptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promptTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  surpriseButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  surpriseText: {
    color: "rgba(250, 250, 250, 1)",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "rgba(39, 39, 42, 1)",
    borderRadius: 16,
    marginBottom: 24,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 16,
    height: 120,
    textAlignVertical: "top",
  },
  charCount: {
    color: "#666666",
    fontSize: 14,
    textAlign: "left",
    marginTop: 8,
  },
  stylesSection: {
    width: "100%",
    paddingLeft: 24,
  },
  stylesTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  styleOptions: {
    width: "100%",
    flexDirection: "row",
  },
  styleOption: {
    width: (width - 60) / 4,
    height: (width - 60) / 4,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#1E1E1E",
    overflow: "hidden",
  },
  selectedStyle: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  styleImage: {
    width: "100%",
    height: "100%",
  },
  styleText: {
    color: "rgba(113, 113, 122, 1)",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
  createButton: {
    backgroundColor: "#8B5CF6",
    width: "100%",
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  createButtonDisabled: {
    backgroundColor: "#8B5CF680",
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  statusContainer: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    margin: 20,
    marginBottom: 24,
  },

  statusIcon: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  errorIcon: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  errorIconText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
    backgroundColor: "#Fff",
  },
  statusTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  statusSubtitle: {
    color: "#fff",
    fontSize: 14,
  },
  readyContainer: {
    backgroundColor: "#8B5CF6",
  },
});
