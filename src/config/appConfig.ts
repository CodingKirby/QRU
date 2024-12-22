const appConfig = {
  // Firebase 설정
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  },

  // API 엔드포인트
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },

  // QR 코드 기본 설정
  qrCode: {
    size: 200, // 픽셀 단위
    colorDark: "#000000", // QR 코드의 색상
    colorLight: "#ffffff", // QR 코드의 배경색
  },

  // 사용자 설정
  userSettings: {
    defaultVisibility: {
      isVisibleToAll: false,
      isVisibleToMembers: true,
      excludeFromShuffle: true,
    },
  },

  // 기타 설정
  misc: {
    maxCustomFields: 5, // 최대 커스텀 필드 수
    dateFormat: "YYYY-MM-DD", // 전역 날짜 형식
    defaultLocale: "ko", // 기본 로케일
  },
};

export default appConfig;
