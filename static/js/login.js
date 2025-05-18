const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);

const BASE_URL = isLocalhost
  ? "http://localhost:8000"
  : "https://rpg-game-onrender.com";


async function userExists() { // da um head para verificar se um user existe
    response = await fetch(`${BASE_URL}/api/?name=${encodeURIComponent(username)}`, {method: "HEAD"})

    return response.ok
}

async function getPlayer() { // retorna os dados do jogador(do banco)
    let response = await fetch(`${BASE_URL}/api/?name=${encodeURIComponent(username)}`, {method: "GET"})

    const data = await response.json();
    return data;
}

async function createPlayer() { // cria um usuario do 0
    let response = await fetch(`${BASE_URL}/api/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken},
        body: JSON.stringify({ name: username })
    });
    
    const data = await response.json();
    return data;
}

async function updatePlayer() { // atualiza o player no banco e no localstorage
    localStorage.setItem("player", JSON.stringify(player))
    // api
}
