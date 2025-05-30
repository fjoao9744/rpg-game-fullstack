let opt__area = document.querySelector(".opt-player__area");
let attack__area = document.querySelector(".atack-animation__area")
const opt__manager = document.querySelectorAll('.opt-manager');

// (() => {
//     document.querySelector(".atack-animation__area").style.backgroundImage = `url(static/media/sprites/atacks/electric_power.gif)`
//     document.querySelector("#monster__image").src = "static/media/sprites/monsters/ghost_red.gif"
//     damageLetterAnimation();
// })()

async function battle(player, monster) {
    // registrando batalha
    player.monster = monster;

    await SavePlayer(player);
    await updatePlayer();

    console.log(monster);

    document.getElementById("monster-hp__bar").value = monster.hp
    document.getElementById("monster-hp__bar").max = monster.hp

    document.getElementById("monster__image").src = monster.image;
    document.querySelectorAll(".monster__name")[0].innerHTML = monster.name.toUpperCase();
    
    document.getElementById("monster__image").style.display = "block";
    sendLog(`${monster.name} apareceu`)

    // batalha
    monsterAnimation();
    
    opt__manager.forEach((opt) => {
        opt.addEventListener('click', async (event) => {
            const idTarget = event.currentTarget.id;

            switch (idTarget) {
                case "fight_option": 
                    opt__area.replaceChildren("");

                    try {
                        const responseTwo = await fetch("static/data/attacks.json");
                        const Attacks = await responseTwo.json()

                        let ataqueBasico = ["static/media/sprites/atacks/slices_dark.gif"]

                        Player__attacks = Object.values(player.skills);

                        for (let x = 0; x < Player__attacks.length; x++) {
                            let ataque = document.createElement("div");
                            ataque.className = "options";
                            ataque.innerHTML = Player__attacks[x].name;
                            
                            ataque.addEventListener('click', async () => {
                                opt__area.style.opacity = "0"
                                opt__area.style.pointerEvents = "none"
                                attack__area.style.backgroundImage = `url(${Player__attacks[x].gif})`
                                await new Promise(resolve => setTimeout(resolve, 1000))
                                attack__area.style.backgroundImage = ``
                                await new Promise(resolve => setTimeout(resolve, 100));
                                damageAnimate();

                                player = await playerAttack(player, Player__attacks[x]);
                                await SavePlayer(player);

                                await new Promise(resolve => setTimeout(resolve, 1000))
                                opt__area.style.opacity = "1"
                                opt__area.style.pointerEvents = "all"
                                opt__area.replaceChildren();
                                opt__area.style.flexDirection = "column";
                                opt__manager.forEach((opt) => {
                                    opt__area.appendChild(opt);
                                });
                                // teste
                                if (monster.hp > 0) {
                                    await monsterAttack();
                                }
                                    

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
        });
    });
}
