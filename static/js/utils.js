async function sendLog(message, id="", classe="") {
    let messageTag = document.createElement("p");
    messageTag.innerHTML = message;
    messageTag.id = id;
    messageTag.className = classe;
    document.querySelector(".text-sidebar__area").appendChild(messageTag);
    document.querySelector(".text-sidebar__area").scrollTop = document.querySelector(".text-sidebar__area").scrollHeight

    return messageTag;
}

async function sendButton(message, func=null, id="", classe="") {
    let buttonTag = document.createElement("button");
    buttonTag.innerHTML = message;
    buttonTag.id = id;
    buttonTag.className = classe;
    if (func) {
        buttonTag.onclick = func;
    }
    document.querySelector(".text-sidebar__area").appendChild(buttonTag);
    document.querySelector(".text-sidebar__area").scrollTop = document.querySelector(".text-sidebar__area").scrollHeight

    return buttonTag;
}

let isOpen = false;
document.getElementById("toggleSidebar").onclick = () => {
  const sidebar = document.getElementById("chatdiv");

  if (isOpen) {
    sidebar.classList.remove("sidebaropen");
  } else {
    sidebar.classList.add("sidebaropen");
  }
  isOpen = !isOpen;
  }
 
  document.getElementById("close-sidebar").onclick = () => {
    const sidebar = document.getElementById("chatdiv");


  if (isOpen) {
    sidebar.classList.remove("sidebaropen");
  } else {
    sidebar.classList.add("sidebaropen");
  }


  isOpen = !isOpen;
  }

async function levelUp() {
  await reativeButton("next_floor");
  await updateStatus();
  
}

async function desativeButton(button_id) {
  document.getElementById(button_id).style.opacity = "0.5";
  document.getElementById(button_id).style.cursor = "default";
  document.getElementById(button_id).disabled = true;
  document.getElementById(button_id).style.borderColor = "grey";
  document.getElementById(button_id).style.color = "grey";
}

async function reativeButton(button_id) {
  document.getElementById(button_id).style.opacity = "1";
  document.getElementById(button_id).style.cursor = "pointer";
  document.getElementById(button_id).disabled = false;
  document.getElementById(button_id).style.borderColor = "white";
  document.getElementById(button_id).style.color = "white";
}

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

async function inDemo() {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal").style.pointerEvents = "all";
  document.getElementById("modal__").style.display = "flex";
  document.getElementById("modal__").style.pointerEvents = "all";}

document.getElementById("continue_button").onclick = async () => {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal").style.pointerEvents = "none";
  document.getElementById("modal__").style.display = "none";
  document.getElementById("modal__").style.pointerEvents = "none";
}
