import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

/**
 * @param {string} prompt - Kullanıcının girdiği prompt metni
 * @param {string} selectedStyle - Kullanıcının seçtiği stil adı
 * @returns {Promise<string>} - Kaydedilen dokümanın ID'si
 */
export const savePromptToFirebase = async (prompt, selectedStyle) => {
  try {
    const isFirebaseConfigured = db && db.app && db.app.options.apiKey &&
      db.app.options.apiKey !== 'YOUR_API_KEY' && db.app.options.apiKey !== '';

    if (!isFirebaseConfigured) {
      console.log('Firebase Firestore not configured properly');
      return null;
    }

    const docRef = await addDoc(collection(db, 'prompts'), {
      prompt: prompt,
      style: selectedStyle,
      createdAt: serverTimestamp()
    });

    console.log('Prompt saved to Firebase with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving prompt to Firebase:', error);
    return null;
  }
};
