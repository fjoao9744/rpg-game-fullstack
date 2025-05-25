let player = "";

(async () => {
    if (username) {
      console.log("Usuário logado:", username);
    
      player = await getPlayer();
      localStorage.setItem("player", JSON.stringify(player)) // pega o usuario e manda para o localstorage
      console.log(player)
      console.log("player criado no localstorage")

      if (player) { createStatus() }


} else {
      player = {}
}})();
