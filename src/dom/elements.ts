import type { SelectedDaysValue, Weekday } from '../types';
import { createElement } from '../utils';

export const createCheckbox = (
  day: Weekday,
  selectedDays: SelectedDaysValue,
  role: 'work' | 'laundry'
) => {
  const label = createElement('label', { className: 'checkbox-label' });
  const checkbox = createElement('input', {
    type: 'checkbox',
    value: day,
    name: day,
  });
  checkbox.dataset.role = role;
  checkbox.dataset.day = day;
  checkbox.checked = selectedDays.has(day);

  label.append(checkbox, day);

  return { label, checkbox };
};
