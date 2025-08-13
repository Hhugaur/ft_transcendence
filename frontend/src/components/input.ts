export function createInput(type: string, placeholder: string, id: string, className: string): HTMLInputElement {
	const input = document.createElement('input');
	input.type = type;
	if(placeholder)
		input.placeholder = placeholder;
	input.id = id;
	input.className = className;
	return input;
}

export function createLabeledInput(type: string, id: string, labelText: string, inputClass: string): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-start w-64';

  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = labelText;
  label.className = 'text-bg0 mb-1 ml-1'; // Styling for label

  const input = createInput(type, id, labelText, inputClass);
  container.appendChild(label);
  container.appendChild(input);

  return container;
}