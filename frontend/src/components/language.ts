import { en } from '../../locales/en.ts';
import { fr } from '../../locales/fr.ts';
import { es } from '../../locales/es.ts';
import { HTMLComponent } from '../component.ts';


interface Language {
  code: SupportedLanguage;
  label: string;
}

type Dictionary = { [key: string]: string };
export type SupportedLanguage = 'en' | 'fr' | 'es';

// Language definitions
const languages: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
];

// Translation dictionary map
const translations: Record<SupportedLanguage, Dictionary> = {
  en,
  fr,
  es,
};

// Current language & public dictionary
let userLanguage: SupportedLanguage = getPreferredLanguage();
export let local: Dictionary = { ...translations[userLanguage] };

// Set language and update UI
export function setLanguage(lang: SupportedLanguage): void {
  if (translations[lang]) {
    userLanguage = lang;
    localStorage.setItem('lang', lang);
    Object.assign(local, translations[lang]);
    console.log(`Language set to: ${lang}`);
    updateUIWithNewLanguage();
  } else {
    console.warn(`Language '${lang}' not supported.`);
  }
}

// Get current language
export function getUserLanguage(): SupportedLanguage {
  return userLanguage;
}

// Get native language name
export function getLanguageName(lang: SupportedLanguage): string {
  return translations[lang]['language'] || lang;
}

// Load preferred language from localStorage or browser
function getPreferredLanguage(): SupportedLanguage {
  const stored = localStorage.getItem('lang');
  if (stored && stored in translations) {
    return stored as SupportedLanguage;
  }
  return getNavigatorLanguage();
}

function getNavigatorLanguage(): SupportedLanguage {
  const langCode = navigator.language.substring(0, 2);
  return (langCode in translations ? langCode : 'en') as SupportedLanguage;
}

// Build the language dropdown menu
export function createLanguageMenu(): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'relative inline-block text-left';

  const button = document.createElement('button');
  button.id = 'dropdownButton';
  button.className = 'text-bg0 ml-30 inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-bg2 text-sm font-medium hover:bg-txt1 hover';
  button.innerHTML = `
    ${local['language'] || 'Language'}
    <svg class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    option.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(code);
      button.innerHTML = `
        ${local['language'] || 'Language'}
        <svg class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      `;
      menu.classList.add('hidden');
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

// 🔁 Replaces text content of elements with data-i18n="key"
function updateUIWithNewLanguage(): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    if (local[key]) {
      el.textContent = local[key];
    }
  });
}