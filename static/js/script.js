window.onload = async () => {
    await sendLog("Bem vindo jogador!")
    player = await getPlayer()
    
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
        div.classList.remove('django-message__div-animation')
      }, 3000);
    });
  });