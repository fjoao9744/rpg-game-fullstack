let opt__area = document.querySelector(".opt-player__area");
let attack__area = document.querySelector(".atack-animation__area")
const opt__manager = document.querySelectorAll('.opt-manager');

window.onload = () => {
    opt__manager.forEach((opt) => {
        opt.addEventListener('click', async (event) => {
            const idTarget = event.currentTarget.id;
            console.log(idTarget);

            switch (idTarget) {
                case "fight_option": 
                    opt__area.replaceChildren("");

                    try {
                        // const response = await fetch("static/data/player.json");
                        // const PlayerTest = await response.json();
                        // console.log(PlayerTest); 
                        
                        let ataqueBasico = ["static/media/sprites/atacks/explosion.gif"]
                        console.log(ataqueBasico)
                        const quantidadeAtks = 4;

                        for (let x = 0; x < quantidadeAtks; x++) {
                            let ataque = document.createElement("button");
                            ataque.className = "options";
                            ataque.innerHTML = "smogon";
                            
                            ataque.addEventListener('click', () => {
                                console.log("atacou!");
                                attack__area.style.backgroundImage = `url(${ataqueBasico[0]})`
                                opt__area.replaceChildren();
                                opt__area.style.flexDirection = "column";
                                opt__manager.forEach((opt) => {
                                    opt__area.appendChild(opt);
                                });
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
                            {offset: 1, transform: "translate(200px, -200px)"},
                        ], {
                            duration: 3000,
                        }
                    );
                    break;
            }
        });
    });
};