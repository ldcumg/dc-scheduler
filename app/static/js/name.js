import { $nameInput } from './domElements.js';

const $nameForm = document.querySelector('#name-form');
const $nameButton = document.querySelector('#name-button');
export const savedName = window.localStorage.getItem('staffName');

if (!!savedName) {
  $nameInput.value = savedName;
  $nameInput.disabled = true;
  $nameButton.hidden = false;
}

export const saveName = () => {
  if ($nameInput.disabled) return;
  window.localStorage.setItem('staffName', $nameInput.value);
  $nameButton.hidden = false;
  $nameInput.disabled = true;
};

const modifyName = () => {
  $nameInput.disabled = false;
  $nameButton.hidden = true;
  $nameInput.value = '';
  $nameInput.focus();
};

$nameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if ($nameInput.disabled) {
    modifyName();
    return;
  }
  saveName();
});
