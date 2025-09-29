import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link , fadeOutAndNavigateSPA } from '../components/link';
import { auth, decAuthnbr } from './index.ts';
import { createMatchItem, Match } from '../components/matchHistory';
import { local, createLanguageMenu} from '../components/language';
import { createInput, createLabeledInput, createEditableField } from '../components/input';
import { sendRequest } from "../utils";

function createFriendItem(
	friendName: string,
	status: 'online' | 'in-game' | 'offline',
	avatarUrl?: string
): HTMLElement & { setStatus: (status: 'online' | 'in-game' | 'offline') => void } {
	const container = document.createElement('div');
	container.className = 'flex items-center justify-between bg-txt1 p-2 mx-2 my-1 rounded shadow';

	// === Left: Avatar + Info ===
	const leftSide = document.createElement('div');
	leftSide.className = 'flex items-center space-x-3';

	// Avatar image
	const avatar = document.createElement('img');
	avatar.src = "test.jpeg"//avatarUrl || `/avatars/${friendName}.png`; // Default path fallback
	avatar.alt = `${friendName} avatar`;
	avatar.className = 'w-10 h-10 rounded-full object-cover border border-bg0';

	// Name + Status container
	const infoWrapper = document.createElement('div');
	infoWrapper.className = 'flex flex-col';

	// Friend name
	const name = document.createElement('p');
	name.className = 'text-bg0 font-bold';
	name.textContent = friendName;

	// Status indicator
	const statusContainer = document.createElement('div');
	statusContainer.className = 'flex items-center space-x-1';

	const statusDot = document.createElement('span');
	statusDot.className = 'w-3 h-3 rounded-full';

	const statusLabel = document.createElement('span');
	statusLabel.className = 'text-xs text-bg0';

	statusContainer.appendChild(statusDot);
	statusContainer.appendChild(statusLabel);
	infoWrapper.appendChild(name);
	infoWrapper.appendChild(statusContainer);

	leftSide.appendChild(avatar);
	leftSide.appendChild(infoWrapper);

	// === Right: Buttons ===
	const buttonContainer = document.createElement('div');
	buttonContainer.className = 'flex space-x-2';

	const profileBtn = document.createElement('button');
	profileBtn.className = 'bg-bg0 text-txt0 px-2 py-1 rounded hover:bg-bg2 transition';
	profileBtn.textContent = local.pButton2;
	profileBtn.onclick = () => {
		console.log(`Voir profil de ${friendName}`);
	};

	const challengeBtn = document.createElement('button');
	challengeBtn.className = 'bg-bg0 text-txt0 px-2 py-1 rounded hover:bg-bg2 transition';
	challengeBtn.textContent = local.pButton3;
	challengeBtn.onclick = () => {
		console.log(`Envoyer une demande de match à ${friendName}`);
	};

	const removeBtn = document.createElement('button');
	removeBtn.className = 'bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition';
	removeBtn.textContent = local.pButton4;
	removeBtn.onclick = () => {
		if (confirm(`Supprimer ${friendName} ?`)) {
			console.log(`Supprimé ${friendName}`);
			container.remove();
		}
	};

	buttonContainer.appendChild(profileBtn);
	buttonContainer.appendChild(challengeBtn);
	buttonContainer.appendChild(removeBtn);

	container.appendChild(leftSide);
	container.appendChild(buttonContainer);

	// === Status updater method ===
	function applyStatus(status: 'online' | 'in-game' | 'offline') {
		statusDot.className = 'w-3 h-3 rounded-full'; // reset
		statusLabel.textContent =
			status === 'in-game' ? 'En jeu' : status === 'online' ? 'En ligne' : 'Hors ligne';

		switch (status) {
			case 'online':
				statusDot.classList.add('bg-green-500');
				break;
			case 'in-game':
				statusDot.classList.add('bg-yellow-500');
				break;
			default:
				statusDot.classList.add('bg-gray-400');
				break;
		}
	}
	applyStatus(status);

	(container as any).setStatus = applyStatus;

	// return container as HTMLElement & {
	// 	setStatus: (status: 'online' | 'in-game' | 'offline') => void;
	// };
	return Object.assign(container, {
		setStatus: applyStatus,
	});
}


export const Profile: PageComponent = new PageComponent(() => {
	document.body.classList.remove('fade-out');
	document.body.classList.add('fade-in');
	document.body.classList.remove('bg-bg1');
	document.body.classList.add('bg-bg2');
	const root: HTMLElement = document.createElement('div');
	if (auth === 0)
	{
		fadeOutAndNavigateSPA('/');
		return root;
	}
	root.className = 'font-CaveatBrush';
	
	const back: HTMLComponent = new Link ('/');
	const buttonback: HTMLElement = document.createElement('button');
	buttonback.className = 'underline ml-[5%] text-bg0';
	buttonback.textContent = local.back;
	back.appendChild(buttonback);
	root.appendChild(back.make());

	const disconnectButton: HTMLButtonElement = document.createElement('button');
	disconnectButton.className = 'ml-[80%] text-bg0 underline';
	disconnectButton.textContent = local.disc;
	root.appendChild(disconnectButton);

	// Deconnexion
	disconnectButton.onclick = () => {
		try {	
			sendRequest('https://transcendence.42.fr:42069/api/auth/disconnect', 'username', null, 'test1234', null); // test1234 a remplacer par le user
			//decAuthnbr();
			//fadeOutAndNavigateSPA('/index');
		}
		catch { return;}
	};

	const htwo: HTMLHeadingElement = document.createElement('h2');
	htwo.className = 'flex justify-center font-bitcount text-bg0 text-8xl bg-bg21 mx-[35%] mt-[1%]';
	htwo.textContent = local.pTitle1;
	root.appendChild(htwo);

	const imgDiv: HTMLElement = document.createElement('div');
	imgDiv.className = 'w-32 h-32 rounded-full bg-bg0 overflow-hidden flex items-center justify-center relative text-center text-sm -mb-[1%] ml-[15%]';
	const imgProf: HTMLImageElement = document.createElement('img');
	imgProf.className = 'w-full h-full object-cover absolute top-0 left-0 text-bg0';
	imgProf.alt = 'Image de profile';

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
	imgSpan.textContent = local.pImage;
	imgDiv.appendChild(imgProf);
	imgDiv.appendChild(imgSpan);
	root.appendChild(imgDiv);

	const uploadAvatarContainer = document.createElement('div');
	uploadAvatarContainer.className = 'flex items-center gap-2 px-2 mt-2';

	const uploadAvatarButton = document.createElement('button');
	uploadAvatarButton.textContent = 'Upload avatar';
	uploadAvatarButton.className = 'bg-bg0 text-txt0 px-4 py-1 rounded hover:shadow-md hover:bg-txt1 transition';

	const avatarInput = createInput('file', '', 'avatarInput', 'bg-txt0 flex items-center gap-2 px-2 mt-2');

	uploadAvatarContainer.appendChild(uploadAvatarButton);
	uploadAvatarContainer.appendChild(avatarInput);

	let selectedFile: File | null = null;

	avatarInput.addEventListener("change", (e: Event) => {
		const target = e.target as HTMLInputElement;
		selectedFile = target.files?.[0] || null;
	});

	uploadAvatarButton.addEventListener("click", async () => {
		if (!selectedFile) {
			alert("Aucun fichier sélectionné.");
			return;
		}

		if (!/^image\/(jpeg|png)$/.test(selectedFile.type)) {
			alert("Formats autorisés: JPG/PNG.");
			return;
		}
		if (selectedFile.size > 2097152) {
			alert("Taille max: 2 Mo.");
			return;
		}

		const form = new FormData();
		form.append("file", selectedFile);
		form.append("username", "test1234");

		try {
			const res = await fetch('https://transcendence.42.fr:42069/api/auth/upload', {
				method: "PATCH",
				body: form,
				credentials: "include",
			});

			if (!res.ok)
				throw new Error(`HTTP ${res.status}`);
			alert("Upload réussi ✅");
		} catch (err: any) {
			console.log("Échec de l’upload: ", err.message);
			alert("Échec de l’upload: " + err.message);
		}
	});
	
	const tabDiv: HTMLElement = document.createElement('div');
	tabDiv.className = 'grid grid-cols-3 gap-8 mt-[2%] mx-[1%]';

	const profDiv: HTMLElement = document.createElement('div');
	profDiv.className = 'col-span-1 grid gap-4 bg-bg1 border-bg0 border-8 mr-[10%] pb-[45%]';
	const profP: HTMLParagraphElement = document.createElement('p');
	profP.className = 'text-center text-bg0 mt-3 text-4xl';
	profP.textContent = local.pTitle2;
	const userInput = createEditableField('Username :', 'username');
	const passInput = createEditableField('Password :', '••••••');

	const winratetxt: HTMLElement = document.createElement('p');
	winratetxt.className = 'text-bg0 ml-1';
	winratetxt.textContent = 'Winrate :';
	const winrate: HTMLElement = document.createElement('p');
	const winrateValue = 55;
	winrate.textContent = `${winrateValue}%`;
	winrate.className = `ml-1 ${winrateValue < 50 ? 'text-txt1' : 'text-txt0'} bg-bg0 mr-[50%] text-center -mt-2`;

	profDiv.appendChild(profP);
	profDiv.appendChild(userInput.element);
	profDiv.appendChild(passInput.element);
	profDiv.appendChild(uploadAvatarContainer);
	profDiv.appendChild(winratetxt);
	profDiv.appendChild(winrate);

	const histDiv: HTMLElement = document.createElement('div');
	histDiv.className = 'col-span-1 grid bg-bg1 border-bg0 border-8 -mx-[9%]';

	const histP: HTMLParagraphElement = document.createElement('p');
	histP.className = 'text-center text-4xl text-bg0 mt-3';
	histP.textContent = local.pTitle3;

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



	// matchData.forEach(match => {
	// 	const matchItem = createMatchItem(match);
	// 	histDiv.appendChild(matchItem);
	// });
 
	const lFriendDiv: HTMLElement = document.createElement('div');
	lFriendDiv.className = 'col-span-1 bg-bg1 border-bg0 border-8 ml-[10%]';
	const friendP: HTMLParagraphElement = document.createElement('p');
	friendP.className = 'text-center text-4xl text-bg0 mt-3';
	friendP.textContent = local.pTitle4;
	lFriendDiv.appendChild(friendP);

	// Conteneur pour le champ et le bouton
	const addFriendContainer = document.createElement('div');
	addFriendContainer.className = 'flex items-center gap-2 px-2 mt-2';

	// Champ de saisie
	const friendInput = document.createElement('input');
	friendInput.type = 'text';
	friendInput.placeholder = local.pInput;
	friendInput.className = 'flex-1 px-2 py-1 rounded border border-bg0';

	// Bouton d'ajout
	const addFriendButton = document.createElement('button');
	addFriendButton.textContent = local.pButton1;
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

	tabDiv.appendChild(profDiv);
	tabDiv.appendChild(histDiv);
	tabDiv.appendChild(lFriendDiv);
	
	root.appendChild(tabDiv);
	return root;
});
