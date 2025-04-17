document.body.onload = async () => {
    player = localStorage.getItem('data')
    if (player) {
        console.log(player)
        const login_button = document.getElementById("login_button")
        login_button.disabled = true
        
    } else {
        player = await fetch("static/data/player.json").then(response => response.json())
    }

    const monstro = await fetch("static/data/monsters.json").then(response => response.json())
    
    slime = { // Teste
        hp: monstro.slime.hp
    }
    
    document.getElementById("fight_option").onclick = function() {
        slime.hp -= player.atk
        console.log(slime.hp)
}
}
