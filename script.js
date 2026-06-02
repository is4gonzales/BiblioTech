let clientes =
    JSON.parse(localStorage.getItem("clientes")) || [];

let emprestimos =
    JSON.parse(localStorage.getItem("emprestimos")) || [];

let livroSelecionado = null;

function cadastrarCliente() {

    const nome =
        document.getElementById("nome").value.trim();

    const cpf =
        document.getElementById("cpf").value.trim();

    const email =
        document.getElementById("email").value.trim();

    if (!nome || !cpf || !email) {

        alert("Preencha todos os campos!");

        return;
    }


    const cliente = {
        nome,
        cpf,
        email
    };


    clientes.push(cliente);


    localStorage.setItem(
        "clientes",
        JSON.stringify(clientes)
    );


    limparFormulario();

    renderizarClientes();

    atualizarSelectClientes();
}


function limparFormulario() {

    document.getElementById("nome").value = "";

    document.getElementById("cpf").value = "";

    document.getElementById("email").value = "";
}


function renderizarClientes() {

    const lista =
        document.getElementById("listaClientes");

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


async function buscarLivros() {

    const termo =
        document.getElementById("buscaLivro").value;

    const resultado =
        document.getElementById("resultadoLivros");


    if (!termo) {

        alert("Digite o nome de um livro!");

        return;
    }


    resultado.innerHTML = `
        <p>Carregando livros...</p>
    `;


    try {

        const response = await fetch(
            `https://openlibrary.org/search.json?q=${termo}`
        );

        const data = await response.json();


        if (data.docs.length === 0) {

            resultado.innerHTML = `
                <p>Nenhum livro encontrado.</p>
            `;

            return;
        }


        mostrarLivros(data.docs);

    } catch (erro) {

        resultado.innerHTML = `
            <p>Erro ao buscar livros.</p>
        `;

        console.log(erro);
    }
}


function mostrarLivros(livros) {

    const resultado =
        document.getElementById("resultadoLivros");

    resultado.innerHTML = "";


    livros.slice(0, 6).forEach((livro) => {

        const titulo =
            livro.title || "Sem título";

        const autor =
            livro.author_name
            ? livro.author_name[0]
            : "Autor desconhecido";


        const capa =
            livro.cover_i
            ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
            : "https://via.placeholder.com/150";


        resultado.innerHTML += `
            <div class="livro-card">

                <img src="${capa}" alt="${titulo}">

                <h3>${titulo}</h3>

                <p>${autor}</p>

                <button
                    onclick="selecionarLivro(
                        '${titulo}',
                        '${capa}'
                    )"
                >
                    Selecionar para Empréstimo
                </button>

            </div>
        `;
    });
}

function selecionarLivro(titulo, capa) {

    livroSelecionado = {
        titulo,
        capa
    };


    const area =
        document.getElementById("livroSelecionado");


    area.innerHTML = `
        <div class="livro-selecionado-card">

            <img src="${capa}" width="120">

            <h3>${titulo}</h3>

        </div>
    `;
}


function finalizarEmprestimo() {

    const cliente =
        document.getElementById("selectClientes").value;


    if (!cliente) {

        alert("Selecione um cliente!");

        return;
    }


    if (!livroSelecionado) {

        alert("Selecione um livro!");

        return;
    }


    const hoje = new Date();

    hoje.setDate(hoje.getDate() + 7);


    const devolucao =
        hoje.toLocaleDateString();


    const emprestimo = {

        cliente,

        livro: livroSelecionado.titulo,

        capa: livroSelecionado.capa,

        devolucao
    };


    emprestimos.push(emprestimo);


    localStorage.setItem(
        "emprestimos",
        JSON.stringify(emprestimos)
    );


    renderizarEmprestimos();


    alert("Empréstimo realizado com sucesso!");
}

function renderizarEmprestimos() {

    const lista =
        document.getElementById("listaEmprestimos");

    lista.innerHTML = "";


    emprestimos.forEach((emp) => {

        lista.innerHTML += `
            <div class="emprestimo-card">

                <img src="${emp.capa}">

                <h3>${emp.livro}</h3>

                <p>
                    Cliente:
                    ${emp.cliente}
                </p>

                <p>
                    Devolução:
                    ${emp.devolucao}
                </p>

            </div>
        `;
    });
}

renderizarClientes();

atualizarSelectClientes();

renderizarEmprestimos();