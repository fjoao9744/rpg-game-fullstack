// document.getElementById("login_button").onclick = function() {
//     nome = prompt("Digite seu nome:")

//     fetch(`http://127.0.0.1:8000/api/?name=${encodeURIComponent(nome)}`) // busca o jogador
//     .then(res => res.json())
//     .then(data => {
//       if (data.length === 0) {
//         alert("Player não encontrado!");
//         fetch("http://127.0.0.1:8000/api/", { // adiciona um player
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//               name: nome,
//             })
//           })
//           .then(async res => {
//             if (!res.ok) {  // Verifica se o status não é 2xx
//               const errorData = await res.json();  // Lê o erro retornado
              
//               if (errorData.name) {  // Se o erro for relacionado ao nome duplicado
//                 alert("Erro: Nome já em uso!");  // Exibe a mensagem de erro para o usuário
//               }
//             } else {
//               const data = await res.json();
//               console.log("Player criado com sucesso:", data);
//             }
//           });
        
//     } else {
//         localStorage.setItem("player", data);
//     }
//     location.reload()

// })}

// document.getElementById("logout_button").onclick = function() {
//     localStorage.removeItem("data")
//     location.reload()
// }

document.getElementById("login_button").onclick = async () => {
  let nome = prompt("Digite seu nome...")
  
  const response = await fetch(`http://127.0.0.1:8000/api/?name=${encodeURIComponent(nome)}`, {method: "HEAD"})

  if (response.ok) {  // player existe
    player_data = await fetch(`http://127.0.0.1:8000/api/?name=${encodeURIComponent(nome)}`, {method: "GET"}).then(res => res.json())
    localStorage.setItem("player", JSON.stringify(player_data))
    console.log(player_data)

    let smogon = document.querySelectorAll(".sing-up__button")
      smogon.forEach((value) => {
          value.style.display = "none";
      })
      document.querySelector(".second__sing-up").style.display = "block";

    return
  }
}

document.getElementById("register_button").onclick = async () => {
  let nome = prompt("Digite seu nome...")

  fetch("http://127.0.0.1:8000/api/", { method: "POST", headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
  name: nome,
  })})

  let smogon = document.querySelectorAll(".sing-up__button")
      smogon.forEach((value) => {
          value.style.display = "none";
      })
      document.querySelector(".second__sing-up").style.display = "block";
}
    

document.querySelector(".second__sing-up").onclick = () => {
    localStorage.removeItem("player")
    location.reload()
    
    document.querySelector(".second__sing-up").style.display = "none";
    let smogon = document.querySelectorAll(".sing-up__button")
    smogon.forEach((value) => {
      value.style.display = "block";
    })
}
