(async () => {
    if (username) {
        console.log("Usuário logado:", username);
        
        exists = await userExists()

        if (exists) {
            user = await getUser()
            console.log("O player existe: ", user)
        } else {
            user = await createUser()
            console.log("O player não existe: ", user)
        }
        
        localStorage.setItem("player", JSON.stringify(user)) // pega o usuario e manda para o localstorage

    }
})();