import {
        PageComponent,
        HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

export const Login: PageComponent = new PageComponent(() => {
	document.body.classList.remove('bg-bg1');
	document.body.classList.add('bg-bg2');
	const root: HTMLElement = document.createElement('div');
	root.className = 'flex justify-center';
	const div: HTMLElement = document.createElement('div');
	div.className = 'bg-bg1 border-bg0 border-2 px-30 py-30 my-[12%] rounded-4xl';
	const title: HTMLParagraphElement = document.createElement('p');
	title.className = 'text-bg0 hover:cursor-default text-4xl text-center -mt-[35%]';
	title.textContent = 'CONNEXION';
	div.appendChild(title);
	const form: HTMLFormElement = document.createElement('form');
	form.className = 'grid';
	//ici faudra mettre des check vu que c'est ici que va avoir le formulaire pour la connexion
	const user: HTMLInputElement = document.createElement('input');
	user.type = 'text';
	user.placeholder = 'Username';
	user.id = 'Username';
	user.className = 'p-2 bg-bg0 mt-[30%] text-center';
	const pass: HTMLInputElement = document.createElement('input');
	pass.type = 'password';
	pass.placeholder = 'Password';
	pass.id = 'Password';
	pass.className = 'p-2 bg-bg0 mt-2 text-center';
	//peut etre un link ici car qunad c'est le reste est valider doit revenir sur la page principale mais 
	//je pense que pour l'instant je vais le diriger vers la page de profile
	const submit: HTMLInputElement = document.createElement('input');
	submit.type = 'submit';
	submit.value = 'Se connecter';
	submit.id = 'Valider';
	submit.className = 'py-1 bg-txt1 text-bg0 text-xl mt-3 text-center rounded-sm';
	form.appendChild(user);
	form.appendChild(pass);
	form.appendChild(submit);
	div.appendChild(form);
	const or: HTMLParagraphElement = document.createElement('p');
	or.className = 'text-bg0 text-center mt-1 mb-1';
	or.textContent = 'or';
	div.appendChild(or);
	//ici le transformer en link pour qu'il aille vers le bon endroint
	const google: HTMLAnchorElement = document.createElement('a');
	google.className = 'text-bg1 bg-bg0 ml-[30%]  py-1 px-5';
	google.textContent = 'google';
	div.appendChild(google);
	//va manquer les link pour ammener ou il faut quand mot de pass oublie et quand il faut s'inscrire
	const buttonDiv: HTMLElement = document.createElement('div');
	buttonDiv.className = 'mt-20 -mb-20 text-bg0';
	const registerB: HTMLElement = document.createElement('button');
	registerB.className = 'hover:cursor-pointer ml-50 -mr-60 underline text-sm';
	registerB.textContent = "S'inscrire";
	const forgotpass: HTMLElement = document.createElement('button');
	forgotpass.className = 'hover:cursor-pointer -ml-20  underline text-sm';
	forgotpass.textContent = 'Mot de passe oublié';
	buttonDiv.appendChild(registerB);
	buttonDiv.appendChild(forgotpass);
	div.appendChild(buttonDiv);
	root.appendChild(div);
	return root;
});

/* const link: HTMLComponent = new Link('/test');
    root.appendChild(link.make());*/


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