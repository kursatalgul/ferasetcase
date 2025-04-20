import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Image, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { fetchImagesFromFirebase, getImageSource } from "../firebase/imageService";

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
        console.error('Error loading images:', error);
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
      selectedStyle: logoStyles.find(style => style.id === selectedStyle)?.name,
      imageUrl: images[logoStyles.findIndex(style => style.id === selectedStyle)]
    });
  };

  const renderStyleOption = (style, index) => (
    <TouchableOpacity
      key={style.id}
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
        />
      )}
      <Text style={styles.styleText}>{style.name}</Text>
    </TouchableOpacity>
  );

  const renderStatus = () => {
    if (isError) {
      return (
        <TouchableOpacity 
          style={[styles.statusContainer, styles.errorContainer]}
          onPress={() => setIsError(false)}
        >
          <View style={[styles.statusIcon, styles.errorIcon]}>
            <Text style={styles.errorIconText}>!</Text>
          </View>
          <View>
            <Text style={styles.statusTitle}>Oops, something went wrong!</Text>
            <Text style={styles.statusSubtitle}>Click to try again.</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (isCreating) {
      return (
        <View style={styles.statusContainer}>
          <ActivityIndicator color="#FFFFFF" style={styles.statusIcon} />
          <View>
            <Text style={styles.statusTitle}>Creating Your Design...</Text>
            <Text style={styles.statusSubtitle}>Ready in 2 minutes</Text>
          </View>
        </View>
      );
    }
    if (showReadyButton) {
      return (
        <TouchableOpacity 
          style={[styles.statusContainer, styles.readyContainer]}
          onPress={handleReadyButtonPress}
        >
          <Image 
            source={getImageSource(images[logoStyles.findIndex(style => style.id === selectedStyle)])}
            style={styles.statusIcon}
          />
          <View>
            <Text style={styles.statusTitle}>Your Design is Ready!</Text>
            <Text style={styles.statusSubtitle}>Tap to see it.</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        {renderStatus()}
        
        <ScrollView bounces={false} style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>AI Logo</Text>
          </View>

          <View style={styles.promptHeader}>
            <Text style={styles.promptTitle}>Enter Your Prompt</Text>
            <TouchableOpacity style={styles.surpriseButton}>
              <Text style={styles.surpriseText}>Surprise me</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
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
          </View>

          <View style={styles.stylesSection}>
            <Text style={styles.stylesTitle}>Logo Styles</Text>
            <View style={styles.styleOptions}>
              {logoStyles.map((style, index) => renderStyleOption(style, index))}
            </View>
          </View>
          
          <View style={styles.spacer} />
        </ScrollView>

        <TouchableOpacity 
          style={[
            styles.createButton,
            (!prompt.trim() || isCreating || showReadyButton) && styles.createButtonDisabled
          ]}
          onPress={handleCreate}
          disabled={!prompt.trim() || isCreating || showReadyButton}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  spacer: {
    height: 100,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  promptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
    color: "#8B5CF6",
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 24,
  },
  stylesTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  styleOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    borderColor: "#8B5CF6",
  },
  styleImage: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  styleText: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
  createButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 40,
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 16,
    margin: 20,
    marginBottom: 0,
  },
  errorContainer: {
    backgroundColor: "#FF6B6B",
  },
  statusIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 8,
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
  },
  statusTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  statusSubtitle: {
    color: "#666666",
    fontSize: 14,
  },
  readyContainer: {
    backgroundColor: "#8B5CF6",
  },
});
