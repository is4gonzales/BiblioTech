let clientes =
    JSON.parse(localStorage.getItem("clientes")) || [];

function cadastrarCliente() {

    const nome =
        document.getElementById("nome").value.trim();

    const cpf =
        document.getElementById("cpf").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const senha =
        document.getElementById("senha").value.trim();

    if (!nome || !cpf || !email || !senha) {

        alert("Preencha todos os campos!");

        return;
    }


    const cliente = {
        nome,
        cpf,
        email,
        senha,
        tipo: "cliente"
    };


    clientes.push(cliente);


    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );

    localStorage.setItem(
        "clienteAtual",
        JSON.stringify(cliente)
    );

    sessionStorage.setItem(
        "usuarioLogado",
        JSON.stringify(cliente)
    );


    limparFormulario();

    window.location.href = "livros.html";
}

function limparFormulario() {

    document.getElementById("nome").value = "";

    document.getElementById("cpf").value = "";

    document.getElementById("email").value = "";

    document.getElementById("senha").value = "";
}

function renderizarClientes() {

    const lista =
        document.getElementById("listaClientes");

    if (!lista) return;


    lista.innerHTML = "";


    clientes.forEach((cliente) => {

        lista.innerHTML += `
            <div class="cliente-card">

                <h3>${cliente.nome}</h3>

                <p>CPF: ${cliente.cpf}</p>

                <p>${cliente.email}</p>

            </div>
        `;
    });
}

function atualizarSelectClientes() {

    const select =
        document.getElementById("selectClientes");


    if (!select) return;


    select.innerHTML = `
        <option value="">
            Selecione um cliente
        </option>
    `;


    clientes.forEach((cliente) => {

        select.innerHTML += `
            <option value="${cliente.nome}">
                ${cliente.nome}
            </option>
        `;
    });
}

renderizarClientes();

atualizarSelectClientes();