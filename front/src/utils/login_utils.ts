import { lang } from '../../languages/language';

import { fadeOutAndNavigateSPA } from '../components/link';

export const registerForgot: () => HTMLElement = () =>  {
    const buttonDiv: HTMLElement = document.createElement('div');
    buttonDiv.className = 'mt-20 -mb-20 text-bg0';
    const registerB: HTMLElement = document.createElement('button');
    registerB.className = 'hover:cursor-pointer ml-60 -mr-70 underline text-sm';
    registerB.textContent = lang.rSubmit; // register
    const forgotpass: HTMLElement = document.createElement('button');
    forgotpass.className = 'hover:cursor-pointer -ml-20 underline text-sm';
    forgotpass.textContent = lang.lOther1; // forgot password

    registerB.addEventListener('click', (e) => {
        e.preventDefault();
        fadeOutAndNavigateSPA('/register');
    });

    forgotpass.addEventListener('click', (e) => {
        e.preventDefault();
        fadeOutAndNavigateSPA('/forgot-password');
    });

    buttonDiv.appendChild(registerB);
    buttonDiv.appendChild(forgotpass);
    return (buttonDiv);
}
