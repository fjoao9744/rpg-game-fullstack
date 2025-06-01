(async () => {
    if (username) {
      sendLog(`usuario conectado: ${username}`);
      floor = await getFloor();

      document.querySelector(".monster__area").style.backgroundImage = `url(${floor.background})`;

      let player = await getPlayer();

      if (player.floor == 1) {
        await desativeButton("past_floor");

      }

      await createStatus();
}})();


