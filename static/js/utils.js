async function sendLog(message, id="", classe="") {
    let messageTag = document.createElement("p");
    messageTag.innerHTML = message;
    messageTag.id = id;
    messageTag.className = classe;
    document.getElementById("chat__div").appendChild(messageTag);

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
    document.getElementById("chat__div").appendChild(buttonTag);

    return buttonTag;
}


