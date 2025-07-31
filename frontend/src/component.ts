export class Component {
        private factory: () => HTMLElement;

        public constructor(factory: () => HTMLElement) {
                this.factory = factory;
        }

        public make(): HTMLElement {
                return this.factory();
        }

        public getElemFactory(): () => HTMLElement {
                return this.factory;
        }
}

export class HTMLComponent extends Component {
        public className: string = '';
        public textContent: string = '';
        private childs: HTMLElement[] = [];

        public constructor() {
                super(() => {
                        const div: HTMLElement = document.createElement('div');
                        console.error('unable to use this component\'s factory');
                        return div;
                });
        }

        public appendChild(child: HTMLElement): void {
                this.childs.push(child);
        }


        private appendChilds(elem: HTMLElement): void {
                this.childs.forEach(item => elem.appendChild(item));
        }

        private setTextContent(elem: HTMLElement): void {
                elem.textContent = this.textContent;
        }

        private setClassName(elem: HTMLElement): void {
                elem.className = this.className;
        }
}

export class PageComponent extends Component {
        public constructor(factory: () => HTMLElement) {
                super(factory);
        }
}
