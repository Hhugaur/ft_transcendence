import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

export const Game: PageComponent = new PageComponent(() => {
	document.body.classList.remove('bg-bg2');
	document.body.classList.add('bg-bg1');
	const root: HTMLElement = document.createElement('div');
	const back: HTMLComponent = new Link ('/');
	const buttonback: HTMLElement = document.createElement('button');
	buttonback.className = 'underline ml-[5%] text-bg0';
	buttonback.textContent = 'retour';
	back.appendChild(buttonback);
	root.appendChild(back.make());
	return root;
});