document.body.onload = async () => {
    let player = localStorage.getItem("data")
    if (player) { // verifica se tem algum player logado
        document.getElementById("login_button").disabled = true

    } else {
        player = await fetch("static/data/player.json") // player vazio
        .then(response => response.json())
    }

    const monsters_gen = monsters() // gerador de monstros

    let monster = await monsters_gen.next() // toda vez que chamar o .next() ele vai dar o proximo monstro

    console.log(monster.value)

    monster = await monsters_gen.next()
    console.log(monster.value)

    monster = await monsters_gen.next()
    console.log(monster.value)

}

async function* monsters() { // gerador que retorna monstro por monstro
    const monsters = await fetch("static/data/monsters.json").then(response => response.json())
    for (let monster of Object.values(monsters)) {
        yield monster
        
    }

}
