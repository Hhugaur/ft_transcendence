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

export function createEditableField(
	labelText: string,
	value: string,
	onChange?: (newValue: string) => void
) {
	const container = document.createElement('div');

	const label = document.createElement('label');
	label.className = 'text-bg0 ml-1';
	label.textContent = labelText;

	const display = document.createElement('p');
	display.className = 'text-center p-2 bg-txt0 text-bg0 text-xl rounded-sm cursor-pointer ml-1 mr-[40%]';
	display.textContent = value;

	const input = document.createElement('input');

	if(labelText == 'Password :') {
		input.className = 'hidden p-2 bg-bg0 text-center rounded-sm flex';
		input.type = 'password';
	}
	else{
		input.className = 'hidden p-2 bg-bg0 text-center rounded-sm ml-2 mt-1 flex';
		input.type = 'text';
	}
		input.value = value;

	let currentValue = value;
	let isSaving = false;
	
	display.addEventListener('click', () => {
		display.classList.add('hidden');
		input.classList.remove('hidden');
		if (inputGroup) inputGroup.classList.remove('hidden');
		input.value = currentValue;
		input.focus();
		input.select();
	});

	// ✅ Save on Enter
	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			const newValue = input.value.trim();

			if (newValue !== currentValue) {
				currentValue = newValue;

				if (labelText === 'Password :') {
					display.textContent = '••••••'; // Masked value
				} else {
					display.textContent = newValue;
				}

				onChange?.(newValue);
			}

			isSaving = true;
			input.classList.add('hidden');
			display.classList.remove('hidden');
			if (inputGroup) inputGroup.classList.add('hidden');

		}

		// ❌ Cancel edit on Escape
		if (e.key === 'Escape') {
			input.value = currentValue;
			isSaving = false;
			input.classList.add('hidden');
			display.classList.remove('hidden');
			if (inputGroup) inputGroup.classList.add('hidden');

		}
	});

	// ❌ Cancel on blur if not saved
	input.addEventListener('blur', () => {
		if (!isSaving) {
			input.value = currentValue; // revert
			input.classList.add('hidden');
			display.classList.remove('hidden');
			if (inputGroup) inputGroup.classList.add('hidden');

		}
		isSaving = false; // reset flag
	});

	container.appendChild(label);
	container.appendChild(display);

	let inputGroup: HTMLElement | null = null;


	if (labelText === 'Password :') {
		const toggleBtn: HTMLButtonElement = document.createElement('button');
		toggleBtn.type = 'button';
		toggleBtn.textContent = 'Afficher';
		toggleBtn.className = 'text-sm text-txt1 underline whitespace-nowrap';

		toggleBtn.addEventListener('mousedown', (e) => {
			e.preventDefault(); // Prevent input from blurring
		});

		toggleBtn.addEventListener('click', () => {
			input.type = input.type === 'password' ? 'text' : 'password';
			toggleBtn.textContent = input.type === 'password' ? 'Afficher' : 'Masquer';
		});

		// ✅ Wrap input + button in a group container
		inputGroup = document.createElement('div');
		inputGroup.className = 'hidden flex items-center gap-2 mt-1 ml-2';

		inputGroup.appendChild(input);
		inputGroup.appendChild(toggleBtn);
		container.appendChild(inputGroup);
	}
	else
		container.appendChild(input);

	// return container;
	return {
		element: container,
		getValue: () => input.value,
		setValue: (val: string) => {
			currentValue = val;
			input.value = val;
			if (labelText === 'Password :') {
				display.textContent = '••••••';
			} else {
				display.textContent = val;
			}
		}
	};
}
