import {
        PageComponent,
        HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

function createInput(type: string, placeholder: string, id: string, className: string): HTMLInputElement {
	const input = document.createElement('input');
	input.type = type;
	if(placeholder)
		input.placeholder = placeholder;
	input.id = id;
	input.className = className;
	return input;
}

export const Login: PageComponent = new PageComponent(() => {
	document.body.classList.remove('bg-bg1');
	document.body.classList.add('bg-bg2');
	const root: HTMLElement = document.createElement('div');
	root.className = 'flex justify-center';
	const div: HTMLElement = document.createElement('div');
	div.className = 'bg-bg1 border-bg0 border-4 px-30 py-30 my-[12%] rounded-3xl';
	const title: HTMLParagraphElement = document.createElement('p');
	title.className = 'text-bg0 font-bitcount hover:cursor-default text-5xl text-center -mt-[35%]';
	title.textContent = 'CONNEXION';
	div.appendChild(title);
	const form: HTMLFormElement = document.createElement('form');
	form.className = 'grid';
	//ici faudra mettre des check vu que c'est ici que va avoir le formulaire pour la connexion
	const user: HTMLInputElement = createInput('text', 'Username', 'Username', 'p-2 bg-bg0 mt-[28%] text-center rounded-sm');

	const pass: HTMLInputElement = createInput('password', 'Password', 'Password', 'p-2 bg-bg0 mt-2 text-center rounded-sm');

	//attendre qu'il y a ce qu'il faut pour apres le redecaler vers les bon endroits (accueil)
	const submit: HTMLInputElement = createInput('submit', '', 'Valider', 'py-1 bg-txt1 text-bg0 text-xl mt-3 text-center rounded-sm');
	submit.value = 'Se connecter';
	form.appendChild(user);
	form.appendChild(pass);
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

		// Example of sending to an API
		// fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }), ... })
		// alert(`Tentative de connexion avec:\nUsername: ${username}\nPassword: ${password}`);
	};

	const or: HTMLParagraphElement = document.createElement('p');
	or.className = 'text-bg0 text-center mt-1 mb-1';
	or.textContent = 'or';
	div.appendChild(or);

	//ici le transformer en link pour qu'il aille vers le bon endroint
	const google: HTMLAnchorElement = document.createElement('a');
	google.className = 'text-bg1 bg-bg0 ml-[30%] py-1 px-5';
	google.textContent = 'GOOGLE';
	div.appendChild(google);

	//va manquer le link le mot de passe oublié
	const buttonDiv: HTMLElement = document.createElement('div');
	buttonDiv.className = 'mt-20 -mb-20 text-bg0';
	const registerB: HTMLElement = document.createElement('button');
	registerB.className = 'hover:cursor-pointer ml-60 -mr-70 underline text-sm';
	registerB.textContent = "S'inscrire";
	const forgotpass: HTMLElement = document.createElement('button');
	forgotpass.className = 'hover:cursor-pointer -ml-20 underline text-sm';
	forgotpass.textContent = 'Mot de passe oublié';

	const registerL: HTMLComponent = new Link('/register');
	const forgotpassL: HTMLComponent = new Link('/forgot-password');
	registerL.appendChild(registerB); 
	buttonDiv.appendChild(registerL.make());
	forgotpassL.appendChild(forgotpass);
	buttonDiv.appendChild(forgotpassL.make());
	div.appendChild(buttonDiv);

	root.appendChild(div);
	return root;
});

/*form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = user.value.trim();
  const password = pass.value;

  if (!username || !password) {
    alert('Please fill out both fields.');
    return;
  }

  // Do your login logic here...
  console.log('Logging in with:', username, password);
});
*/

/*registerB.addEventListener('click', (e) => {
    e.preventDefault();
    // Navigate to registration page or trigger route change
    console.log("Redirect to registration page");
});

forgotpass.addEventListener('click', (e) => {
    e.preventDefault();
    // Handle forgot password logic or navigate
    console.log("Redirect to forgot password page");
});
*/

/*const forgotpassL: HTMLComponent = new Link('/forgot-password');
const forgotpass: HTMLElement = document.createElement('button');
forgotpass.className = 'hover:cursor-pointer -ml-20 underline text-sm';
forgotpass.textContent = 'Mot de passe oublié';
forgotpassL.appendChild(forgotpass);
buttonDiv.appendChild(forgotpassL.make()); */