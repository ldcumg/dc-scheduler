import { SelectedDays, SVG_ICON_PATH, WEEKDAYS } from '../constants';
import { syncSelectedDays } from '../store';
import { getSelectedDays } from '../store';
import type { ScheduleData, SelectedDaysValue, Staff, Weekday } from '../types';
import { appendSvgIcons, createElement } from '../utils';

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

export const createStaffSelectChildren = async (staffs: Staff[]) => {
  const controlContainer = createElement('div', { id: 'control-container' });
  const svgContainer = createElement('div', { id: 'svg-container' });
  const staffContainer = createElement('div', { id: 'staff-container' });

  const nameForm = createElement('form', { id: 'name-form', hidden: true });
  const nameInput = createElement('input', {
    type: 'text',
    id: 'name-input',
    placeholder: '변경할 이름 입력',
  });
  const nameButton = createElement('button', {
    type: 'submit',
    id: 'name-button',
    textContent: '완료',
  });

  nameForm.append(nameInput, nameButton);
  controlContainer.append(nameForm, svgContainer);

  await appendSvgIcons(svgContainer, [
    SVG_ICON_PATH.plus,
    SVG_ICON_PATH.edit,
    SVG_ICON_PATH.trash,
  ]);

  staffs.forEach(({ name, docId }) => {
    const staffButton = createElement('button', {
      type: 'button',
      className: 'staff-button',
      textContent: name,
      dataset: { docId },
    });
    staffContainer.appendChild(staffButton);
  });

  return [controlContainer, staffContainer];
};

export const createApplyWorkChildren = (
  staffName: string,
  docId: string,
  scheduleData: ScheduleData
) => {
  const nameContainer = createElement('div', { id: 'name-container' });

  const nameSign = createElement('span', { textContent: '이름 :' });
  const nameSpan = createElement('span', {
    id: 'name',
    textContent: staffName,
    dataset: { docId },
  });
  const staffChangeButton = createElement('button', {
    type: 'button',
    id: 'staff-change-button',
    textContent: '변경',
  });

  nameContainer.append(nameSign, nameSpan, staffChangeButton);

  const dayForm = createElement('form', { id: 'day-form' });
  const workTitle = createElement('h3', { textContent: '근무' });
  const workDayContainer = createElement('div', { id: 'workday-container' });
  const laundryTitle = createElement('h3', { textContent: '빨래' });
  const laundryContainer = createElement('div', { id: 'laundry-container' });

  syncSelectedDays(staffName, scheduleData);

  const selectedWorkDays = getSelectedDays(SelectedDays.WORK);
  const selectedLaundryDays = getSelectedDays(SelectedDays.LAUNDRY);

  WEEKDAYS.forEach((day) => {
    const { label: workLabel } = createCheckbox(day, selectedWorkDays, 'work');
    const { label: laundryLabel, checkbox: laundryCheckbox } = createCheckbox(
      day,
      selectedLaundryDays,
      'laundry'
    );

    laundryCheckbox.disabled = !selectedWorkDays.has(day);

    workDayContainer.appendChild(workLabel);
    laundryContainer.appendChild(laundryLabel);
  });

  const submitButtonContainer = createElement('div', {
    id: 'submit-button-container',
  });
  const submitButton = createElement('button', {
    type: 'submit',
    id: 'submit-button',
    textContent: '제출',
  });
  submitButtonContainer.appendChild(submitButton);

  dayForm.append(
    workTitle,
    workDayContainer,
    laundryTitle,
    laundryContainer,
    submitButtonContainer
  );

  return [nameContainer, dayForm];
};
