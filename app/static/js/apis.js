/** 근무 스케줄 불러오기 */
export const fetchSchedule = async () => {
  try {
    const res = await fetch('/schedule', {
      method: 'GET',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    alert('스케줄 불러오는 중 오류가 발생했습니다.');
    console.error(err);
    throw err;
  }
};

/** 근무 제출 */
export const submitSelectedDays = async (name, selectedDays) => {
  try {
    const res = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, selectedDays }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    alert('스케줄 제출 중 오류가 발생했습니다.');
    console.error(err);
    throw err;
  }
};

/** 근무표 초기화 */
export const resetSchedule = async () => {
  try {
    const res = await fetch('/reset', { method: 'POST' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    alert('근무표 초기화 중 오류가 발생했습니다.');
    console.error(err);
    throw err;
  }
};
