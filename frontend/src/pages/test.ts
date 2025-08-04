import {
        PageComponent,
        HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

export const Test: PageComponent = new PageComponent(() => {
        const root: HTMLElement = document.createElement('div');
        root.className = 'text-blue-600 flex';
        const title: HTMLComponent = new Title();
        title.textContent = 'Trascendence - a pong at the end of time';
        title.className = 'text-red-200';
        root.appendChild(title.make());
        const link: HTMLComponent = new Link('/');
        const p: HTMLElement = document.createElement('p');
        p.textContent = 'index';
        link.appendChild(p);
        root.appendChild(link.make());
        return root;
});
