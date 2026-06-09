let emprestimos =
    JSON.parse(localStorage.getItem("emprestimos")) || [];

const usuarioLogado =
    JSON.parse(sessionStorage.getItem("usuarioLogado"));

if (!usuarioLogado) {

    window.location.href = "index.html";
}

const livroSelecionado =
    JSON.parse(localStorage.getItem("livroSelecionado"));

const clienteInfo =
    document.getElementById("clienteInfo");

if (clienteInfo && usuarioLogado) {

    clienteInfo.innerHTML = `
        <div class="cliente-card">

            <h3>${usuarioLogado.nome}</h3>

            <p>${usuarioLogado.email}</p>

        </div>
    `;
}

const areaLivro =
    document.getElementById("livroSelecionado");

if (areaLivro && livroSelecionado) {

    areaLivro.innerHTML = `
        <div class="livro-selecionado-card">

            <img src="${livroSelecionado.capa}" width="120">

            <h3>${livroSelecionado.titulo}</h3>

        </div>
    `;
}

function finalizarEmprestimo() {

    if (!usuarioLogado) {

        alert("Nenhum usuário encontrado!");

        return;
    }

    if (!livroSelecionado) {

        alert("Nenhum livro selecionado!");

        return;
    }

    const hoje = new Date();

    hoje.setDate(hoje.getDate() + 7);

    const devolucao =
        hoje.toLocaleDateString();

    const emprestimo = {

        cliente: usuarioLogado.nome,

        livro: livroSelecionado.titulo,

        capa: livroSelecionado.capa,

        devolucao
    };

    emprestimos.push(emprestimo);

    localStorage.setItem(
        "emprestimos",
        JSON.stringify(emprestimos)
    );

    localStorage.removeItem("livroSelecionado");

    document.getElementById(
        "livroSelecionado"
    ).innerHTML = "";

    renderizarEmprestimos();

    alert("Empréstimo realizado com sucesso!");
}

function renderizarEmprestimos() {

    const lista =
        document.getElementById("listaEmprestimos");

    if (!lista) return;

    lista.innerHTML = "";

    const meusEmprestimos =
        emprestimos.filter(
            emp => emp.cliente === usuarioLogado.nome
        );

    meusEmprestimos.forEach((emp) => {

        lista.innerHTML += `
            <div class="emprestimo-card">

                <img src="${emp.capa}" alt="${emp.livro}">

                <h3>${emp.livro}</h3>

                <p>
                    Devolução:
                    ${emp.devolucao}
                </p>

            </div>
        `;
    });
}

renderizarEmprestimos();

window.finalizarEmprestimo =
    finalizarEmprestimo;

    function sair() {

    sessionStorage.removeItem("usuarioLogado");

    window.location.href = "index.html";
}