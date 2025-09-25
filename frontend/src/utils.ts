export async function sendRequest(url: string, nameVar1: string, nameVar2: string, var1: string, var2: string) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [nameVar1]: var1, [nameVar2]: var2 })
    }).then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            alert('Done!');
            return response.json();
        }).then(data => {
            console.log(selectMessage(url, true), data);
        }).catch(error => {
            console.error(selectMessage(url, false), error);
            alert('Nop!');
        });
}

function selectMessage(url: string, type: boolean) {
    if (url === 'https://transcendence.42.fr:42069/api/friends/add' && type === true)
        return "Ajout d'ami réussie :";
    if (url === 'https://transcendence.42.fr:42069/api/friends/add' && type === false)
        return "Erreur lors de l’ajout d'ami :";
    if (url === 'https://transcendence.42.fr:42069/api/auth/login' && type === true)
        return 'Connnexion réussie :';
    if (url === 'https://transcendence.42.fr:42069/api/auth/login' && type === false)
        return 'Erreur lors de la connexion :';
    if (url === 'https://transcendence.42.fr:42069/api/auth/register' && type === true)
        return 'Inscription réussie :';
    if (url === 'https://transcendence.42.fr:42069/api/auth/register' && type === false)
        return 'Erreur lors de l’inscription :';
}
// https://transcendence.42.fr:42069/api/upload