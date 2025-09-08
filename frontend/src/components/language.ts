export type Translations = Record<string, string>;

export async function loadLanguage(lang: string): Promise<Translations> {
  const response = await fetch(`/locales/${lang}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load language file for "${lang}"`);
  }
  return await response.json();
}

export function applyTranslations(translations: Translations): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-i18n]');
  elements.forEach(el => {
    const key = el.dataset.i18n;
    if (key && translations[key]) {
      el.textContent = translations[key];
    }
  });

  // Optional: Update dropdown button label
  const dropdownButton = document.getElementById("dropdownButton");
  if (dropdownButton && translations.menu) {
    dropdownButton.childNodes[0].textContent = translations.menu;
  }
}


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
	button.className =
		'text-bg0 ml-30 inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-bg2 text-sm font-medium hover:bg-txt1 hover';
	button.innerHTML = `
		Language
		<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	`;

	const menu = document.createElement('div');
	menu.className =
		'hidden text-bg0 origin-top-right absolute right-0 mt-2 w-[50%] rounded-md bg-bg0 ring-1 ring-black ring-opacity-5 z-10';

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
			const translations = await loadLanguage(code);
			applyTranslations(translations);
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