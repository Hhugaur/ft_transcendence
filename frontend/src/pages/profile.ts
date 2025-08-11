import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

export const Profile: PageComponent = new PageComponent(() => {
	document.body.classList.remove('bg-bg1');
	document.body.classList.add('bg-bg2');
	const root: HTMLElement = document.createElement('div');
	root.className = 'font-CaveatBrush';
	
	const htwo: HTMLHeadingElement = document.createElement('h2');
	htwo.className = 'flex justify-center font-bitcount text-bg0 text-8xl bg-bg21 mx-[35%] mt-[2%]';
	htwo.textContent = 'PROFIL';
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
	const profDiv: HTMLElement = document.createElement('div');
	profDiv.className = 'flex bg-bg1 border-bg0 border-8 mt-[2%] pb-[30%] ml-[2%] mr-[75%]';
	const profP: HTMLParagraphElement = document.createElement('p');
	profP.className = 'mx-[30%] text-bg0 mt-2 text-4xl';
	profP.textContent = 'Profile';
	profDiv.appendChild(profP);
	
	const lFriendDiv: HTMLElement = document.createElement('div');
	lFriendDiv.className = 'flex justify-end bg-bg1 border-bg0 border-8 ml-[80%] -mt-[33.3%] mr-[2%] pb-[30%]';
	const friendP: HTMLParagraphElement = document.createElement('p');
	friendP.className = 'mx-[30%] text-xl text-bg0 mt-2';
	friendP.textContent = "Liste d'amie";
	lFriendDiv.appendChild(friendP);
	
	const histDiv: HTMLElement = document.createElement('div');
	histDiv.className = 'flex justify-center bg-bg1 border-bg0 border-8 ml-[30%] mr-[25%] -mt-[32.7%] pb-[30%]';
	const histP: HTMLParagraphElement = document.createElement('p');
	histP.className = 'mx-[30%] text-4xl text-bg0 mt-2';
	histP.textContent = "Historique de partie";
	
	histDiv.appendChild(histP);
	tabDiv.appendChild(profDiv);
	tabDiv.appendChild(lFriendDiv);
	tabDiv.appendChild(histDiv);
	
	root.appendChild(tabDiv);
	return root;
});