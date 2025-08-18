
export type Match = {
	opponent: string;
	date: string;
	touch_blue: number;
	touch_red: number;
	score: string;
};

export function createMatchItem(match: Match): HTMLElement {
	const container: HTMLDivElement = document.createElement('div');
	container.className = 'border-t border-bg0';

	const header: HTMLButtonElement = document.createElement('button');
	header.className = 'w-full text-left text-bg0 p-2 hover:bg-bg2 focus:outline-none flex justify-between items-center';
	header.textContent = `VS ${match.opponent} - ${match.score}`;

	const toggleIcon: HTMLSpanElement = document.createElement('span');
	toggleIcon.textContent = '+';
	header.appendChild(toggleIcon);

	const details: HTMLDivElement = document.createElement('div');
	details.className = 'text-bg0 pl-4 pr-2 py-2 hidden bg-bg2';
	details.innerHTML = `
		<p><strong>Date:</strong> ${match.date}</p>
		<p><strong>Touch_blue:</strong> ${match.touch_blue}</p>
		<p><strong>Touch_red:</strong> ${match.touch_red}</p>
		<p><strong>Score:</strong> ${match.score}</p>
	`;

	header.addEventListener('click', () => {
		const isVisible = !details.classList.contains('hidden');
		details.classList.toggle('hidden');
		toggleIcon.textContent = isVisible ? '+' : '−';
	});

	container.appendChild(header);
	container.appendChild(details);
	return container;
}
