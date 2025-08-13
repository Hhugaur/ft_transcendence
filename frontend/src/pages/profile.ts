import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';
import { createMatchItem, Match } from '../components/matchHistory';
import { createInput, createLabeledInput } from '../components/input';

export const Profile: PageComponent = new PageComponent(() => {
	document.body.classList.remove('bg-bg1');
	document.body.classList.add('bg-bg2');
	const root: HTMLElement = document.createElement('div');
	root.className = 'font-CaveatBrush';
	
	const back: HTMLComponent = new Link ('/');
	const buttonback: HTMLElement = document.createElement('button');
	buttonback.className = 'underline ml-[5%] text-bg0';
	buttonback.textContent = 'retour';
	back.appendChild(buttonback);
	root.appendChild(back.make());

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
	const userInput = createLabeledInput(
	'text', 'Username', 'Username :',
	'p-2 w-full bg-bg0 text-center rounded-sm ml-1'
	);
	const passInput = createLabeledInput(
	'password', 'Password', 'Password : ',
	'p-2 w-full bg-bg0 text-center rounded-sm ml-1'
	);
	const winratetxt: HTMLElement = document.createElement('p');
	winratetxt.className = 'text-bg0 ml-1';
	winratetxt.textContent = 'Winrate :';
	//creation d'une fonctionne qui donne la value de winrate si c'est en dessous de 50 sa sera en txt-txt1
	const winrate: HTMLElement = document.createElement('p');
	winrate.className = 'ml-1 text-txt0 bg-bg0 mr-[50%] text-center -mt-2';
	winrate.textContent = '55%';

	profDiv.appendChild(profP);
	profDiv.appendChild(userInput);
	profDiv.appendChild(passInput);
	profDiv.appendChild(winratetxt);
	profDiv.appendChild(winrate);

	const histDiv: HTMLElement = document.createElement('div');
	histDiv.className = 'col-span-1 grid bg-bg1 border-bg0 border-8 -mx-[9%]';

	const histP: HTMLParagraphElement = document.createElement('p');
	histP.className = 'text-center text-4xl text-bg0 mt-3';
	histP.textContent = "Historique de partie";

	// Example mock data
	//max 7 match a afficher 
	const matchData: Match[] = [
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
		{ opponent: 'Player123', date: '2025-08-01', touch_blue: 1, touch_red: 10  ,score: '10 - 7' },
	];

	histDiv.appendChild(histP);

	// Add each match as a collapsible item
	matchData.forEach(match => {
		const matchItem = createMatchItem(match);
		histDiv.appendChild(matchItem);
	});

	const lFriendDiv: HTMLElement = document.createElement('div');
	lFriendDiv.className = 'col-span-1 bg-bg1 border-bg0 border-8 ml-[10%]';
	const friendP: HTMLParagraphElement = document.createElement('p');
	friendP.className = 'text-center text-4xl text-bg0 mt-3';
	friendP.textContent = "Liste d'amis";
	const searchfriend: HTMLInputElement = createInput('text', 'chercher un ami', 'friendid', 'ml-1 mt-2');
	lFriendDiv.appendChild(friendP);
	lFriendDiv.appendChild(searchfriend);
	

	tabDiv.appendChild(profDiv);
	tabDiv.appendChild(histDiv);
	tabDiv.appendChild(lFriendDiv);
	
	root.appendChild(tabDiv);
	return root;
});