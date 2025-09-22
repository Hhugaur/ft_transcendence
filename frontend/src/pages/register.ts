import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link , fadeOutAndNavigateSPA} from '../components/link';
import { createInput, createLabeledInput } from '../components/input';
import { sendRequest } from "../utils";

export const Register: PageComponent = new PageComponent(() => {
	document.body.classList.remove('bg-bg1');
	document.body.classList.add('bg-bg2');
	document.body.classList.remove('fade-out');
	document.body.classList.add('fade-in');
	const main: HTMLElement = document.createElement('div');
	const root: HTMLElement = document.createElement('div');
	root.className = 'flex justify-center';

	const buttonback: HTMLButtonElement = document.createElement('button');
	buttonback.className = 'underline ml-[5%] text-bg0';
	buttonback.textContent = 'retour';
	buttonback.addEventListener('click', (e) => {
		e.preventDefault();
		fadeOutAndNavigateSPA('/');
	});
	main.appendChild(buttonback);
	
	const div: HTMLElement = document.createElement('div');
	div.className = 'bg-bg1 border-bg0 border-4 px-30 py-30 my-[10%] rounded-3xl';
	const title: HTMLParagraphElement = document.createElement('p');
	title.className = 'text-bg0 font-bitcount hover:cursor-default text-5xl text-center -mt-[35%] -mx-7';
	title.textContent = 'INSCRIPTION';
	div.appendChild(title);

	const form: HTMLFormElement = document.createElement('form');
	form.className = 'grid';

	const user: HTMLInputElement = createInput('text', 'Username', 'Username', 'p-2 bg-bg0 mt-[26%] text-center');

	const newpass: HTMLInputElement = createInput('password', 'New Password', 'New Password', 'p-2 bg-bg0 mt-2 text-center');

	const newnewpass: HTMLInputElement = createInput('password', 'New Password', 'New New Password', 'p-2 bg-bg0 mt-2 text-center');

	const submit: HTMLInputElement = createInput('submit', '', 'Valider', 'font-caveat py-1 bg-txt1 text-bg0 text-xl mt-3 text-center rounded-sm');
	submit.value = "S'inscrire";

	form.appendChild(user);
	form.appendChild(newpass);
	form.appendChild(newnewpass);
	form.appendChild(submit);
	div.appendChild(form);

	form.onsubmit = (e) => {
		e.preventDefault(); // Prevent page reload

		const username = user.value.trim();
		const newpassword = newpass.value.trim();
		const newnewpassword = newnewpass.value.trim();

		// Basic validation
		if (!username || !newpassword || !newnewpassword) {
			alert('Veuillez remplir tous les champs.');
			return;
		}

		if (newpassword !== newnewpassword) {
			alert('Les mots de passes ne sont pas identiques!')
			return ;
		}

		sendRequest('https://transcendence.42.fr:42069/api/auth/register', 'username',
			'password', username, newpassword);

	};

	const or: HTMLParagraphElement = document.createElement('p');
	or.className = 'text-bg0 text-center mt-1 mb-1';
	or.textContent = 'or';
	div.appendChild(or);

	const google: HTMLAnchorElement = document.createElement('a');
	google.className = 'text-bg1 bg-bg0 ml-[31%] py-1 px-5';
	google.textContent = 'GOOGLE';

	div.appendChild(google);

	root.appendChild(div);
	main.appendChild(root);
	return main;
});
