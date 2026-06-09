let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

function fazerLogin() {

    const email =
        document.getElementById("email").value.trim();

    const senha =
        document.getElementById("senha").value.trim();

    if (!email || !senha) {

        alert("Preencha todos os campos!");

        return;
    }



    if (email === "admin" && senha === "admin") {

        const admin = {

            nome: "Administrador",

            email: "admin",

            tipo: "admin"
        };

        sessionStorage.setItem(
            "usuarioLogado",
            JSON.stringify(admin)
        );

        window.location.href = "admin.html";

        return;
    }


    const usuario =
        usuarios.find(
            usuario =>
                usuario.email === email &&
                usuario.senha === senha
        );

    if (!usuario) {

        alert("E-mail ou senha inválidos!");

        return;
    }


sessionStorage.setItem(
    "usuarioLogado",
    JSON.stringify({
        nome: usuario.nome,
        email: usuario.email,
        tipo: "cliente"
    })
);

    window.location.href = "livros.html";
}

window.fazerLogin = fazerLogin;