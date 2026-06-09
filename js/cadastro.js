let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

function cadastrarUsuario() {

    const nome =
        document.getElementById("nome").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const senha =
        document.getElementById("senha").value.trim();

    if (!nome || !email || !senha) {

        alert("Preencha todos os campos!");

        return;
    }

    const usuarioExiste =
        usuarios.find(
            usuario => usuario.email === email
        );

    if (usuarioExiste) {

        alert("Este e-mail já está cadastrado!");

        return;
    }

    const usuario = {

        nome,

        email,

        senha,

        tipo: "cliente"
    };

    usuarios.push(usuario);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    alert("Cadastro realizado com sucesso!");

    window.location.href = "index.html";
}

window.cadastrarUsuario = cadastrarUsuario;