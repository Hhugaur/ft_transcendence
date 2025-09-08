import {
        PageComponent,
        HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link , fadeOutAndNavigateSPA } from '../components/link';
import { createLanguageMenu, loadLanguage, applyTranslations, Translations} from '../components/language';


let auth: number;

const statusLogin = (translations: Translations): HTMLElement => {
	const buttonDiv = document.createElement('div');
	buttonDiv.className = 'flex text-bg0 justify-end mr-10 mt-4';

	if (0) {
		// Authenticated user flow
		const imgDiv = document.createElement('div');
		imgDiv.className = 'w-32 h-32 rounded-full bg-bg0 relative overflow-hidden text-sm -mb-[50%] ml-[15%]';

		const profileL = new Link('/profile');
		const img = document.createElement('img');
		img.className = 'w-full h-full object-cover absolute top-0 left-0 text-bg0';
		img.alt = translations['iImagetxt'] ?? 'Image de profile';
		img.src = './test.jpg';

		const imgSpan = document.createElement('span');
		imgSpan.className = 'w-full h-full flex items-center justify-center absolute top-0 left-0 text-center text-black';
		imgSpan.textContent = translations['iImagetxt'] ?? 'Image de profile';

		imgDiv.appendChild(img);
		imgDiv.appendChild(imgSpan);

		profileL.appendChild(imgDiv);
		buttonDiv.appendChild(profileL.make());

		auth = 1;
	} else {
		// Guest user flow
		const button = document.createElement('button');
		button.className = 'px-15 py-5 bg-bg2 rounded-2xl grayscale-50 underline hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md';
		button.textContent = translations['iButton1'] ?? 'Se connecter'; // ✅ use translated text

		button.addEventListener('click', (e) => {
			e.preventDefault();
			fadeOutAndNavigateSPA('/login');
		});

		buttonDiv.appendChild(button);
		auth = 0;
	}

	return buttonDiv;
};


//va manquer a gerer pour le tournois en gros meme chose que classique seulement qu'a la place d'ller dans game on va dans tournament.

const classic = (translations: Translations): HTMLElement => {
	const gameDiv: HTMLElement = document.createElement('div');
	gameDiv.className = 'flex flex-col items-center text-2xl text-bg0';

	const buttonClassic: HTMLButtonElement = document.createElement('button');
	buttonClassic.className = 'hover:cursor-pointer mt-70 px-15 py-5 bg-bg2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md';
	buttonClassic.textContent = translations['iButton2'] ?? 'Classique';

	const buttonTournament: HTMLButtonElement = document.createElement('button');
	buttonTournament.className = 'hover:cursor-pointer mt-10 px-17 py-5 bg-bg2 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md';
	buttonTournament.textContent = translations['iButton3'] ?? 'Tournoi';

	let selectedMode: 'classic' | 'tournament' = 'classic';

	const handleGuestFlow = () => {
		const nameInput: HTMLInputElement = document.createElement('input');
		nameInput.type = 'text';
		nameInput.placeholder = translations['iInput'] ?? 'Entrez votre pseudo';
		nameInput.className = `hover:cursor-pointer text-center mx-auto mt-70 px-15 py-5 bg-bg2 rounded-2xl
			transition-all duration-300 ease-in-out focus:scale-105 focus:shadow-md focus:outline-none`;

		gameDiv.replaceChild(nameInput, buttonClassic);

		const playButton: HTMLButtonElement = document.createElement('button');
		playButton.textContent = translations['iButton4'] ?? 'Jouer';
		playButton.className = `hover:cursor-pointer mx-auto mt-10 px-17 py-5 bg-bg2 rounded-2xl
			transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:bg-bg3`;

		playButton.addEventListener('click', () => {
			const username = nameInput.value.trim();
			if (username.length === 0) {
				alert('Veuillez entrer un pseudo.');
				return;
			}

			localStorage.setItem('guestName', username);

			window.location.href = selectedMode === 'classic' ? '/game' : '/tournament';
		});

		gameDiv.replaceChild(playButton, buttonTournament);
	};

	const handleGameStart = (mode: 'classic' | 'tournament') => {
		selectedMode = mode;

		if (auth === 1) {
			window.location.href = mode === 'classic' ? '/game' : '/tournament';
		} else {
			handleGuestFlow();
		}
	};

	buttonClassic.addEventListener('click', () => handleGameStart('classic'));
	buttonTournament.addEventListener('click', () => handleGameStart('tournament'));

	gameDiv.appendChild(buttonClassic);
	gameDiv.appendChild(buttonTournament);

	return gameDiv;
};

export const Index: PageComponent = new PageComponent(async () => {
	document.body.classList.remove('fade-out');
	document.body.classList.add('fade-in');
	document.body.classList.remove('bg-bg2');
	document.body.classList.add('bg-bg1');

	const lang = localStorage.getItem('lang') || 'fr';
	const translations = await loadLanguage(lang);

	const root: HTMLElement = document.createElement('div');

	// 🔹 Login/Profile
	root.appendChild(statusLogin(translations));

	// 🔹 Title
	const titleDiv: HTMLElement = document.createElement('div');
	titleDiv.className = 'flex flex-col items-center mx-[25%] bg-bg11 -mt-10 p-7 rounded-3xl';

	const title: HTMLParagraphElement = document.createElement('p');
	title.className = 'text-8xl hover:cursor-default font-bitcount text-bg0';
	title.setAttribute('data-i18n', 'iTitle');
	title.textContent = translations['iTitle'] ?? 'TRANSCENDENCE';

	titleDiv.appendChild(title);
	root.appendChild(titleDiv);

	// 🔹 Game section
	root.appendChild(classic(translations));

	// 🔹 Language dropdown
	root.appendChild(createLanguageMenu());

	// 🔹 Apply all remaining data-i18n translations
	applyTranslations(translations);

	return root;
});
//sur les autre pages peut etre ajouter des boutons pour revenir sur la page d'accueil

/*const isLoggedIn = checkAuth(); // Replace with real auth check

if (isLoggedIn) {
    const profileImg = document.createElement('img');
    profileImg.src = getUserProfilePic(); // Replace with actual user photo URL
    profileImg.className = 'w-12 h-12 rounded-full hover:cursor-pointer';
    buttonDiv.appendChild(profileImg);
} else {
    loginL.appendChild(button);
    buttonDiv.appendChild(loginL.make());
}*/
