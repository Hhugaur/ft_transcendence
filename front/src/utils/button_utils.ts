import { lang } from '../../languages/language';

import { fadeOutAndNavigateSPA } from '../components/link';

export const createButtonBack: () => HTMLButtonElement = () =>  {
    const buttonback: HTMLButtonElement = document.createElement('button');
    buttonback.className = 'underline ml-[5%] text-bg0';
    buttonback.textContent = lang.back;
    buttonback.addEventListener('click', (e) => {
        e.preventDefault();
        fadeOutAndNavigateSPA('/');
    });
    return (buttonback);
}
