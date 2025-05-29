async function sendLog(message, id="", classe="") {
    let messageTag = document.createElement("p");
    messageTag.innerHTML = message;
    messageTag.id = id;
    messageTag.className = classe;
    document.querySelector(".text-sidebar__area").appendChild(messageTag);

    return messageTag;
}

let isOpen = false;
document.getElementById("toggleSidebar").onclick = () => {
  const sidebar = document.getElementById("chat__div");

  if (isOpen) {
    sidebar.classList.remove("sidebar__open");
  } else {
    sidebar.classList.add("sidebar__open");
  }
  isOpen = !isOpen;
  }
  
  document.getElementById("close-sidebar").onclick = () => {
    const sidebar = document.getElementById("chat__div");

  if (isOpen) {
    sidebar.classList.remove("sidebar__open");
  } else {
    sidebar.classList.add("sidebar__open");
  }

  isOpen = !isOpen;
  }


async function sendButton(message, func=null, id="", classe="") {
    let buttonTag = document.createElement("button");
    buttonTag.innerHTML = message;
    buttonTag.id = id;
    buttonTag.className = classe;
    if (func) {
        buttonTag.onclick = func;
    }
    document.getElementById("chat__div").appendChild(buttonTag);

    return buttonTag;
}
