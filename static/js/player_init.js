(async () => {
    if (username) {
      sendLog(`usuario conectado: ${username}`);
      floor = await getFloor();

      document.querySelector(".monster__area").style.backgroundImage = `url(${floor.background})`;

      let player = await getPlayer();

      if (player.floor == 1) {
        await desativeButton("past_floor");

      }

      await createStatus();
}})();

async function skillsChoice() {
  let player = await getPlayer();
  if (player.levelup) {
    let skill1 = await fetch(`${BASE_URL}/game/player/attack/gen/${username}`).then(response => response.json())
    let skill2 = await fetch(`${BASE_URL}/game/player/attack/gen/${username}`).then(response => response.json())
    let skill3 = await fetch(`${BASE_URL}/game/player/attack/gen/${username}`).then(response => response.json())
    console.log(skill1, skill2, skill3)
    await sendLog("escolha uma skill nova:")

    inputTag = document.createElement("input");
    inputTag.id = "inputId";
    inputTag.placeholder = "Digite o numero do ataque que vai mudar."
    document.querySelector(".text-sidebar__area").appendChild(inputTag);

    sendButton(`${skill1.name}: ${skill1.description}`, async () => {
      let attack_num = document.querySelector("#inputId").value;
      if (attack_num && attack_num > 0 && attack_num < 5) {
        await fetch(`${BASE_URL}/game/player/attack/${username}/${attack_num}/`, 
          { method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"skill":skill1})
          })
        document.querySelectorAll(".button_skill").forEach(el => el.remove());
        document.querySelector("#inputId").remove()
        await fetch(`${BASE_URL}/game/player/levelup/${username}/`)
      } else {
        sendLog("digite um numero valido")
      }

    }, "", "button_skill")

    sendButton(`${skill2.name}: ${skill2.description}`, async () => {
      let attack_num = document.querySelector("#inputId").value;
      if (attack_num && attack_num > 0 && attack_num < 5) {
      await fetch(`${BASE_URL}/game/player/attack/${username}/${attack_num}/`, 
        { method: "PUT", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"skill":skill2})
        })
      document.querySelectorAll(".button_skill").forEach(el => el.remove());
      document.querySelector("#inputId").remove()
      await fetch(`${BASE_URL}/game/player/levelup/${username}/`)

      } else {
        sendLog("digite um numero valido")
      }

    }, "", "button_skill")

    sendButton(`${skill3.name}: ${skill3.description}`, async () => {
      let attack_num = document.querySelector("#inputId").value;
      if (attack_num && attack_num > 0 && attack_num < 5) {
      await fetch(`${BASE_URL}/game/player/attack/${username}/${attack_num}/`, 
        { method: "PUT", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"skill":skill3})
        })
      document.querySelectorAll(".button_skill").forEach(el => el.remove());
      document.querySelector("#inputId").remove()
      await fetch(`${BASE_URL}/game/player/levelup/${username}/`)
      } else {
        sendLog("digite um numero valido")
      }

    }, "", "button_skill")

  }
}


