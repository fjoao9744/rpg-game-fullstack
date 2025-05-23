let opt__area = document.querySelector(".opt-player__area");
let attack__area = document.querySelector(".atack-animation__area")
const opt__manager = document.querySelectorAll('.opt-manager');

window.onload = async () => {
    let battleStart = true;
    battle__player = JSON.parse(localStorage.getItem("player"))

    if (battleStart) {

        // let monster__response = await fetch("static/data/monsters.json");
        // let monsters1 = monster__response.json()
        // let monsters2 = monsters1.filter(monster => monster === 1)
        // console.log(monsters1)

        let geralAnimation = document.querySelector("#monster__image").animate(
            [
                {offset: 0, transform: "translateX(0)"},
                {offset: .2, transform: "translate(-5px)"},
                {offset: .4, transform: "translate(5px)"},
                {offset: .6, transform: "translate(-5px)"},
                {offset: .8, transform: "translate(5px)"},
                {offset: 1, tramsform: "translate(0)"}
            ],
            {
                duration: 10000,
                iterations: Infinity,
                easing: 'ease'
            }
        )

    function damageAnimate() {
        document.querySelector("#monster__image").animate(
            { transform: ['translateX(0)', 
                'translateX(5%)', 
                'translateX(-5%)', 
                'translateX(5%)', 
                'translateX(-5%)', 
                'translateX(0)'] 

  },
  { 
    duration: 300, 
  easing: 'ease-in-out' }
        )

    }


    opt__manager.forEach((opt) => {
        opt.addEventListener('click', async (event) => {
            const idTarget = event.currentTarget.id;
            

            switch (idTarget) {
                case "fight_option": 
                    opt__area.replaceChildren("");

                    try {

                        const responseTwo = await fetch("static/data/attacks.json");
                        const Attacks = await responseTwo.json()

                        let ataqueBasico = ["static/media/sprites/atacks/slices-dark.gif"]
                        console.log()
                        const Player__attacks = Object.values(battle__player.skills);
                        Player__attacks[2] = Attacks.summon2;

                        for (let x = 0; x < Player__attacks.length; x++) {
                            let ataque = document.createElement("button");
                            ataque.className = "options";
                            ataque.innerHTML = Player__attacks[x].name;
                            
                            ataque.addEventListener('click', async () => {
                                opt__area.style.opacity = "0"
                                opt__area.style.pointerEvents = "none"
                                attack__area.style.backgroundImage = `url(${Player__attacks[x].gif})`
                                await new Promise(resolve => setTimeout(resolve, 1000))
                                attack__area.style.backgroundImage = ``
                                await new Promise(resolve => setTimeout(resolve, 100))
                                damageAnimate()
                                await new Promise(resolve => setTimeout(resolve, 1000))
                                opt__area.style.opacity = "1"
                                opt__area.style.pointerEvents = "all"
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
    }

};