import { getLanguageName, lang } from '../../languages/language';

import { createInput, createEditableField } from '../utils/input';

export function createFriendItem( friendName: string, status: 'online' | 'in-game' | 'offline', avatarUrl?: string ): 
HTMLElement & { setStatus: (status: 'online' | 'in-game' | 'offline') => void } {
    const container = document.createElement('div');
    container.className = 'flex items-center justify-between bg-txt1 p-2 mx-2 my-1 rounded shadow';

    // === Left: Avatar + Info ===
    const leftSide = document.createElement('div');
    leftSide.className = 'flex items-center space-x-3';

    // Avatar image
    const avatar = document.createElement('img');
    avatar.src = "test.jpeg"//avatarUrl || `/avatars/${friendName}.png`; // Default path fallback
    avatar.alt = `${friendName} avatar`;
    avatar.className = 'w-10 h-10 rounded-full object-cover border border-bg0';

    // Name + Status container
    const infoWrapper = document.createElement('div');
    infoWrapper.className = 'flex flex-col';

    // Friend name
    const name = document.createElement('p');
    name.className = 'text-bg0 font-bold';
    name.textContent = friendName;

    // Status indicator
    const statusContainer = document.createElement('div');
    statusContainer.className = 'flex items-center space-x-1';

    const statusDot = document.createElement('span');
    statusDot.className = 'w-3 h-3 rounded-full';

    const statusLabel = document.createElement('span');
    statusLabel.className = 'text-xs text-bg0';

    statusContainer.appendChild(statusDot);
    statusContainer.appendChild(statusLabel);
    infoWrapper.appendChild(name);
    infoWrapper.appendChild(statusContainer);

    leftSide.appendChild(avatar);
    leftSide.appendChild(infoWrapper);

    // === Right: Buttons ===
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex space-x-2';

    const profileBtn = document.createElement('button');
    profileBtn.className = 'bg-bg0 text-txt0 px-2 py-1 rounded hover:bg-bg2 transition';
    profileBtn.textContent = lang.pButton2;
    profileBtn.onclick = () => {
        console.log(`Voir profil de ${friendName}`);
    };

    const challengeBtn = document.createElement('button');
    challengeBtn.className = 'bg-bg0 text-txt0 px-2 py-1 rounded hover:bg-bg2 transition';
    challengeBtn.textContent = lang.pButton3;
    challengeBtn.onclick = () => {
        console.log(`Envoyer une demande de match à ${friendName}`);
    };

    const removeBtn = document.createElement('button');
    removeBtn.className = 'bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition';
    removeBtn.textContent = lang.pButton4;
    removeBtn.onclick = () => {
        if (confirm(`Supprimer ${friendName} ?`)) {
            console.log(`Supprimé ${friendName}`);
            container.remove();
        }
    };

    buttonContainer.appendChild(profileBtn);
    buttonContainer.appendChild(challengeBtn);
    buttonContainer.appendChild(removeBtn);

    container.appendChild(leftSide);
    container.appendChild(buttonContainer);

    // === Status updater method ===
    function applyStatus(status: 'online' | 'in-game' | 'offline') {
        statusDot.className = 'w-3 h-3 rounded-full'; // reset
        statusLabel.textContent =
            status === 'in-game' ? 'En jeu' : status === 'online' ? 'En ligne' : 'Hors ligne';

        switch (status) {
            case 'online':
                statusDot.classList.add('bg-green-500');
                break;
            case 'in-game':
                statusDot.classList.add('bg-yellow-500');
                break;
            default:
                statusDot.classList.add('bg-gray-400');
                break;
        }
    }
    applyStatus(status);

    (container as any).setStatus = applyStatus;

    // return container as HTMLElement & {
    // 	setStatus: (status: 'online' | 'in-game' | 'offline') => void;
    // };
    return Object.assign(container, {
        setStatus: applyStatus,
    });
}

export function createProfDiv ()
{
    const uploadAvatarContainer = document.createElement('div');
    uploadAvatarContainer.className = 'flex items-center gap-2 px-2 mt-2';

    const uploadAvatarButton = document.createElement('button');
    uploadAvatarButton.textContent = lang.pUpImage; //Upload avatar
    uploadAvatarButton.className = 'bg-bg0 text-txt0 px-4 py-1 rounded hover:shadow-md hover:bg-txt1 transition';

    const avatarInput = createInput('file', '', 'avatarInput', 'bg-txt0 flex items-center gap-2 px-2 mt-2');

    uploadAvatarContainer.appendChild(uploadAvatarButton);
    uploadAvatarContainer.appendChild(avatarInput);

    let selectedFile: File | null = null;

    avatarInput.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLInputElement;
        selectedFile = target.files?.[0] || null;
    });

    uploadAvatarButton.addEventListener("click", async () => {
        if (!selectedFile) {
            alert("Aucun fichier sélectionné.");
            return;
        }

        if (!/^image\/(jpeg|png)$/.test(selectedFile.type)) {
            alert("Formats autorisés: JPG/PNG.");
            return;
        }
        if (selectedFile.size > 2097152) {
            alert("Taille max: 2 Mo.");
            return;
        }

        const form = new FormData();
        form.append("file", selectedFile);
        form.append("username", "test1234");

        try {
            const res = await fetch('https://transcendence.42.fr:42069/api/auth/upload', {
                method: "PATCH",
                body: form,
                credentials: "include",
            });

            if (!res.ok)
                throw new Error(`HTTP ${res.status}`);
            alert("Upload réussi ✅");
        } catch (err: any) {
            console.log("Échec de l’upload: ", err.message);
            alert("Échec de l’upload: " + err.message);
        }
    });

    const profDiv: HTMLElement = document.createElement('div');
    profDiv.className = 'col-span-1 grid gap-4 bg-bg1 border-bg0 border-8 mr-[10%] pb-[45%]';
    const profP: HTMLParagraphElement = document.createElement('p');
    profP.className = 'text-center text-bg0 mt-3 text-4xl';
    profP.textContent = lang.pTitle2; // "Profile"
    const userInput = createEditableField(lang.pLabel1 + ":", 'username');
    const passInput = createEditableField(lang.pLabel2 + ":", '••••••');

    const winratetxt: HTMLElement = document.createElement('p');
    winratetxt.className = 'text-bg0 ml-1';
    winratetxt.textContent = lang.pLabel3 + ":";
    const winrate: HTMLElement = document.createElement('p');
    const winrateValue = 55;
    winrate.textContent = `${winrateValue}%`;
    winrate.className = `ml-1 ${winrateValue < 50 ? 'text-txt1' : 'text-txt0'} bg-bg0 mr-[50%] text-center -mt-2`;

    profDiv.appendChild(profP);
    profDiv.appendChild(userInput.element);
    profDiv.appendChild(passInput.element);
    profDiv.appendChild(uploadAvatarContainer);
    profDiv.appendChild(winratetxt);
    profDiv.appendChild(winrate);
    return (profDiv);
}
