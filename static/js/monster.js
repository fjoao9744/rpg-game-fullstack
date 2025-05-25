async function monsterGen() {
    let player = await Player();
    
    let monster = await fetch(`${BASE_URL}/battle/monster/${Math.floor(player.andar)}`).then(response => response.json());

    return monster
}

async function monsterAttack() {
    let player = await Player();

    // pegar o ataque
    console.log(player.monster.skills)
    let attack = attackChoice(Object.values(player.monster.skills));
    sendLog(attack.message);
    
    // calcular dano
    let attackDamage = intervalCalculate(attack.damage);

    let realDamage = Math.max(attackDamage - player.defe, 1);

    player.hp -= realDamage;
    await SavePlayer(player)
    await updateStatus()

    sendLog(`${username} perdeu ${realDamage} de hp`);

    if (player.hp <= 0) {
        await gameOver();
    }
}

function attackChoice(arr) {
        const indice = Math.floor(Math.random() * arr.length);
        return arr[indice];
}

async function monsterDead() {
    let player = await Player();
    await sendLog(`${player.monster.name} morreu`)
    player.score += player.monster.score;
    player.exp += player.monster.exp;
    player.kill += 1;
    player.monster = {}
    document.getElementById("monster__image").style.display = "none"
    await SavePlayer(player);
    await updateStatus();
    await updatePlayer();
    
    await sendButton("ANDAR", async () => {
        let monster = await monsterGen();
        console.log(monster)

        player.andar += 0.1;
        await SavePlayer(player);
        updateStatus();
        
        battle(monster)
    })
}