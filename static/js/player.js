let player = "";

(async () => {if (username) {
      console.log("Usuário logado:", username);

      for (let i = 0; i< 10; i++) {
            monstro = await fetch(`${BASE_URL}/battle/monster/1`).then(response => response.json())
            console.log(monstro)
      }

      player = await getPlayer();
      localStorage.setItem("player", JSON.stringify(player)) // pega o usuario e manda para o localstorage
      console.log(player)
      console.log("player criado no localstorage")

      if (player) { createStatus() }


} else {
      player = {}
}})();

