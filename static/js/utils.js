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