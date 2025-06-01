let opt__area = document.querySelector(".opt-player__area");
let attack__area = document.querySelector(".atack-animation__area")
const opt__manager = document.querySelectorAll('.opt-manager');
let monsterIsAlive = false;

async function battle() {
    monsterIsAlive = true;

    let player = await getPlayer();
    let monster = player.monster;
    console.log(player)

    document.getElementById("monster-hp__bar").value = monster.hp
    document.getElementById("monster-hp__bar").max = monster.hp

    document.getElementById("monster__image").src = monster.image;
    document.querySelector(".monster__name").innerHTML = monster.name.toUpperCase();
    
    document.getElementById("monster__image").style.display = "block";
    sendLog(`${monster.name} apareceu`)

    // batalha
    monsterAnimation();
    
    opt__manager.forEach((opt) => {
        
        opt.onclick = async (event) => {
            if (!monsterIsAlive) {
                console.log("O monstro já está morto.");
                return;
            }
            
            const idTarget = event.currentTarget.id;

            switch (idTarget) {
                case "fight_option": 
                    opt__area.replaceChildren();

                    let attacks = [player.skill1, player.skill2, player.skill3, player.skill4]
                    let player__attacks = attacks.filter(obj => obj && Object.keys(obj).length > 0);
                    console.log(player__attacks)

                    try {
                        for (let x = 0; x < player__attacks.length; x++) {
                            let attack = Object.values(player__attacks[x])[0]
                            let ataque = document.createElement("div");
                            ataque.className = "options";
                            ataque.innerHTML = attack.name;
                            
                            ataque.addEventListener('click', async () => {
                                let response = await playerAttack(x);
                                player = response.player;
                                monster = response.monster;

                                let dano = response.player_damage;

                                document.querySelector(".damage-letter").innerHTML = `-${dano}hp`;

                                opt__area.style.opacity = "0"
                                opt__area.style.pointerEvents = "none"
                                opt__area.style.opacity = "0.5";
                                attack__area.style.backgroundImage = `url(${attack.gif})`
                                await new Promise(resolve => setTimeout(resolve, 1000))
                                attack__area.style.backgroundImage = ``
                                await new Promise(resolve => setTimeout(resolve, 100));
                                await damageAnimate();
                                await damageLetterAnimation();

                                await new Promise(resolve => setTimeout(resolve, 1000))
                                opt__area.style.opacity = "1"
                                opt__area.style.pointerEvents = "all"
                                opt__area.replaceChildren();
                                opt__area.style.flexDirection = "column";
                                opt__manager.forEach((opt) => {
                                    opt__area.appendChild(opt);
                                });
                                console.log(response.levelup);
                                if (response.levelup) {
                                    sendLog("Você upou de level!");
                                    await levelUp();
                                
                                }
                                if (Object.values(monster).length == 0) {
                                    await sendLog(`O monstro morreu!`);
                                    await sendLog(`Você ganhou ${response.exp} de exp`);
                                    await sendLog(`Você ganhou ${response.score} de score`);
                                    document.getElementById("monster-hp__bar").value = 0;
                                    await monsterDeath();
                                    
                                    return;
                                }
                                document.getElementById("monster-hp__bar").value = monster.hp;

                            });

                            opt__area.appendChild(ataque);
                        }

                        opt__area.style.flexDirection = "column";

                    } catch (error) {
                        console.error("Erro ao carregar o JSON:", error);
                    }
                    break;

                case "speel_option":
                    document.getElementById(idTarget).style.backgroundColor = 'yellow';
                    break;

                case "item_option":
                    document.getElementById(idTarget).style.fontSize = '35px';
                    break;

                default:
                    document.getElementById(idTarget).animate(
                        [
                            {offset: 0, transform: "translate(0, 0)"},
                            {offset: 1, transform: "translate(1000px, 0px)"},
                        ], {
                            duration: 5000,
                        }
                    );
                    break;
            }
        };
    });
}

async function monsterDeath() {
    monsterIsAlive = false;
    await monsterDeathAnimation();
    document.getElementById("monster__image").style.display = 'none'
    await updateStatus()
    await sendButton("ANDAR", async () => walk());
}
