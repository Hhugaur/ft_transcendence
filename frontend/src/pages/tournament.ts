import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';
import { lang } from '../components/language';

export const Tournament: PageComponent = new PageComponent(() => {
	document.body.classList.remove('fade-out');
	document.body.classList.add('fade-in');
	document.body.classList.remove('bg-bg2');
	document.body.classList.add('bg-bg1');
	const root: HTMLElement = document.createElement('div');
	const back: HTMLComponent = new Link ('/');
	const buttonback: HTMLElement = document.createElement('button');
	buttonback.className = 'underline ml-[5%] text-bg0';
	buttonback.textContent = lang.back;
	back.appendChild(buttonback);
	root.appendChild(back.make());
	return root;
});