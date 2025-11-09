import { onValue, DataSnapshot } from 'firebase/database';
import { scheduleRef } from './firebase';
import { loadLsSavedName } from './name';
import { syncSelectedDaysFromData, renderSchedule } from './schedule';
import {
  setNameEvent,
  handleSubmitEvent,
  resetScheduleEvent,
  copyScheduleEvent,
  renderWeekRange,
} from './dom/events';
import { createModal } from './components/modal';

window.addEventListener('DOMContentLoaded', () => {
  let isInitial = true;

  onValue(scheduleRef(), (snapshot: DataSnapshot) => {
    const scheduleData = snapshot.val();

    if (isInitial) {
      syncSelectedDaysFromData(scheduleData);
      isInitial = false;
    }
    renderSchedule(scheduleData);
  });
  document.getElementById('test-button')?.addEventListener('click', () => {
    createModal([
      { label: '버튼 1', onClick: () => console.log('버튼 1 클릭') },
      { label: '버튼 2', onClick: () => console.log('버튼 2 클릭') },
      { label: '버튼 3', onClick: () => console.log('버튼 3 클릭') },
    ]);
  });

  loadLsSavedName();
  setNameEvent();
  handleSubmitEvent();
  resetScheduleEvent();
  renderWeekRange();
  copyScheduleEvent();
});
