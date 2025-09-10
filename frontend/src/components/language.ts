import { en } from '../../locales/en.ts';
import { fr } from '../../locales/fr.ts';
import { es } from '../../locales/es.ts';
import { HTMLComponent } from '../component.ts';

interface Language {
  code: string;
  label: string;
}

const languages: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
];

export function createLanguageMenu(): HTMLElement {
	const wrapper = document.createElement('div');
	wrapper.className = 'relative inline-block text-left';

	const button = document.createElement('button');
	button.id = 'dropdownButton';
	button.className = 'text-bg0 ml-30 inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-bg2 text-sm font-medium hover:bg-txt1 hover';
	button.innerHTML = `
		Language
		<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	`;

	const menu = document.createElement('div');
	menu.className = 'hidden text-bg0 origin-top-right absolute right-0 mt-2 w-[50%] rounded-md bg-bg0 ring-1 ring-black ring-opacity-5 z-10';

	const menuList = document.createElement('div');
	menuList.className = 'py-1';

	languages.forEach(({ code, label }) => {
		const option = document.createElement('a');
		option.href = '#';
		option.textContent = label;
		option.className = 'block text-center py-2 text-sm bg-txt0 text-bg0 hover:bg-txt1';
		option.addEventListener('click', async (e) => {
		e.preventDefault();
		try {
            setLanguage(code);
			localStorage.setItem('lang', code);
			menu.classList.add('hidden');
		} catch (err) {
			console.error(err);
		}
		});
		menuList.appendChild(option);
	});

	menu.appendChild(menuList);
	wrapper.appendChild(button);
	wrapper.appendChild(menu);

	button.addEventListener('click', (e) => {
		e.stopPropagation();
		menu.classList.toggle('hidden');
	});

	window.addEventListener('click', (e) => {
		if (!wrapper.contains(e.target as Node)) {
		menu.classList.add('hidden');
		}
	});

	return wrapper;
}

type Dictionary = {
	[key: string]: string;
};

const translations: { [key: string]: Dictionary } = {
	en: en,
	fr: fr,
	es: es
};

let userLanguage: supportedLanguage = getPreferredLanguage();

export type supportedLanguage = keyof typeof translations;

export let locale: {[key: string]: string } = {};

export function setLanguage(lang: supportedLanguage): void {
	if (translations[lang]) {
		userLanguage = lang;
		localStorage.setItem('lang', lang as string);
		Object.assign(locale, translations[lang]);
		console.log(`Language set to: ${lang}`);
	} else {
		console.warn(`Language '${lang}' not supported.`);
	}
}

export function getuserLanguage(): supportedLanguage {
	return userLanguage;
}

export function getLaguangeName(lang: supportedLanguage): string {
	return translations[lang]['language'];
}

function getPreferredLanguage(): supportedLanguage {
  const storedLang = localStorage.getItem('lang');
  if (storedLang) {
    return storedLang;
  }
  return getNavigatorLanguage();
}

function getNavigatorLanguage(): supportedLanguage {
	const userLanguage: string = navigator.language;
	const userLanguageCode: string = userLanguage.substring(0,2);
	let lang: supportedLanguage = 'en';
	if (userLanguageCode in translations) {
		lang = userLanguageCode as supportedLanguage;
	}
	return lang;
}