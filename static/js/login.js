async function playerExists(name) { // player existe?
  const response = await fetch(`http://127.0.0.1:8000/api/?name=${encodeURIComponent(name)}`, {method: "HEAD"})

  return response.ok
}

document.getElementById("login_button").onclick = async () => { // login
  let nome = prompt("Digite seu nome...")
  
  if (await playerExists(nome)) { 
    let player_data = await fetch(`http://127.0.0.1:8000/api/?name=${encodeURIComponent(nome)}`, {method: "GET"}).then(res => res.json())
    localStorage.setItem("player", JSON.stringify(player_data))

    logar(false);
  }
}

document.getElementById("register_button").onclick = async () => { // register
  let nome = prompt("Digite seu nome...")

  if (await playerExists(nome)) {
    alert("O nome ja esta cadastrado, tente novamente.")
    return
  }

  await fetch("http://127.0.0.1:8000/api/", { method: "POST", headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
  name: nome,
  })})

  logar(false);

}

document.querySelector(".second__sing-up").onclick = () => { 
    localStorage.removeItem("player")
    logar(true)
    
  }

function logar(active) {
  if (active) {
    document.querySelector(".second__sing-up").style.display = "none";
    let smogon = document.querySelectorAll(".sing-up__button")
    smogon.forEach((value) => {
    value.style.display = "block";
    
  })} else {
    document.querySelector(".second__sing-up").style.display = "block";
    let smogon = document.querySelectorAll(".sing-up__button")
    smogon.forEach((value) => {
      value.style.display = "none";
    })
  } localStorage.setItem("logged", !active);
  
}
