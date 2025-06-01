let status_player_div = document.getElementById("status__div");
let showAll = false;

async function createStatus() {
    let player = await getPlayer()

    let floorTag = document.createElement("p");
    floorTag.innerHTML = `<p>andar: ${player.floor}</p>`;
    status_player_div.appendChild(floorTag);

    let scoreTag = document.createElement("p");
    scoreTag.innerHTML = `<p>score: ${player.score}</p>`;
    scoreTag.style.color = "grey"
    status_player_div.appendChild(scoreTag);

    let hpTag = document.createElement("p");
    hpTag.innerHTML = `<p>hp: ${player.hp}</p>`;
    status_player_div.appendChild(hpTag);
    
    let levelTag = document.createElement("p");
    levelTag.innerHTML = `<p>level: ${player.level}</p>`;
    status_player_div.appendChild(levelTag);
    
    let expTag = document.createElement("p");
    expTag.innerHTML = `<p>exp: ${player.exp}</p>`;
    expTag.style.color = "grey"
    status_player_div.appendChild(expTag);
    
    let killTag = document.createElement("p");
    killTag.innerHTML = `<p>kills: ${player.kill}</p>`;
    killTag.style.color = "grey"
    status_player_div.appendChild(killTag);
    
    let goldTag = document.createElement("p");
    goldTag.innerHTML = `<p>gold: ${player.gold}</p>`;
    status_player_div.appendChild(goldTag);
    
    let attackTag = document.createElement("p");
    attackTag.innerHTML = `<p>ataque: ${player.atk}</p>`;
    status_player_div.appendChild(attackTag);
    
    let defenseTag = document.createElement("p");
    defenseTag.innerHTML = `<p>defesa: ${player.defe}</p>`;
    status_player_div.appendChild(defenseTag);
    
    let speedTag = document.createElement("p");
    speedTag.innerHTML = `<p>velocidade: ${player.speed}</p>`;
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

    await createStatus();
}

