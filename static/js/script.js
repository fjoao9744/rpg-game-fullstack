document.body.onload = async () => {
    player = await fetch("static/data/player.json").then(response => response.json())
    const monstro = await fetch("static/data/monsters.json").then(response => response.json())
    
    slime = { // Teste
        hp: monstro.slime.hp
    }
    
    api_response = await fetch("http://127.0.0.1:8000/api/", { // test
        method: "GET",
        headers: {
            "Content-Type": "application/json"
          },
    }).then(response => response.json()) 

    console.log(api_response)

    
    
    document.getElementById("fight_option").onclick = function() {
        slime.hp -= player.atk
        console.log(slime.hp)
}
}

const data = {
    name: "João",
  };

  fetch("http://127.0.0.1:8000/api/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })