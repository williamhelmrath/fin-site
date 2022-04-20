const keys = {
  airtable: {
    key: import.meta.env.VITE_AIRTABLE_KEY,
    baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
    tableName: import.meta.env.VITE_AIRTABLE_TABLE_NAME,
  },
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_authDomain,
    projectId: import.meta.env.VITE_FIREBASE_projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
    messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
    appId: import.meta.env.VITE_FIREBASE_appId,
  },
};
export default keys;
