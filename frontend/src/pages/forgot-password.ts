import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

export const ForgotPassword: PageComponent = new PageComponent(() => {
	document.body.classList.remove('fade-out');
   	document.body.classList.add('fade-in');
	document.body.classList.remove('bg-bg1');
	document.body.classList.add('bg-bg2');
	const root: HTMLElement = document.createElement('div');
	root.className = 'flex justify-center '
	const wip: HTMLElement = document.createElement('p');
	wip.className = 'text-8xl text-bg0 mt-[20%]';
	wip.textContent = 'Work In Progress'
	root.appendChild(wip);
	return root;
});