import { HTMLComponent } from '../component';

export class Title extends HTMLComponent {
        public constructor(text: string) {
                super();
        }

        public override make(): HTMLElement {
                const h = document.createElement('h1');
                this.setTextContent(h);
                this.setClassName(h);
                this.appendChilds(h);
                return h;
        }
}
