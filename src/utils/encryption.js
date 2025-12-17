// Simple encryption/decryption utility
// Note: This is client-side obfuscation, not true security
// Determined users can still reverse engineer, but it hides content from casual inspection

// Simple encoding using base64 (reliable for all characters including emojis)
// Then apply a simple character shift for additional obfuscation
const SHIFT_KEY = 13; // Caesar cipher shift

const encodeContent = (text) => {
  // First base64 encode to handle all characters safely
  const base64 = btoa(unescape(encodeURIComponent(text)));
  // Apply simple character shift for obfuscation
  let shifted = '';
  for (let i = 0; i < base64.length; i++) {
    const charCode = base64.charCodeAt(i);
    shifted += String.fromCharCode(charCode + SHIFT_KEY);
  }
  // Base64 encode again
  return btoa(shifted);
};

const decodeContent = (encrypted) => {
  try {
    // Decode base64
    const shifted = atob(encrypted);
    // Reverse the shift
    let base64 = '';
    for (let i = 0; i < shifted.length; i++) {
      const charCode = shifted.charCodeAt(i);
      base64 += String.fromCharCode(charCode - SHIFT_KEY);
    }
    // Decode base64 and handle UTF-8
    return decodeURIComponent(escape(atob(base64)));
  } catch (e) {
    console.error('Decryption error:', e);
    return '';
  }
};

// Encrypt content structure
export const encryptContent = (content) => {
  return encodeContent(JSON.stringify(content));
};

// Decrypt content structure
export const decryptContent = (encrypted) => {
  try {
    const decrypted = decodeContent(encrypted);
    return JSON.parse(decrypted);
  } catch (e) {
    console.error('Decryption/parse error:', e);
    return null;
  }
};

