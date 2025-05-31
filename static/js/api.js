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

// async function nextFloor() {
//     se player puder upar

//     const response = await fetch(`${BASE_URL}/game/player/floor/next/${username}`)

//     data = await response.json()

//     return data

//     else

//     await sendLog("Complete todas as quests")

// }