import { lang } from '../../languages/language';

import { PageComponent, HTMLComponent } from '../components/component';
import { Link , fadeOutAndNavigateSPA } from '../components/link';
import { Router } from '../components/router';

import { sendRequest } from '../utils/api';
import { createButtonBack } from '../utils/button_utils';
import { createInput } from '../utils/input';

const app = Router.getInstance();


export const Login: PageComponent = new PageComponent(() => {
	
	document.body.classList.remove('bg-bg1');
	document.body.classList.add('bg-bg2');
	document.body.classList.remove('fade-out');
	document.body.classList.add('fade-in');
	const main: HTMLElement = document.createElement('div');
	const root: HTMLElement = document.createElement('div');
	root.className = 'flex justify-center';

	main.appendChild(createButtonBack());

	const div: HTMLElement = document.createElement('div');
	div.className = 'bg-bg1 border-bg0 border-4 px-30 py-30 my-[10%] rounded-3xl';
	const title: HTMLParagraphElement = document.createElement('p');
	title.className = 'text-bg0 font-bitcount hover:cursor-default text-4xl text-center -mt-[35%]';
	title.textContent = lang.lTitle; //Login
	div.appendChild(title);
	const form: HTMLFormElement = document.createElement('form');
	form.className = 'grid';

	const user: HTMLInputElement = createInput('text', 'Username', 'Username', 'p-2 bg-bg0 mt-[28%] text-center rounded-sm');

	const pass: HTMLInputElement = createInput('password', 'Password', 'Password', 'p-2 bg-bg0 mt-2 text-center rounded-sm');

	const toggleBtn: HTMLButtonElement = document.createElement('button');
	toggleBtn.type = 'button';
	toggleBtn.textContent = lang.lButton1; // Username
	toggleBtn.className = 'ml-2 text-sm text-txt1 underline whitespace-nowrap w-[70px] overflow-hidden text-center -mr-10';

	const passRow = document.createElement('div');
	passRow.className = 'flex items-center mt-2';
	passRow.appendChild(pass);
	passRow.appendChild(toggleBtn);

	toggleBtn.addEventListener('click', () => {
		pass.type = pass.type === 'password' ? 'text' : 'password';
		toggleBtn.textContent = pass.type === 'password' ? lang.lButton1 : lang.lButton2; //Show //Hide
	});

	const submit: HTMLInputElement = createInput('submit', '', 'Valider', 'py-1 bg-txt1 text-bg0 text-xl mt-3 text-center rounded-sm');
	submit.value = lang.lSubmit; // login in
	form.appendChild(user);
	form.appendChild(passRow);
	form.appendChild(submit);
	div.appendChild(form);
	
	form.onsubmit = (e) => {
		e.preventDefault(); // Prevent page reload

		const username = user.value.trim();
		const password = pass.value.trim();

		// Basic validation
		if (!username || !password) {
			alert('Veuillez remplir tous les champs.');
			return;
		}


		sendRequest('https://transcendence.42.fr:42069/api/auth/login', 'username',
			'password', username, password);
		localStorage.setItem('username', username);
	};

	const or: HTMLParagraphElement = document.createElement('p');
	or.className = 'text-bg0 text-center mt-1 mb-1';
	or.textContent = 'or';
	div.appendChild(or);

	const google: HTMLAnchorElement = document.createElement('a');
	google.className = 'text-bg1 bg-bg0 ml-[30%] py-1 px-5';
	google.textContent = 'GOOGLE';
	div.appendChild(google);

	const buttonDiv: HTMLElement = document.createElement('div');
	buttonDiv.className = 'mt-20 -mb-20 text-bg0';
	const registerB: HTMLElement = document.createElement('button');
	registerB.className = 'hover:cursor-pointer ml-60 -mr-70 underline text-sm';
	registerB.textContent = lang.rSubmit; // register
	const forgotpass: HTMLElement = document.createElement('button');
	forgotpass.className = 'hover:cursor-pointer -ml-20 underline text-sm';
	forgotpass.textContent = lang.lOther1; // forgot password

	registerB.addEventListener('click', (e) => {
		e.preventDefault();
		fadeOutAndNavigateSPA('/register');
	});

	forgotpass.addEventListener('click', (e) => {
		e.preventDefault();
		fadeOutAndNavigateSPA('/forgot-password');
	});

	buttonDiv.appendChild(registerB);
	buttonDiv.appendChild(forgotpass);
	div.appendChild(buttonDiv);

	root.appendChild(div);
	main.appendChild(root);
	return main;
});