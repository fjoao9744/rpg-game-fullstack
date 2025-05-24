let player = "";

(async () => {if (username) {
      console.log("Usuário logado:", username);

      andares = await getAndares();
      monstro = await gerarMonstro(andares.andar2);
      console.log(monstro)
      
      player = await getPlayer();
      localStorage.setItem("player", JSON.stringify(player)) // pega o usuario e manda para o localstorage
      console.log(player)
      console.log("player criado no localstorage")
} else {
      player = {}
}})();

