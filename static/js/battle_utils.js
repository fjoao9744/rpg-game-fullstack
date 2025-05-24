// function damageCalculate(arr) {

// }

// function damageLetterAnimate() {

// }

async function getAndares() {
    response = await fetch("static/data/floors.json");
    data = await response.json();

    return data;
}

async function gerarMonstro(andar) {
    let monsters = andar.monsters;
    let monster_name = sortearMonstro(monsters);

    response = await fetch("static/data/monsters.json");
    data = await response.json();

    return data[monster_name];
}

function sortearMonstro(monsters) {
    const sorted = Math.ceil(Math.random() * 100)
    let acumulado = 0;

    for (let monster of monsters) {
        let monster_name = Object.keys(monster);
        let monster_chance = Object.values(monster);

        acumulado += monster_chance; 

        if (sorted <= acumulado) {
            return monster_name;
        }
    }
}
