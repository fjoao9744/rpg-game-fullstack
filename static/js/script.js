document.body.onload = async () => {
    const monsters_gen = monsters() // gerador de monstros

    let monster = await monsters_gen.next() // toda vez que chamar o .next() ele vai dar o proximo monstro
}

async function* monsters() { // gerador que retorna monstro por monstro
    const monsters = await fetch("static/data/monsters.json").then(response => response.json())
    for (let monster of Object.values(monsters)) {
        yield monster
        
    }

}
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

