let livroSelecionado = null;

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


livros.slice(0, 30).forEach((livro) => {

        const titulo =
            livro.title || "Sem título";

        const autor =
            livro.author_name
                ? livro.author_name[0]
                : "Autor desconhecido";


        const capa = livro.cover_i
            ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
            : "https://placehold.co/180x250?text=Sem+Capa";

        resultado.innerHTML += `
            <div class="livro-card">
<img 
    src="${capa}" 
    alt="${titulo}"

    onerror="
        this.src='https://placehold.co/180x250?text=Sem+Capa'
    "
>

                <h3>${titulo}</h3>

                <p>${autor}</p>

                <button
                    onclick="selecionarLivro(
                        '${titulo}',
                        '${capa}'
                    )"
                >
                    Selecionar
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

    localStorage.setItem(
        "livroSelecionado",
        JSON.stringify(livroSelecionado)
    );

    window.location.href =
        "emprestimos.html";
}