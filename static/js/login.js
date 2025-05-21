const hostname = window.location.hostname;

let BASE_URL;

if (["localhost", "127.0.0.1", "::1"].includes(hostname)) {
  BASE_URL = "http://localhost:8000";
} else if (hostname.includes("infinity-dungeon.com.br")) {
  BASE_URL = "infinity-dungeon.com.br";
} else if (hostname.includes("railway.app")) {
  BASE_URL = "https://rpg-game-fullstack-production.up.railway.app";
} else {
  BASE_URL = "https://rpg-game-fullstack-production.up.railway.app"; // valor padrão
}

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
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ name: username })
    });
    
    const data = await response.json();
    return data;
}

async function updatePlayer() { // atualiza o player no banco e no localstorage
    localStorage.setItem("player", JSON.stringify(player))
    let response = await fetch(`${BASE_URL}/api/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(player)
    });

    const data = await response.json();
    return data;
}
