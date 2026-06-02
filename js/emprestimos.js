let emprestimos =
    JSON.parse(localStorage.getItem("emprestimos")) || [];

const cliente =
    JSON.parse(localStorage.getItem("clienteAtual"));

const livroSelecionado =
    JSON.parse(localStorage.getItem("livroSelecionado"));

const clienteInfo =
    document.getElementById("clienteInfo");

if (clienteInfo && cliente) {

    clienteInfo.innerHTML = `
        <div class="cliente-card">

            <h3>${cliente.nome}</h3>

            <p>${cliente.email}</p>

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

    if (!cliente) {

        alert("Nenhum cliente encontrado!");

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

        cliente: cliente.nome,

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

    document.getElementById("livroSelecionado").innerHTML = "";


    renderizarEmprestimos();


    alert("Empréstimo realizado com sucesso!");
}

function renderizarEmprestimos() {

    const lista =
        document.getElementById("listaEmprestimos");


    if (!lista) return;


    lista.innerHTML = "";


    emprestimos.forEach((emp, index) => {

        lista.innerHTML += `
            <div class="emprestimo-card">

                <img src="${emp.capa}" alt="${emp.livro}">

                <h3>${emp.livro}</h3>

                <p>
                    Cliente:
                    ${emp.cliente}
                </p>

                <p>
                    Devolução:
                    ${emp.devolucao}
                </p>

                <button onclick="removerEmprestimo(${index})">
                    Excluir Empréstimo
                </button>

            </div>
        `;
    });
}

function removerEmprestimo(index) {

    emprestimos.splice(index, 1);


    localStorage.setItem(
        "emprestimos",
        JSON.stringify(emprestimos)
    );


    renderizarEmprestimos();
}

renderizarEmprestimos();

window.finalizarEmprestimo = finalizarEmprestimo;
window.removerEmprestimo = removerEmprestimo;