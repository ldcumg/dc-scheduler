import { createElement } from './utils';

export const createModal = (content: HTMLElement) => {
  const modal = createElement('div', { className: 'modal' });

  const closeBtn = createElement('button', {
    type: 'button',
    className: 'modal-close-btn',
    textContent: '닫기',
    events: { click: () => modal.remove() },
  });

  modal.append(content, closeBtn);

  document.body.appendChild(modal);

  return () => modal.remove();
};
