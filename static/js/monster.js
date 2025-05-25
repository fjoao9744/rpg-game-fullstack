let monster = null

async function monsterGen() {
    let andar = JSON.parse(localStorage.getItem("player")).andar
    monster = await fetch(`${BASE_URL}/battle/monster/${andar}`).then(response => response.json())
    document.getElementById("monster-hp__bar").value = monster.hp
    document.getElementById("monster-hp__bar").max = monster.hp

    document.getElementById("monster__image").src = monster.image;
    document.querySelectorAll(".monster__name")[0].innerHTML = monster.name.toUpperCase();

    console.log(monster);
    console.log(`${monster.name} apareceu`);
}

async function monsterAttack() {
    // pegar o ataque
    let attack = attackChoice(Object.values(monster.skills));
    console.log(attack.message);
    
    // calcular dano
    let attackDamage = intervalCalculate(attack.damage);

    let realDamage = Math.max(attackDamage - player.defe, 1);

    player.hp -= realDamage;

    console.log(`${username} perdeu ${realDamage} de hp`);

    while (status_player_div.firstChild) {
        status_player_div.removeChild(status_player_div.firstChild);
    }

    createStatus();

    if (player.hp <= 0) {
        gameOver();
    }

}

function attackChoice(arr) {
        const indice = Math.floor(Math.random() * arr.length);
        return arr[indice];
}

async function monsterDead() {
    player.score += monster.score;
    player.exp += monster.exp;
    player.kill += 1;

    monsterGen()
}