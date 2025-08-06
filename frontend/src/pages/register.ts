import {
		PageComponent,
		HTMLComponent
} from '../component';
import { Title } from '../components/title';
import { Link } from '../components/link';

export const Register: PageComponent = new PageComponent(() => {
	document.body.classList.remove('bg-bg1');
	document.body.classList.add('bg-bg2');
	const root: HTMLElement = document.createElement('div');
	root.className = 'flex justify-center';
	const div: HTMLElement = document.createElement('div');
	div.className = 'bg-bg1 border-bg0 border-4 px-30 py-30 my-[12%] rounded-3xl';
	const title: HTMLParagraphElement = document.createElement('p');
	title.className = 'text-bg0 font-bitcount hover:cursor-default text-5xl text-center -mt-[30%] -mx-5';
	title.textContent = 'INSCRIPTION';
	div.appendChild(title);

	const form: HTMLFormElement = document.createElement('form');
	form.className = 'grid';

	//ici faudra mettre des check vu que c'est ici que va avoir le formulaire pour la connexion
	const user: HTMLInputElement = document.createElement('input');
	user.type = 'text';
	user.placeholder = 'Username';
	user.id = 'Username';
	user.className = 'p-2 bg-bg0 mt-[26%] text-center';

	const newpass: HTMLInputElement = document.createElement('input');
	newpass.type = 'password';
	newpass.placeholder = 'New Password';
	newpass.id = 'New Password';
	newpass.className = 'p-2 bg-bg0 mt-2 text-center';

	const newnewpass: HTMLInputElement = document.createElement('input');
	newnewpass.type = 'password';
	newnewpass.placeholder = 'New Password';
	newnewpass.id = 'New New Password';
	newnewpass.className = 'p-2 bg-bg0 mt-2 text-center';

	//peut etre un link ici car qunad c'est le reste est valider doit revenir sur la page principale mais 
	//je pense que pour l'instant je vais le diriger vers la page de profile
	const submit: HTMLInputElement = document.createElement('input');
	submit.type = 'submit';
	submit.value = "S'inscrire";
	submit.id = 'Valider';
	submit.className = 'font-caveat py-1 bg-txt1 text-bg0 text-xl mt-3 text-center rounded-sm';

	form.appendChild(user);
	form.appendChild(newpass);
	form.appendChild(newnewpass);
	form.appendChild(submit);
	div.appendChild(form);

	const or: HTMLParagraphElement = document.createElement('p');
	or.className = 'text-bg0 text-center mt-1 mb-1';
	or.textContent = 'or';
	div.appendChild(or);

	//ici le transformer en link pour qu'il aille vers le bon endroint
	const google: HTMLAnchorElement = document.createElement('a');
	google.className = 'text-bg1 bg-bg0 ml-[31%] py-1 px-5';
	google.textContent = 'GOOGLE';

	div.appendChild(google);


	root.appendChild(div);

	return root;
});

/*







 */