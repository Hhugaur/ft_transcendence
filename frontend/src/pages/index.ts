import {
        PageComponent,
        HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link , fadeOutAndNavigateSPA } from '../components/link';
import { local, createLanguageMenu} from '../components/language';
import { sendRequest } from "../utils";
import { Router } from '../router';

export let auth: number;

export function incAuthnbr(): void
{
    auth = 1;
}


export function decAuthnbr(): void
{
    auth = 0;
}

const app = Router.getInstance();

const statusLogin: () => HTMLElement = () => {

	if(auth == 1)
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
		imgSpan.textContent = local.iImagetxt;
		imgDiv.appendChild(img);
		imgDiv.appendChild(imgSpan);
		profileL.appendChild(imgDiv);
		buttonDiv.appendChild(profileL.make());
        const leave: HTMLButtonElement = document.createElement('button');
        leave.className = '-mb-[100%] mt-10 ml-5 text-sm';
        leave.textContent = local.disc;
        leave.onclick = () => {
            try {	
                sendRequest('https://transcendence.42.fr:42069/api/auth/disconnect', 'username', null, 'test1234', null); // test1234 a remplacer par le user
            }
            catch {}
            //decAuthnbr();
        };
	    buttonDiv.appendChild(leave);
        return buttonDiv;
	}
    else {
        const buttonDiv: HTMLElement = document.createElement('div');
	    buttonDiv.className = 'flex text-bg0 justify-end mr-10 mt-4';
    	const button: HTMLButtonElement = document.createElement('button');
    	// button.className = 'px-15 py-5 bg-bg2 rounded-2xl grayscale-50 underline hover:cursor-pointer';
		button.className = 'px-15 py-5 bg-bg2 rounded-2xl grayscale-50 underline hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md';
    	button.textContent = local.iButton1;

    	// const loginL: HTMLComponent = new Link('/login');
    	// loginL.appendChild(button); // add button to link
    	// buttonDiv.appendChild(loginL.make()); // add link to container
		button.addEventListener('click', (e) => {
			e.preventDefault();
			fadeOutAndNavigateSPA('/login'); // ✅ Use SPA navigation + fade-out
		});

		buttonDiv.appendChild(button);
		auth = 0
        return buttonDiv;
	}
	
}


//va manquer a gerer pour le tournois en gros meme chose que classique seulement qu'a la place d'ller dans game on va dans tournament.

const classic: () => HTMLElement = () => {
    // --- Wrapper ---
    const gameDiv: HTMLElement = document.createElement('div');
    gameDiv.className = 'flex flex-col items-center text-2xl text-bg0';

    // --- Buttons ---
    const buttonClassic: HTMLButtonElement = document.createElement('button');
   //buttonClassic.className = 'hover:cursor-pointer mt-70 px-15 py-5 bg-bg2 rounded-2xl';
    buttonClassic.className = 'hover:cursor-pointer mt-70 px-20 py-5 bg-bg2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md';
 	buttonClassic.textContent = local.iButton2;

    const buttonTournament: HTMLButtonElement = document.createElement('button');
    //buttonTournament.className = 'hover:cursor-pointer mt-10 px-17 py-5 bg-bg2 rounded-2xl';
    buttonTournament.className = 'hover:cursor-pointer mt-10 px-20 py-5 bg-bg2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md';
	buttonTournament.textContent = local.iButton3;

    // --- Variable to track selected mode ---
    let selectedMode: 'classic' | 'tournament' = 'classic';

    // --- Guest Mode Flow ---
    const handleGuestFlow = () => {
        const nameInput: HTMLInputElement = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = local.iInput;
        //nameInput.className = 'hover:cursor-pointer text-center mx-auto mt-70 px-15 py-5 bg-bg2 rounded-2xl';
		nameInput.className = `hover:cursor-pointer text-center mx-auto mt-70 px-15 py-5 bg-bg2 rounded-2xl
		transition-all duration-300 ease-in-out focus:scale-105 focus:shadow-md focus:outline-none`;

        gameDiv.replaceChild(nameInput, buttonClassic);

        const playButton: HTMLButtonElement = document.createElement('button');
        playButton.textContent = local.iButton4;
		//playButton.className = 'hover:cursor-pointer mx-auto mt-10 px-17 py-5 bg-bg2 rounded-2xl';
        playButton.className = `hover:cursor-pointer mx-auto mt-10 px-17 py-5 bg-bg2 rounded-2xl
    	transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:bg-bg3`;

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

        if (auth === 1) {
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

export const Index: PageComponent = new PageComponent(() => {
   document.body.classList.remove('fade-out');
   document.body.classList.add('fade-in');
   document.body.classList.remove('bg-bg2');
   document.body.classList.add('bg-bg1');

    const root: HTMLElement = document.createElement('div');
	// --- Login / Profile Section ---
	// peut etre implementer un menu deroulant pour avoir acces au bouton deconnecter(?)
    root.appendChild(statusLogin());

    // --- Title Section ---
    const titleDiv: HTMLElement = document.createElement('div');
    titleDiv.className = 'flex flex-col items-center mx-[25%] bg-bg11 -mt-10 p-7 rounded-3xl';

    const title: HTMLParagraphElement = document.createElement('p');
    title.className = 'text-8xl hover:cursor-default font-bitcount text-bg0';
    title.textContent = local.iTitle;

    titleDiv.appendChild(title);
    root.appendChild(titleDiv);

	// Add game buttons section to root
    root.appendChild(classic());
    root.appendChild(createLanguageMenu());
    return root;
});
