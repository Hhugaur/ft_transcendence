import { PageComponent, HTMLComponent } from '../components/component';
import { statusLogin, classic } from '../utils/index_utils';

export const Index: PageComponent = new PageComponent(() => {
   document.body.classList.remove('fade-out');
   document.body.classList.add('fade-in');
   document.body.classList.remove('bg-bg2');
   document.body.classList.add('bg-bg1');

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