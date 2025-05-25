(async () => {
    if (username) {
      sendLog(`usuario conectado: ${username}`);
      let player = await Player();
      if (!player) {
        player = await getPlayer();
        console.log(player);
        await SavePlayer(player);
        console.log("player criado no localstorage");
      } else {
        console.log(player);
        console.log("player encontrado no localstorage");
      }
      delete player;


      await createStatus();

}})();
