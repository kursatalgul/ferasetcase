import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

const localSliderImages = [
  require('../assets/images/SliderNoStyle.png'),
  require('../assets/images/SliderMono.png'),
  require('../assets/images/sliderCroc.png'),
  require('../assets/images/sliderGamePad.png'),
];


export const fetchImagesFromFirebase = async (useLocalFallback = true) => {
  const folderPath = 'sliderCategory/';
  try {
    const isFirebaseConfigured = storage.app.options.apiKey && 
                                storage.app.options.apiKey !== 'YOUR_API_KEY';
    
    if (!isFirebaseConfigured) {
      console.log('Firebase not configured properly, using local slider images');
      if (useLocalFallback) {
        return localSliderImages;
      }
      return [];
    }
    
    const imagesRef = ref(storage, folderPath);
    const result = await listAll(imagesRef);
    
    const urlPromises = result.items.map(async (imageRef) => {
      const url = await getDownloadURL(imageRef);
      return url;
    });
    
    const firebaseImages = await Promise.all(urlPromises);
    
    if (firebaseImages.length === 0 && useLocalFallback) {
      console.log('No Firebase images found, using local slider images');
      return localSliderImages;
    }
    
    return firebaseImages;
  } catch (error) {
    console.error('Error fetching images from Firebase:', error);
    
    if (useLocalFallback) {
      console.log('Firebase error, using local slider images');
      return localSliderImages;
    }
    
    return [];
  }
};


export const getImageSource = (image) => {
  if (typeof image === 'string') {
    return { uri: image };
  }
  return image;
};
