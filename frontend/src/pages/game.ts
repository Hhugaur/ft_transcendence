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
	return root;
});