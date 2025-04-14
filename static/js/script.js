document.body.onload = async () => {
    player = await fetch("static/data/player.json").then(response => response.json())
    const monstro = await fetch("static/data/monsters.json").then(response => response.json())
    
    slime = { // Teste
        hp: monstro.slime.hp
    }
    
    document.getElementById("fight_option").onclick = function() {
        slime.hp -= player.atk
        console.log(slime.hp)

        if (slime.hp) <= 0
    
    }
}
