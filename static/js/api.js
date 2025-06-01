async function getFloor() {
    const response = await fetch(`${BASE_URL}/game/player/floor/${username}/`)

    let data = await response.json()

    localStorage.setItem("quests", JSON.stringify(data.quests))

    return data
}

async function playerAttack(attack_num) {
    console.log(attack_num)
    let data = await fetch(`${BASE_URL}/game/battle/turn/player/${username}/${attack_num}`).then(response => response.json());

    console.log(data)

    return data
}

async function walk() {
    await fetch(`${BASE_URL}/game/battle/start/${username}`).then(response => response.json())
    await battle()
}
async function nextFloor() {
    const response = await fetch(`${BASE_URL}/game/player/floor/next/${username}`);
    let floor = await response.json();

    document.querySelector(".monster__area").style.backgroundImage = `url(${floor.background})`;

    let player = await getPlayer();

    console.log(player.floor, player.max_floor)

    if (player.floor == player.max_floor) {
        await reativeButton("past_floor");
        await desativeButton("next_floor");
    } else {
        await reativeButton("next_floor");
    }

    if (player.floor == 5) {
        await inDemo();
        await reativeButton("next_floor");
    }
    await updateStatus();
    // await loadingTransition();

}

async function pastFloor() {
    const response = await fetch(`${BASE_URL}/game/player/floor/past/${username}`);
    floor = await response.json();
    document.querySelector(".monster__area").style.backgroundImage = `url(${floor.background})`;

    let player = await getPlayer();

    if (player.floor == 1) {
        await desativeButton("past_floor");
        await reativeButton("next_floor");
    } else {
        await reativeButton("next_floor");
    }
    if (player.floor == 5) {
        await inDemo();
        await reativeButton("next_floor");
    }
    await updateStatus();
    // await loadingTransition();
}