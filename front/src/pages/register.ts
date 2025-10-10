import { lang } from '../../languages/language';

import { PageComponent, HTMLComponent } from '../components/component';

import { sendRequest } from '../utils/api';
import { createButtonBack } from '../utils/button_utils';
import { createInput } from '../utils/input';
import { changingScreen } from '../utils/screen_utils';



export const Register: PageComponent = new PageComponent(() => {
	changingScreen(true);
	const main: HTMLElement = document.createElement('div');
	const root: HTMLElement = document.createElement('div');
	root.className = 'flex justify-center';

	main.appendChild(createButtonBack());
	
	const div: HTMLElement = document.createElement('div');
	div.className = 'bg-bg1 border-bg0 border-4 px-30 py-30 my-[10%] rounded-3xl';
	const title: HTMLParagraphElement = document.createElement('p');
	title.className = 'text-bg0 font-bitcount hover:cursor-default text-5xl text-center -mt-[35%] -mx-7';
	title.textContent = lang.rTitle; // REGISTRATION
	div.appendChild(title);

	const form: HTMLFormElement = document.createElement('form');
	form.className = 'grid';

	const user: HTMLInputElement = createInput('text', lang.rInput1, 'Username', 'p-2 bg-bg0 mt-[26%] text-center');

	const newpass: HTMLInputElement = createInput('password', lang.rInput2, 'New Password', 'p-2 bg-bg0 mt-2 text-center');

	const newnewpass: HTMLInputElement = createInput('password', lang.rInput2, 'New New Password', 'p-2 bg-bg0 mt-2 text-center');

	const submit: HTMLInputElement = createInput('submit', '', 'Valider', 'font-caveat py-1 bg-txt1 text-bg0 text-xl mt-3 text-center rounded-sm');
	submit.value = lang.rSubmit; //Sign Up

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
	or.textContent = lang.or; //or
	div.appendChild(or);

	const google: HTMLAnchorElement = document.createElement('a');
	google.className = 'text-bg1 bg-bg0 ml-[31%] py-1 px-5';
	google.textContent = 'GOOGLE';

	div.appendChild(google);

	root.appendChild(div);
	main.appendChild(root);
	return main;
});