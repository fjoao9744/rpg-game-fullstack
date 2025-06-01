window.onload = async () => {
  await sendLog("Bem vindo jogador!");
  await sendButton("ANDAR", async () => walk());
  let player = await getPlayer();

  console.log(player.max_floor, player.floor)

  if (player.max_floor === player.floor) {
    await desativeButton("next_floor");
  }
  
};

document.getElementById("next_floor").onclick = nextFloor;
document.getElementById("past_floor").onclick = pastFloor;

window.addEventListener('load', () => {
  document.getElementById("loading").style.display = "none";
})

// DJANGO MESSAGES
document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.django-message__div');

    messages.forEach(div => {
      // adiciona animação de entrada
      div.classList.add('django-message__div-animation');

      // remove com animação após 3 segundos
      setTimeout(() => {
        div.classList.add('hidden');
        div.classList.remove('django-message__div-animation')
      }, 3000);
    });
  });