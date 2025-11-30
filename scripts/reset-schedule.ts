import admin from 'firebase-admin';
import { Firebase } from '../src/constants';

// 스크립트 시작 로그
console.log('=== [Script] Start Reset Schedule ===');

async function main() {
  try {
    // 1. 환경변수 체크
    if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT 환경변수가 없습니다.');
    }

    // 2. 서비스 계정 키 디코딩 (GitHub Secret에 Base64로 넣었을 경우)
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString(
        'utf-8'
      )
    );

    // 3. Firebase 초기화
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL:
        'https://dongmun-work-schedule-default-rtdb.asia-southeast1.firebasedatabase.app',
    });

    console.log('=== [Script] Deleting schedule... ===');
    const db = admin.database();

    // 4. 데이터 삭제 (비동기 대기)
    await db.ref(Firebase.SCHEDULE).remove();

    console.log('=== [Script] RTDB 초기화 성공! ===');
    process.exit(0); // 성공 종료
  } catch (error) {
    console.error('❌ [Script] 에러 발생:', error);
    process.exit(1); // 실패 종료
  }
}

main();
