import admin from 'firebase-admin';
import { Firebase } from '../src/constants';

console.log('=== script start ===');

async function main() {
  try {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT 환경변수가 없습니다.');
    }

    // ⚠️ 주의: GitHub Secret에 JSON 원본을 넣었다면 base64 디코딩을 빼야 합니다. (아래 설명 참조)
    // Secret에 Base64로 인코딩된 문자열을 넣은 경우:
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString(
        'utf-8'
      )
    );

    // 만약 Secret에 JSON을 그대로 넣었다면 위 코드 대신 아래를 쓰세요:
    // const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL:
        'https://dongmun-work-schedule-default-rtdb.asia-southeast1.firebasedatabase.app',
    });

    console.log('=== Deleting schedule... ===');
    const db = admin.database();

    // 실제 삭제 로직
    await db.ref(Firebase.SCHEDULE).remove();

    console.log('=== RTDB 초기화 완료 ===');
    process.exit(0); // ✅ 성공적으로 종료 알림
  } catch (error) {
    console.error('❌ 스크립트 실행 중 에러 발생:', error);
    process.exit(1); // ✅ GitHub Action이 실패했음을 알림
  }
}

main();
