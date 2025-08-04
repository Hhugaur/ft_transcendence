import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

export const Profile: PageComponent = new PageComponent(() => {
	const root: HTMLElement = document.createElement('div');

	return root;
});