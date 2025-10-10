import { lang } from '../../languages/language';

import { PageComponent } from '../components/component';

import { statusLogin, classic } from '../utils/index_utils';
import { changingScreen } from '../utils/screen_utils';


export const Index: PageComponent = new PageComponent(() => {
    changingScreen(false);
    const root: HTMLElement = document.createElement('div');

	// --- Login / Profile Section ---
    root.appendChild(statusLogin());

    // --- Title Section ---
    const titleDiv: HTMLElement = document.createElement('div');
    titleDiv.className = 'flex flex-col items-center mx-[25%] bg-bg11 -mt-10 p-7 rounded-3xl';

    const title: HTMLParagraphElement = document.createElement('p');
    title.className = 'text-8xl hover:cursor-default font-bitcount text-bg0';
    title.textContent = lang.iTitle; //TRANSCENDENCE

    titleDiv.appendChild(title);
    root.appendChild(titleDiv);

    // --- Game Section ---
    root.appendChild(classic());
    
    //bonus pour plus tard
    //root.appendChild(createLanguageMenu());
    return root;
});