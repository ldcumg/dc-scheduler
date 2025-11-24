import type { ScheduleData, SelectedDaysKey, Weekday } from './types';

let _scheduleData: ScheduleData = {};

const _selectedDays: Record<SelectedDaysKey, Set<Weekday>> = {
  work: new Set<Weekday>(),
  laundry: new Set<Weekday>(),
};

// getter
export const getScheduleData = () => _scheduleData;

export const getSelectedDays = (key: SelectedDaysKey) => _selectedDays[key];

// setter
export const setScheduleData = (scheduleData: ScheduleData) =>
  (_scheduleData = scheduleData);

export const selectDay = (key: SelectedDaysKey, day: Weekday) =>
  _selectedDays[key].add(day);
export const deselectDay = (key: SelectedDaysKey, day: Weekday) =>
  _selectedDays[key].delete(day);
export const clearSelectedDays = () => {
  for (const key in _selectedDays) {
    _selectedDays[key as SelectedDaysKey].clear();
  }
};
