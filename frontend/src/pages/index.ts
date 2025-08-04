import {
        PageComponent,
        HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

export const Index: PageComponent = new PageComponent(() => {
   document.body.classList.add('bg-bg1');

    const root: HTMLElement = document.createElement('div');

    // --- Login / Profile Section ---
    const buttonDiv: HTMLElement = document.createElement('div');
    buttonDiv.className = 'flex text-bg0 justify-end mr-10 mt-4';
	//ne pas oublier de mettre un if
    const button: HTMLButtonElement = document.createElement('button');
    button.className = 'px-15 py-5 bg-bg2 rounded-2xl grayscale-50 underline hover:cursor-pointer';
    button.textContent = 'Se connecter';

    const loginL: HTMLComponent = new Link('/login');
    loginL.appendChild(button); // add button to link
    buttonDiv.appendChild(loginL.make()); // add link to container
    root.appendChild(buttonDiv); // add container to page

    // --- Title Section ---
    const titleDiv: HTMLElement = document.createElement('div');
    titleDiv.className = 'flex flex-col items-center mx-[25%] bg-bg11 -mt-10 p-7 rounded-4xl';

    const title: HTMLParagraphElement = document.createElement('p');
    title.className = 'text-8xl hover:cursor-default font-bitcount text-bg0';
    title.textContent = 'TRANSCENDENCE';

    titleDiv.appendChild(title);
    root.appendChild(titleDiv);

    // --- Game Buttons Section ---
    const gameDiv: HTMLElement = document.createElement('div');
    gameDiv.className = 'flex flex-col text-2xl text-bg0';

    // --- Classic Mode Button ---
    const buttonClassic: HTMLButtonElement = document.createElement('button');
    buttonClassic.className = 'hover:cursor-pointer mx-auto mt-70 px-15 py-5 bg-bg2 rounded-2xl';
    buttonClassic.textContent = 'Classique';

    const classicL: HTMLComponent = new Link('/game');
    classicL.appendChild(buttonClassic);
    gameDiv.appendChild(classicL.make());

    // --- Tournament Mode Button ---
    const buttonTournament: HTMLButtonElement = document.createElement('button');
    buttonTournament.className = 'hover:cursor-pointer mx-auto mt-10 px-17 py-5 bg-bg2 rounded-2xl';
    buttonTournament.textContent = 'Tournoi';

    const tournamentL: HTMLComponent = new Link('/tournament');
    tournamentL.appendChild(buttonTournament);
    gameDiv.appendChild(tournamentL.make());

    // Add game buttons section to root
    root.appendChild(gameDiv);

    return root;
});


/*const isLoggedIn = checkAuth(); // Replace with real auth check

if (isLoggedIn) {
    const profileImg = document.createElement('img');
    profileImg.src = getUserProfilePic(); // Replace with actual user photo URL
    profileImg.className = 'w-12 h-12 rounded-full hover:cursor-pointer';
    buttonDiv.appendChild(profileImg);
} else {
    loginL.appendChild(button);
    buttonDiv.appendChild(loginL.make());
}*/

/*
    root.className = 'text-bg0 flex';
    const title: HTMLComponent = new Title();
    title.textContent = 'Trascendence - a pong at the end of time';
    title.className = 'text-bg0';
    root.appendChild(title.make());
    const link: HTMLComponent = new Link('/test');
    root.appendChild(link.make());
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
*/