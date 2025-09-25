export async function sendRequest(url: string, nameVar1: string, nameVar2: string, var1: string, var2: string) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [nameVar1]: var1, [nameVar2]: var2 })
        });

        const data = await response.json().catch(() => null);
        if (!response.ok) {
            const message = data?.error || `Erreur HTTP : ${response.status}`;
            throw new Error(message);
        }

        console.log(selectMessage(url, true, null), data);
        alert(selectMessage(url, true, null));
        return data;

    } catch (error) {
        console.error(selectMessage(url, false, error));
        alert(selectMessage(url, false, error.message)); // affiche le vrai message d’erreur
        throw error; // une histoire de caller ???
    }
}


function selectMessage(url: string, type: boolean, error: string) {
    if (url === 'https://transcendence.42.fr:42069/api/friends/add' && type === true)
        return "Ajout d'ami réussie!";
    if (url === 'https://transcendence.42.fr:42069/api/friends/add' && type === false)
        return "Erreur lors de l’ajout d'ami :" + error;
    if (url === 'https://transcendence.42.fr:42069/api/auth/login' && type === true)
        return 'Connnexion réussie!';
    if (url === 'https://transcendence.42.fr:42069/api/auth/login' && type === false)
        return 'Erreur lors de la connexion :' + error;
    if (url === 'https://transcendence.42.fr:42069/api/auth/register' && type === true)
        return 'Inscription réussie!';
    if (url === 'https://transcendence.42.fr:42069/api/auth/register' && type === false)
        return 'Erreur lors de l’inscription :' + error;
}
// https://transcendence.42.fr:42069/api/upload