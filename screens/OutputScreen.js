import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { getImageSource } from "../firebase/imageService";

export default function OutputScreen({ route, navigation }) {
  const { prompt, selectedStyle, imageUrl } = route.params;

  return (
    <SafeAreaView style={styles.container}>
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
          source={getImageSource(imageUrl)}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.promptContainer}>
        <View style={styles.promptHeader}>
          <Text style={styles.promptTitle}>Prompt</Text>
          <TouchableOpacity style={styles.copyButton}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.promptText}>{prompt}</Text>
        <View style={styles.styleChip}>
          <Text style={styles.styleText}>{selectedStyle}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  logoContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  promptContainer: {
    backgroundColor: '#1E1E1E',
    margin: 20,
    borderRadius: 12,
    padding: 16,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#8B5CF6',
    fontSize: 14,
    marginLeft: 4,
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  styleChip: {
    backgroundColor: '#2E2E2E',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  styleText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
