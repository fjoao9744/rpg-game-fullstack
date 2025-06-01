async function sendLog(message, id="", classe="") {
    let messageTag = document.createElement("p");
    messageTag.innerHTML = message;
    messageTag.id = id;
    messageTag.className = classe;
    document.querySelector(".text-sidebar__area").appendChild(messageTag);

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
  document.getElementById(button_id).disable = true;
  document.getElementById(button_id).style.borderColor = "grey";
  document.getElementById(button_id).style.color = "grey";
}

async function reativeButton(button_id) {
  document.getElementById(button_id).style.opacity = "1";
  document.getElementById(button_id).style.cursor = "pointer";
  document.getElementById(button_id).disable = false;
  document.getElementById(button_id).style.borderColor = "white";
  document.getElementById(button_id).style.color = "white";
}