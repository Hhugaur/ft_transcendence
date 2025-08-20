import { HTMLComponent } from '../component';

export class Text extends HTMLComponent {
        public constructor() {
                super();
        }

        public override make(): HTMLElement {
                this.setTextContent(h);
                this.setClassName(h);
                this.appendChilds(h);
                return h;
        }
}