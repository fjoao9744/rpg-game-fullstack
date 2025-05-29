window.onload = async () => {
    let skill = await fetch(`${BASE_URL}/game/attack/joao/1`, {
      method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"skill" : {"attack1":{"gif":"static/media/sprites/atacks/attack_basic.gif","name":"ataque basico","type":"none","value":0,"damage":[2,5],"effect":null,"description":"um simples ataque"}}})
    })
    console.log(skill)

    let player = await Player()
    await sendLog("Bem vindo jogador!")

    if (!Object.keys(player.monster).length === 0) {
        await battle(player, player.monster);

    } else {
      await sendButton("ANDAR", async () => {
        let monster = await monsterGen();
        if (!monster) {
          sendLog("Você não achou nada!");
          return;
        }

        player.andar = Math.round((player.andar + 0.1) * 10) / 10; // corrige imprecisão
        await SavePlayer(player);
        await updateStatus();
        
        battle(player, monster);
      })
    }
    
};

// DJANGO MESSAGES
document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.django-message__div');

    messages.forEach(div => {
      // adiciona animação de entrada
      div.classList.add('django-message__div-animation');

      // remove com animação após 3 segundos
      setTimeout(() => {
        div.classList.add('hidden');
      }, 3000);
    });
  });
