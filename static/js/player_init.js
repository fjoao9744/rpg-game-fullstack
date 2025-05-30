(async () => {
    if (username) {
      sendLog(`usuario conectado: ${username}`);
      floor = await getFloor()

      document.querySelector(".monster__area").style.backgroundImage = `url(${floor.background})`

      player = await getPlayer();

      await createStatus();


}})();
