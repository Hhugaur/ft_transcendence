export class Page {
        private create: () => HTMLElement;
        private path: string;
        public constructor(path: string, makePage: () => HTMLElement) {
                this.path = path;
                this.create = makePage;
        }

        public make(): HTMLElement {
                return this.create();
        }

        public getPath(): string {
                return this.path;
        }
}
