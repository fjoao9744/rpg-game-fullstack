document.body.onload = async () => {
    let player = localStorage.getItem("player");

    let logged = Boolean(localStorage.getItem("logged"))
    console.log(logged)
    
    if (logged) {
        logar(false)
    } else {
        player = await fetch("static/data/player.json") // player vazio
        .then(response => response.json())

    }
    
    const monsters_gen = monsters() // gerador de monstros

    let monster = await monsters_gen.next() // toda vez que chamar o .next() ele vai dar o proximo monstro
}

async function* monsters() { // gerador que retorna monstro por monstro
    const monsters = await fetch("static/data/monsters.json").then(response => response.json())
    for (let monster of Object.values(monsters)) {
        yield monster
        
    }

}



