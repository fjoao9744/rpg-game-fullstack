async function getFloor() {
    const response = await fetch(`${BASE_URL}/game/player/floor/${username}`)

    data = await response.json()

    localStorage.setItem("quests", JSON.stringify(data.quests))

    return data
}

// async function nextFloor() {
//     // se player puder upar

//     const response = await fetch(`${BASE_URL}/game/player/floor/next/${username}`)

//     data = await response.json()

//     return data

//     // else

//     await sendLog("Complete todas ")

// }