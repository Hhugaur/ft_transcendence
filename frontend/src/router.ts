import { PageComponent } from './component';
import { Page } from './page'

export class Router {
        private routes: Page[];
        private readonly appRoot: HTMLElement = document.getElementById('app') as HTMLElement;
        private static INSTANCE: Router | null = null;

        private constructor() {
                this.routes = [];
        }

        public static getInstance(): Router {
                if(!Router.INSTANCE) Router.INSTANCE = new Router();
                return Router.INSTANCE;
        }
        public register(path: string, page: PageComponent): void {
                this.routes.push(new Page(path, page.getElemFactory()));
        }

        public warp(path: string, push: boolean = true): void {
                const route = this.routes.find(r => r.getPath() === path);
                if(!route) {
						//modif 01/08
                        console.warn(`unable to find path ${path} returning to home`);
						if (path !== '/') this.warp('/');
						return;
                }
                if(push) window.history.pushState(null, '', path);
                const page: HTMLElement = route.make();
                this.appRoot.replaceChildren(page);
                this.listeners(page);
        }

        public launch(): void {
                document.addEventListener('DOMContentLoaded', () => this.launch_impl());
        }

        private launch_impl(): void {
                window.addEventListener('popstate', () => this.warp(window.location.pathname, false))
                this.warp(window.location.pathname);
        }

        private listeners(elem: HTMLElement): void {
                elem.querySelectorAll('a[data-route]').forEach(link => {
                        link.removeEventListener('click', clickLink as EventListener);
                        link.addEventListener('click', clickLink as EventListener);
                });
        }
}

function clickLink(e: MouseEvent): void {
        const a = e.currentTarget as HTMLAnchorElement;
        const path = a.getAttribute('data-route');
        if(path) {
                e.preventDefault();
                Router.getInstance().warp(path);
        }
}
