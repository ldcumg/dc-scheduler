import { getDocs } from 'firebase/firestore';
import { update, remove } from 'firebase/database';
import { scheduleRef, staffCollection } from './firebase';
import { getSelectedDays } from './store';
import { SelectedDaysKey } from './constants';

export const fetchStaffs = async () => {
  return (await getDocs(staffCollection)).docs.map((doc) => doc.data());
};

/** 근무 제출 */
export const submitSelectedDays = async (name: string) => {
  try {
    await update(scheduleRef(name), {
      work: [...getSelectedDays(SelectedDaysKey.WORK)],
      laundry: [...getSelectedDays(SelectedDaysKey.LAUNDRY)],
    });
  } catch (err) {
    alert('스케줄 제출 중 오류가 발생했습니다.');
    console.error(err);
    throw err;
  }
};

/** 근무표 초기화 */
export const resetSchedule = async () => {
  try {
    await remove(scheduleRef());
  } catch (err) {
    alert('근무표 초기화 중 오류가 발생했습니다.');
    console.error(err);
    throw err;
  }
};
