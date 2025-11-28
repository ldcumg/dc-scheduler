import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

(async () => {
  const message = {
    topic: 'all',
    notification: {
      title: '일요일 알림',
      body: '오늘 일요일 16시 알림!',
    },
  };

  const response = await admin.messaging().send(message);
  console.log('FCM sent:', response);
})();
