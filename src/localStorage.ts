import { STAFF } from './constants';

export const saveStaff = (name: string, staffKey: string) =>
  localStorage.setItem(STAFF, JSON.stringify({ name, staffKey }));

export const getSavedStaff = () => {
  const staffData = localStorage.getItem(STAFF);
  return staffData ? JSON.parse(staffData) : null;
};

export const removeSavedStaff = () => localStorage.removeItem(STAFF);
