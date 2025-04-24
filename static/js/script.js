document.body.onload = async () => {
    let player = localStorage.getItem("data")
    if (player) { // verifica se tem algum player logado
        document.getElementById("login_button").disabled = true

    } else {
        player = await fetch("static/data/player.json") // player vazio
        .then(response => response.json())
    }
    const monster = monsters()

    console.log(await monster.next())

}

async function* monsters() { // gerador que retorna monstro por monstro
    const monsters = await fetch("static/data/monsters.json").then(response => response.json())
    for (let i = 0; i < monsters.length; i++) {
        yield monsters[i]
        
    }
}
