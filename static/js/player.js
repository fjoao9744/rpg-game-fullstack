
async function playerAttack(attack) {
    let attackDamage = intervalCalculate(attack.damage);
    
    let realDamage = Math.max(attackDamage - intervalCalculate(monster.defe), 1);
    
    console.log(`${username} usou ${attack.name} e deu ${realDamage}`);

    monster.hp -= realDamage;

    document.getElementById("monster-hp__bar").value = monster.hp;
    document.querySelectorAll(".damage-letter")[0].innerHTML = realDamage;

    if (monster.hp <= 0) {
        monsterDead();
        await loadingTransition();
    }

}

async function gameOver() {
    console.log("você morreu!")
}