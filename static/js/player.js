
async function playerAttack(attack) {
    let player = await Player();

    let attackDamage = intervalCalculate(attack.damage);
    
    let realDamage = Math.max(attackDamage - intervalCalculate(player.monster.defe), 1);
    
    sendLog(`${username} usou ${attack.name} e deu ${realDamage}`);

    player.monster.hp -= realDamage;

    await SavePlayer(player);

    document.getElementById("monster-hp__bar").value = player.monster.hp;
    document.querySelectorAll(".damage-letter")[0].innerHTML = realDamage;

    if (player.monster.hp <= 0) {
        monsterDead();
        await loadingTransition();
    }

}

async function gameOver() {
    sendLog("Você morreu!")
}