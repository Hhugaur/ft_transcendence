import {
        PageComponent,
        HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

export const Index: PageComponent = new PageComponent(() => {
        const root: HTMLElement = document.createElement('div');
        root.className = 'text-blue-600 flex';
        const title: HTMLComponent = new Title();
        title.textContent = 'Trascendence - a pong at the end of time';
        title.className = 'text-red-200';
        root.appendChild(title.make());
        const link: HTMLComponent = new Link('/test');
        const p: HTMLElement = document.createElement('p');
        p.textContent = 'test';
        const p2: HTMLElement = document.createElement('p');
        p2.textContent = 'test2';
        const p1: HTMLElement = document.createElement('p');
        p1.textContent = 'test3';
        link.appendChild(p);
        link.appendChild(p2);
        link.appendChild(p1);
        root.appendChild(link.make());
        return root;
});
