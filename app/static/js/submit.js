import { $nameInput } from './domElements.js';
import {
  selectedWorkDays,
  selectedLaundryDays,
  renderSchedule,
} from './schedule.js';
import { saveName } from './name.js';
import { submitSelectedDays } from './apis.js';

const handleSubmit = async () => {
  if (!$nameInput.value) return alert('이름을 입력해주세요');
  if ($nameInput.value.length !== 2)
    return alert('이름을 두 글자로 입력해주세요');
  saveName();
  await submitSelectedDays($nameInput.value, {
    work: [...selectedWorkDays],
    laundry: [...selectedLaundryDays],
  });

  renderSchedule();
};

document
  .querySelector('#submit-button')
  .addEventListener('click', handleSubmit);
