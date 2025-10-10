import { lang } from '../../languages/language';

import { PageComponent, HTMLComponent } from '../components/component';

import { createButtonBack } from '../utils/button_utils';
import { isAuth } from '../utils/index_utils';
import { changingScreen } from '../utils/screen_utils';
import { createFriendItem, createProfDiv } from '../utils/profil_utils';




export const Profile: PageComponent = new PageComponent(() => {

	if (isAuth === 0)
	{
        //check if spa compliant
        window.location.replace('/');
		//fadeOutAndNavigateSPA('/');
	}
    changingScreen(true);
	const root: HTMLElement = document.createElement('div');

	root.className = 'font-CaveatBrush';
	
	root.appendChild(createButtonBack());

	const disc: HTMLButtonElement = document.createElement('button');
	disc.className = 'ml-[80%] text-bg0 underline';
	disc.textContent = lang.disc; // disconnect
	root.appendChild(disc);

	const htwo: HTMLHeadingElement = document.createElement('h2');
	htwo.className = 'flex justify-center font-bitcount text-bg0 text-8xl bg-bg21 mx-[35%] mt-[1%]';
	htwo.textContent = lang.pTitle1; // PROFILE
	root.appendChild(htwo);

	const imgDiv: HTMLElement = document.createElement('div');
	imgDiv.className = 'w-32 h-32 rounded-full bg-bg0 overflow-hidden flex items-center justify-center relative text-center text-sm -mb-[1%] ml-[15%]';
	const imgProf: HTMLImageElement = document.createElement('img');
	imgProf.className = 'w-full h-full object-cover absolute top-0 left-0 text-bg0';
	imgProf.alt = lang.altImage; // Profile picture

	async function displayAvatar(username: string) {
		const res = await fetch(`https://transcendence.42.fr:42069/api/auth/avatar/${username}`);
		if (!res.ok) {
			console.error("Impossible de charger l'avatar");
			return;
		}

		const data = await res.json();

		imgProf.src = data.avatar;
	}

	displayAvatar("test1234");

	const imgSpan: HTMLSpanElement =  document.createElement('span');
	imgSpan.textContent = lang.altImage; // Profile Picture
	imgDiv.appendChild(imgProf);
	imgDiv.appendChild(imgSpan);
	root.appendChild(imgDiv);


	const tabDiv: HTMLElement = document.createElement('div');
	tabDiv.className = 'grid grid-cols-3 gap-8 mt-[2%] mx-[1%]';

	const histDiv: HTMLElement = document.createElement('div');
	histDiv.className = 'col-span-1 grid bg-bg1 border-bg0 border-8 -mx-[9%]';

	const histP: HTMLParagraphElement = document.createElement('p');
	histP.className = 'text-center text-4xl text-bg0 mt-3';
	histP.textContent = lang.pTitle3; // Match History

	histDiv.appendChild(histP);

	const matchData: Match[] = [
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
	];
	matchData.slice(0, 7).forEach(match => {
		const matchItem = createMatchItem(match);
		histDiv.appendChild(matchItem);
	});
 
	const lFriendDiv: HTMLElement = document.createElement('div');
	lFriendDiv.className = 'col-span-1 bg-bg1 border-bg0 border-8 ml-[10%]';
	const friendP: HTMLParagraphElement = document.createElement('p');
	friendP.className = 'text-center text-4xl text-bg0 mt-3';
	friendP.textContent = lang.pTitle4; // "Friends List"
	lFriendDiv.appendChild(friendP);

	// Conteneur pour le champ et le bouton
	const addFriendContainer = document.createElement('div');
	addFriendContainer.className = 'flex items-center gap-2 px-2 mt-2';

	// Champ de saisie
	const friendInput = document.createElement('input');
	friendInput.type = 'text';
	friendInput.placeholder = lang.pInput; //Friend's name
	friendInput.className = 'flex-1 px-2 py-1 rounded border border-bg0';

	// Bouton d'ajout
	const addFriendButton = document.createElement('button');
	addFriendButton.textContent = lang.pButton1; //Add
	addFriendButton.className = 'bg-bg0 text-txt0 px-4 py-1 rounded hover:bg-bg2 transition';

	// Liste d'amis (conteneur où on ajoute dynamiquement)
	const friendListContainer = document.createElement('div');
	friendListContainer.className = 'mt-4';

	// Action quand on clique sur “Ajouter”
	addFriendButton.onclick = () => {
		const name = friendInput.value.trim();
		if (name !== '') {
			const friendItem = createFriendItem(name, "in-game"); // Appelle ta fonction définie plus tôt
			friendListContainer.appendChild(friendItem);
			friendInput.value = '';
			// Tu peux aussi appeler ici une fonction d'envoi backend
		}
	};

	// Assemble le champ + bouton
	addFriendContainer.appendChild(friendInput);
	addFriendContainer.appendChild(addFriendButton);
	lFriendDiv.appendChild(addFriendContainer);

	// Ajoute le conteneur de la liste
	lFriendDiv.appendChild(friendListContainer);

	// Optionnel : amis existants
	const friends = ['Alice', 'Bob', 'Charlie'];
	friends.forEach(friend => {
		const item = createFriendItem(friend, 'online');
		friendListContainer.appendChild(item);
	});

	tabDiv.appendChild(createProfDiv());
	tabDiv.appendChild(histDiv);
	tabDiv.appendChild(lFriendDiv);
	
	root.appendChild(tabDiv);
	return root;
});
