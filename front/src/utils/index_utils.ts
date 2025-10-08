import { lang } from '../../locales/language';

import { PageComponent, HTMLComponent } from '../components/component';
import { Link , fadeOutAndNavigateSPA } from '../components/link';
import { Router } from '../components/router';

import { sendRequest } from './api';



//temporaire en attendant d'avoir un vrai systeme de login and register fonctionnel
export let isAuth: number;

export function incAuthnbr(): void
{
    isAuth = 1;
}


export function decAuthnbr(): void
{
    isAuth = 0;
}

const app = Router.getInstance();

// up right of the index page is the button for login and if already logged become the avatar with the disc button
export const statusLogin: () => HTMLElement = () => {

    //if authenticate
	if(isAuth == 1)
	{
        const buttonDiv: HTMLElement = document.createElement('div');
	    buttonDiv.className = 'grid text-bg0 justify-end mr-10 mt-4';
		const imgDiv: HTMLElement = document.createElement('div');
		imgDiv.className ='w-32 h-32 rounded-full bg-bg0 relative overflow-hidden text-sm -mb-[50%] ml-[15%]';
		const profileL: HTMLComponent = new Link('/profile');
		const img: HTMLImageElement = document.createElement('img');
		img.className = 'w-full h-full object-cover absolute top-0 left-0 text-bg0';
		img.alt = 'Image de profile';
		img.src = './test.jpg';
		const imgSpan: HTMLSpanElement =  document.createElement('span');
		imgSpan.className = 'w-full h-full flex items-center justify-center absolute top-0 left-0 text-center text-black'
		imgSpan.textContent = lang.iImagetxt; // Profile picture
		imgDiv.appendChild(img);
		imgDiv.appendChild(imgSpan);
		profileL.appendChild(imgDiv);
		buttonDiv.appendChild(profileL.make());
        const disconnectButton: HTMLButtonElement = document.createElement('button');
        disconnectButton.className = '-mb-[100%] mt-10 ml-5 text-sm';
        disconnectButton.textContent = lang.disc; // disconnect
        disconnectButton.onclick = () => {
            sendRequest('https://transcendence.42.fr:42069/api/auth/disconnect', 'username', '', 'test1234', ''); // test1234 a remplacer par le user
            localStorage.removeItem('username');
        };
	    buttonDiv.appendChild(disconnectButton);
        return buttonDiv;
	}
    //default
    else 
    {
        const buttonDiv: HTMLElement = document.createElement('div');
	    buttonDiv.className = 'flex text-bg0 justify-end mr-10 mt-4';
    	const button: HTMLButtonElement = document.createElement('button');
		button.className = 'px-15 py-5 bg-bg2 rounded-2xl grayscale-50 underline hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md';
    	button.textContent = lang.iButton1;

		button.addEventListener('click', (e) => {
			e.preventDefault();
			fadeOutAndNavigateSPA('/login');
		});
		isAuth = 0;
		buttonDiv.appendChild(button);
        return buttonDiv;
	}
	
}

//the middle of the index page are the button tournament and classic who permit to play the game
export const classic: () => HTMLElement = () => {
    // --- Wrapper ---
    const gameDiv: HTMLElement = document.createElement('div');
    gameDiv.className = 'flex flex-col items-center text-2xl text-bg0';

    // --- Buttons ---
    const buttonClassic: HTMLButtonElement = document.createElement('button');
    buttonClassic.className = 'hover:cursor-pointer mt-70 px-20 py-5 bg-bg2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md';
 	buttonClassic.textContent = lang.iButton2; //classic

    const buttonTournament: HTMLButtonElement = document.createElement('button');
    buttonTournament.className = 'hover:cursor-pointer mt-10 px-20 py-5 bg-bg2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md';
	buttonTournament.textContent = lang.iButton3; //tournament
    // --- Variable to track selected mode ---
    let selectedMode: 'classic' | 'tournament' = 'classic';
    // --- Guest Mode Flow ---
    const handleGuestFlow = () => {
        const nameInput: HTMLInputElement = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = lang.iInput; //Enter your username
		nameInput.className = `hover:cursor-pointer text-center mx-auto mt-70 px-15 py-5 bg-bg2 rounded-2xl
		transition-all duration-300 ease-in-out focus:scale-105 focus:shadow-md focus:outline-none`;

        gameDiv.replaceChild(nameInput, buttonClassic);

        const playButton: HTMLButtonElement = document.createElement('button');
        playButton.textContent = lang.iButton4; // Play
        playButton.className = `hover:cursor-pointer mx-auto mt-10 px-17 py-5 bg-bg2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:bg-bg3`;
        playButton.addEventListener('click', () => {
            const username = nameInput.value.trim();
            if (username.length === 0) {
                alert('Veuillez entrer un pseudo.');
                return;
            }
            localStorage.setItem('guestName', username);
            // Redirect based on selected mode
            if (selectedMode === 'classic') {
                app.warp('/game', false);
            } else {
                 app.warp('/tournament', false);
            }
        });
        gameDiv.replaceChild(playButton, buttonTournament);
    };
    // --- Shared Event Listener Logic ---
    const handleGameStart = (mode: 'classic' | 'tournament') => {
        selectedMode = mode;

        if (isAuth === 1) {
            // Authenticated users go straight to their route
            window.location.href = mode === 'classic' ? '/game' : '/tournament';
        } else {
            // Guests enter name first
            handleGuestFlow();
        }
    };
    // --- Attach Event Listeners ---
    buttonClassic.addEventListener('click', () => handleGameStart('classic'));
    buttonTournament.addEventListener('click', () => handleGameStart('tournament'));
    // --- Append Buttons ---
    gameDiv.appendChild(buttonClassic);
    gameDiv.appendChild(buttonTournament);

    return gameDiv;
};
