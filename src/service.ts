import { deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { staffDoc } from './firebase';
import { createElement } from './utils';

/** 신입 추가 */
export const addNewbie = async (
  staffContainer: HTMLDivElement,
  name: string
) => {
  const docId = new Date().getTime().toString();
  await setDoc(staffDoc(docId), { name, workDays: {} });
  const staffButton = createElement('button', {
    type: 'button',
    className: 'staff-button',
    textContent: name,
    dataset: { docId },
  });
  staffContainer.appendChild(staffButton);
};

export const editStaff = async (targetId: string, newName: string) => {
  await updateDoc(staffDoc(targetId), { name: newName });
};

export const removeStaffByName = async (targetId: string) => {
  await deleteDoc(staffDoc(targetId));
};
