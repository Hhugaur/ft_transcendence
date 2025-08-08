import {
        PageComponent,
        HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';


let auth: number;

const statusLogin: () => HTMLElement = () => {

	const buttonDiv: HTMLElement = document.createElement('div');
	buttonDiv.className = 'flex text-bg0 justify-end mr-10 mt-4';

	if(0)
	{
		const imgDiv: HTMLElement = document.createElement('div');
		imgDiv.className ='w-32 h-32 rounded-full bg-bg0 relative overflow-hidden text-sm -mb-[50%] ml-[15%]';
		const profileL: HTMLComponent = new Link('/profile');
		const img: HTMLImageElement = document.createElement('img');
		img.className = 'w-full h-full object-cover absolute top-0 left-0 text-bg0';
		img.alt = 'Image de profile';
		img.src = './test.jpg';
		const imgSpan: HTMLSpanElement =  document.createElement('span');
		imgSpan.className = 'w-full h-full flex items-center justify-center absolute top-0 left-0 text-center text-black'
		imgSpan.textContent = 'Image de profile';
		imgDiv.appendChild(img);
		imgDiv.appendChild(imgSpan);
		profileL.appendChild(imgDiv);
		buttonDiv.appendChild(profileL.make());
		auth = 1;
	}
    else {
    	const button: HTMLButtonElement = document.createElement('button');
    	button.className = 'px-15 py-5 bg-bg2 rounded-2xl grayscale-50 underline hover:cursor-pointer';
    	button.textContent = 'Se connecter';

    	const loginL: HTMLComponent = new Link('/login');
    	loginL.appendChild(button); // add button to link
    	buttonDiv.appendChild(loginL.make()); // add link to container
		auth = 0
	}
	return buttonDiv;
}


//va manquer a gerer pour le tournois en gros meme chose que classique seulement qu'a la place d'ller dans game on va dans tournament.

const classic: () => HTMLElement = () => {
    // --- Wrapper ---
    const gameDiv: HTMLElement = document.createElement('div');
    gameDiv.className = 'flex flex-col items-center text-2xl text-bg0';

    // --- Classic Mode Button ---
    const buttonClassic: HTMLButtonElement = document.createElement('button');
    buttonClassic.className = 'hover:cursor-pointer mt-70 px-15 py-5 bg-bg2 rounded-2xl';
    buttonClassic.textContent = 'Classique';

    // --- Tournament Mode Button ---
    const buttonTournament: HTMLButtonElement = document.createElement('button');
    buttonTournament.className = 'hover:cursor-pointer mt-10 px-17 py-5 bg-bg2 rounded-2xl';
    buttonTournament.textContent = 'Tournoi';

    const tournamentL: HTMLComponent = new Link('/tournament');
    tournamentL.appendChild(buttonTournament);

    const tournamentElement = tournamentL.make(); // <--- cache it

    // --- Event Listener for Classic Button ---
    buttonClassic.addEventListener('click', () => {
        if (auth == 1) {
            window.location.href = '/game';
        } else {
            // Replace Classic with an input field
            const nameInput: HTMLInputElement = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Entrez votre pseudo';
            nameInput.className = 'hover:cursor-pointer text-center mx-auto mt-70 px-15 py-5 bg-bg2 rounded-2xl';

            gameDiv.replaceChild(nameInput, buttonClassic);

            // Replace Tournament button with a new "Jouer" button
            const playButton: HTMLButtonElement = document.createElement('button');
            playButton.textContent = 'Jouer';
            playButton.className = 'hover:cursor-pointer mx-auto mt-10 px-17 py-5 bg-bg2 rounded-2xl';

            playButton.addEventListener('click', () => {
                const username = nameInput.value.trim();
                if (username.length === 0) {
                    alert('Veuillez entrer un pseudo.');
                    return;
                }

                // Save guest name
                localStorage.setItem('guestName', username);

                // Redirect or trigger game logic
                window.location.href = '/game';
            });

            gameDiv.replaceChild(playButton, tournamentElement);
        }
    });

    // --- Append Initial Buttons ---
    gameDiv.appendChild(buttonClassic);
    gameDiv.appendChild(tournamentElement);

    return gameDiv;
};

export const Index: PageComponent = new PageComponent(() => {
   document.body.classList.remove('bg-bg2');
   document.body.classList.add('bg-bg1');

    const root: HTMLElement = document.createElement('div');
	// --- Login / Profile Section ---
	// peut etre implementer un menu deroulant pour avoir acces au bouton deconnecter(?)
    root.appendChild(statusLogin());

    // --- Title Section ---
    const titleDiv: HTMLElement = document.createElement('div');
    titleDiv.className = 'flex flex-col items-center mx-[25%] bg-bg11 -mt-10 p-7 rounded-4xl';

    const title: HTMLParagraphElement = document.createElement('p');
    title.className = 'text-8xl hover:cursor-default font-bitcount text-bg0';
    title.textContent = 'TRANSCENDENCE';

    titleDiv.appendChild(title);
    root.appendChild(titleDiv);

	// Add game buttons section to root
    root.appendChild(classic());

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
	// --- Dropdown Menu Section ---
    const dropdownWrapper: HTMLElement = document.createElement('div');
    dropdownWrapper.className = 'relative inline-block text-left ml-[15%] mt-4';

    const dropdownButton: HTMLButtonElement = document.createElement('button');
    dropdownButton.id = 'dropdownButton';
    dropdownButton.className = 'inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none';
    dropdownButton.innerHTML = `
        Menu
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    `;
    dropdownWrapper.appendChild(dropdownButton);

    const dropdownMenu: HTMLElement = document.createElement('div');
    dropdownMenu.id = 'dropdownMenu';
    dropdownMenu.className = 'hidden origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10';

    dropdownMenu.innerHTML = `
        <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
        </div>
    `;
    dropdownWrapper.appendChild(dropdownMenu);
	root.appendChild(dropdownWrapper);
		*/