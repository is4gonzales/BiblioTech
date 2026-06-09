const usuarioLogado =
    JSON.parse(sessionStorage.getItem("usuarioLogado"));

if (
    !usuarioLogado ||
    usuarioLogado.tipo !== "admin"
) {

    window.location.href = "index.html";
}

let emprestimos =
    JSON.parse(localStorage.getItem("emprestimos")) || [];

function renderizarEmprestimos() {

    const lista =
        document.getElementById("listaEmprestimos");

    if (!lista) return;

    lista.innerHTML = "";

    if (emprestimos.length === 0) {

        lista.innerHTML = `
            <p>Nenhum empréstimo ativo.</p>
        `;

        return;
    }

    emprestimos.forEach((emp, index) => {

        lista.innerHTML += `
            <div class="emprestimo-card">

                <img
                    src="${emp.capa}"
                    alt="${emp.livro}"
                >

                <h3>${emp.livro}</h3>

                <p>
                    <strong>Leitor:</strong>
                    ${emp.cliente}
                </p>

                <p>
                    <strong>Devolução:</strong>
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

    if (
        !confirm(
            "Deseja realmente excluir este empréstimo?"
        )
    ) {
        return;
    }

    emprestimos.splice(index, 1);

    localStorage.setItem(
        "emprestimos",
        JSON.stringify(emprestimos)
    );

    renderizarEmprestimos();
}

function sair() {

    sessionStorage.removeItem("usuarioLogado");

    window.location.href = "index.html";
}

renderizarEmprestimos();

window.sair = sair;
window.removerEmprestimo = removerEmprestimo;