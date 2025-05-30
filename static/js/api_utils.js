const hostname = window.location.hostname;

let BASE_URL;

if (["localhost", "127.0.0.1", "::1"].includes(hostname)) {
  BASE_URL = "http://localhost:8000";
} else if (hostname.includes("infinity-dungeon.com.br")) {
  BASE_URL = "https://www.infinity-dungeon.com.br";
} else if (hostname.includes("railway.app")) {
  BASE_URL = "https://rpg-game-fullstack-production.up.railway.app";
} else {
  BASE_URL = "https://rpg-game-fullstack-production.up.railway.app"; // valor padrão
}

async function getPlayer() { // retorna os dados do jogador(do banco)
    const response = await fetch(`${BASE_URL}/game/player/${username}`, {method: "GET"})

    const data = await response.json();
    return data;
}