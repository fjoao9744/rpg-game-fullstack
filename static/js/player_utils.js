let status_player_div = document.getElementById("status__div");
let showAll = false;

async function createStatus() {
    let player = await Player()

    let floorTag = document.createElement("p");
    floorTag.innerHTML = `andar: ${player.andar}`;
    status_player_div.appendChild(floorTag);

    let scoreTag = document.createElement("p");
    scoreTag.innerHTML = `score: ${player.score}`;
    scoreTag.style.color = "grey"
    status_player_div.appendChild(scoreTag);

    let hpTag = document.createElement("p");
    hpTag.innerHTML = `hp: ${player.hp}`;
    status_player_div.appendChild(hpTag);
    
    let levelTag = document.createElement("p");
    levelTag.innerHTML = `level: ${player.level}`;
    status_player_div.appendChild(levelTag);
    
    let expTag = document.createElement("p");
    expTag.innerHTML = `exp: ${player.exp}`;
    expTag.style.color = "grey"
    status_player_div.appendChild(expTag);
    
    let killTag = document.createElement("p");
    killTag.innerHTML = `kills: ${player.kill}`;
    killTag.style.color = "grey"
    status_player_div.appendChild(killTag);
    
    let goldTag = document.createElement("p");
    goldTag.innerHTML = `gold: ${player.gold}`;
    status_player_div.appendChild(goldTag);
    
    let attackTag = document.createElement("p");
    attackTag.innerHTML = `ataque: ${player.atk}`;
    status_player_div.appendChild(attackTag);
    
    let defenseTag = document.createElement("p");
    defenseTag.innerHTML = `defesa: ${player.defe}`;
    status_player_div.appendChild(defenseTag);
    
    let speedTag = document.createElement("p");
    speedTag.innerHTML = `velocidade: ${player.speed}`;
    status_player_div.appendChild(speedTag);
    
    if (!showAll) {
        scoreTag.style.display = "none";
        killTag.style.display = "none";
        expTag.style.display = "none";
    }

    document.getElementById("show-status").onclick = () => {
        if (showAll) {
            scoreTag.style.display = "none";
            killTag.style.display = "none";
            expTag.style.display = "none";
            showAll = false
        } else {
            scoreTag.style.display = "block";
            killTag.style.display = "block";
            expTag.style.display = "block";
            showAll = true
        }
    }
}

async function updateStatus() {
    while (status_player_div.firstChild) {
        status_player_div.removeChild(status_player_div.firstChild);
    }

    createStatus();
}


async function Player() {
    return JSON.parse(localStorage.getItem("player"))
}

async function SavePlayer(player) {
    localStorage.setItem("player", JSON.stringify(player))
}

