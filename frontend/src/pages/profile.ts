import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link , fadeOutAndNavigateSPA } from '../components/link';
import { auth } from './index.ts';
import { createMatchItem, Match } from '../components/matchHistory';
import { createInput, createLabeledInput, createEditableField } from '../components/input';

function createFriendItem(friendName: string): HTMLElement {
	const container = document.createElement('div');
	container.className = 'flex items-center justify-between bg-txt1 p-2 mx-2 my-1 rounded shadow';

	// Nom de l'ami
	const name = document.createElement('p');
	name.className = 'text-bg0 font-bold';
	name.textContent = friendName;
	container.appendChild(name);

	// Conteneur des boutons
	const buttonContainer = document.createElement('div');
	buttonContainer.className = 'flex space-x-2';

	// Bouton "Voir profil"
	const profileBtn = document.createElement('button');
	profileBtn.className = 'bg-bg0 text-txt0 px-2 py-1 rounded hover:bg-bg2 transition';
	profileBtn.textContent = 'Profil';
	profileBtn.onclick = () => {
		// À remplacer par la logique réelle
		console.log(`Voir profil de ${friendName}`);
		// window.location.href = `/profile/${friendName}`; (exemple)
	};

	// Bouton "Demander match"
	const challengeBtn = document.createElement('button');
	challengeBtn.className = 'bg-bg0 text-txt0 px-2 py-1 rounded hover:bg-bg2 transition';
	challengeBtn.textContent = 'Match';
	challengeBtn.onclick = () => {
		console.log(`Envoyer une demande de match à ${friendName}`);
	};

	// Bouton "Supprimer"
	const removeBtn = document.createElement('button');
	removeBtn.className = 'bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition';
	removeBtn.textContent = 'Supprimer';
	removeBtn.onclick = () => {
		console.log(`Supprimer ${friendName} de la liste`);
		container.remove(); // Ou logique backend
	};

	// Ajout des boutons
	buttonContainer.appendChild(profileBtn);
	buttonContainer.appendChild(challengeBtn);
	buttonContainer.appendChild(removeBtn);
	container.appendChild(buttonContainer);

	return container;
}

export const Profile: PageComponent = new PageComponent(() => {
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
	buttonback.textContent = 'retour';
	back.appendChild(buttonback);
	root.appendChild(back.make());

	const leave: HTMLButtonElement = document.createElement('button');
	leave.className = 'ml-[80%] text-bg0 underline';
	leave.textContent = 'se deconnecter';
	root.appendChild(leave);

	const htwo: HTMLHeadingElement = document.createElement('h2');
	htwo.className = 'flex justify-center font-bitcount text-bg0 text-8xl bg-bg21 mx-[35%] mt-[1%]';
	htwo.textContent = 'PROFILE';
	root.appendChild(htwo);

	const imgDiv: HTMLElement = document.createElement('div');
	imgDiv.className = 'w-32 h-32 rounded-full bg-bg0 overflow-hidden flex items-center justify-center relative text-center text-sm -mb-[1%] ml-[15%]';
	const imgProf: HTMLImageElement = document.createElement('img');
	imgProf.className = 'w-full h-full object-cover absolute top-0 left-0 text-bg0';
	imgProf.alt = 'Image de profile';
	imgProf.src = './test.jpg';
	const imgSpan: HTMLSpanElement =  document.createElement('span');
	imgSpan.textContent = 'Image de profile';
	imgDiv.appendChild(imgProf);
	imgDiv.appendChild(imgSpan);
	root.appendChild(imgDiv);
	
	const tabDiv: HTMLElement = document.createElement('div');
	tabDiv.className = 'grid grid-cols-3 gap-8 mt-[2%] mx-[1%]';

	const profDiv: HTMLElement = document.createElement('div');
	profDiv.className = 'col-span-1 grid gap-4 bg-bg1 border-bg0 border-8 mr-[10%] pb-[50%]';
	const profP: HTMLParagraphElement = document.createElement('p');
	profP.className = 'text-center text-bg0 mt-3 text-4xl';
	profP.textContent = 'Profile';
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
	profDiv.appendChild(winratetxt);
	profDiv.appendChild(winrate);

	const histDiv: HTMLElement = document.createElement('div');
	histDiv.className = 'col-span-1 grid bg-bg1 border-bg0 border-8 -mx-[9%]';

	const histP: HTMLParagraphElement = document.createElement('p');
	histP.className = 'text-center text-4xl text-bg0 mt-3';
	histP.textContent = "Historique de partie";

	const matchData: Match[] = [
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
	];
	// matchData.slice(0, 7).forEach(match => {
	// const matchItem = createMatchItem(match);
	// histDiv.appendChild(matchItem);
	// });

	histDiv.appendChild(histP);

	matchData.forEach(match => {
		const matchItem = createMatchItem(match);
		histDiv.appendChild(matchItem);
	});

	//va etre mis dans une fonction pour alleger le code 
	const lFriendDiv: HTMLElement = document.createElement('div');
	lFriendDiv.className = 'col-span-1 bg-bg1 border-bg0 border-8 ml-[10%]';
	const friendP: HTMLParagraphElement = document.createElement('p');
	friendP.className = 'text-center text-4xl text-bg0 mt-3';
	friendP.textContent = "Liste d'amis";
	lFriendDiv.appendChild(friendP);

	// Conteneur pour le champ et le bouton
	const addFriendContainer = document.createElement('div');
	addFriendContainer.className = 'flex items-center gap-2 px-2 mt-2';

	// Champ de saisie
	const friendInput = document.createElement('input');
	friendInput.type = 'text';
	friendInput.placeholder = 'Nom de l\'ami';
	friendInput.className = 'flex-1 px-2 py-1 rounded border border-bg0';

	// Bouton d'ajout
	const addFriendButton = document.createElement('button');
	addFriendButton.textContent = 'Ajouter';
	addFriendButton.className = 'bg-bg0 text-txt0 px-4 py-1 rounded hover:bg-bg2 transition';

	// Liste d'amis (conteneur où on ajoute dynamiquement)
	const friendListContainer = document.createElement('div');
	friendListContainer.className = 'mt-4';

	// Action quand on clique sur “Ajouter”
	addFriendButton.onclick = () => {
		const name = friendInput.value.trim();
		if (name !== '') {
			const friendItem = createFriendItem(name); // Appelle ta fonction définie plus tôt
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
		const item = createFriendItem(friend);
		friendListContainer.appendChild(item);
	});
	//jusqu'ici lig.137

	tabDiv.appendChild(profDiv);
	tabDiv.appendChild(histDiv);
	tabDiv.appendChild(lFriendDiv);
	
	root.appendChild(tabDiv);
	return root;
});
