async function getFloor() {
    const response = await fetch(`${BASE_URL}/game/player/floor/${username}/`)

    data = await response.json()

    localStorage.setItem("quests", JSON.stringify(data.quests))

    return data
}

async function playerAttack(attack_num) {
    data = await fetch(`${BASE_URL}/game/battle/turn/player/${username}/${attack_num}`).then(response => response.json());

    console.log(data)

    return data
}

async function walk() {
    let monster = await fetch(`${BASE_URL}/game/battle/start/${username}`).then(response => response.json())
    await battle()
}
async function nextFloor() {
    const response = await fetch(`${BASE_URL}/game/player/floor/next/${username}`);
    floor = await response.json();

    document.querySelector(".monster__area").style.backgroundImage = `url(${floor.background})`;

    let player = await getPlayer();

    if (player.floor === player.max_floor) {
        await reativeButton("past_floor");
        await desativeButton("next_floor");
        await updatePlayer();

    } else {
        await reativeButton("next_floor");
        await updatePlayer();
    }

}

async function pastFloor() {
    const response = await fetch(`${BASE_URL}/game/player/floor/past/${username}`);
    floor = await response.json();
    document.querySelector(".monster__area").style.backgroundImage = `url(${floor.background})`;

    let player = await getPlayer();

    if (player.floor == 1) {
        await desativeButton("past_floor");
        await reativeButton("next_floor");
    }
}