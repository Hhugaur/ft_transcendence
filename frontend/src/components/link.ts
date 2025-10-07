import { HTMLComponent } from '../component';

export class Link extends HTMLComponent {
        private link: string;

        public constructor(link: string) {
                super();
                this.link = link;
        }

        public override make(): HTMLElement {
                const a = document.createElement('a');
                a.href = '#';
                a.setAttribute('data-route', this.link);
                this.setTextContent(a);
                this.setClassName(a);
                this.appendChilds(a);
                return a;
        }
}

export const fadeOutAndNavigateSPA = (route: string) => {
  document.body.classList.remove('fade-in');
  document.body.classList.add('fade-out');

  setTimeout(() => {
    history.pushState(null, '', route);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, 500);
};