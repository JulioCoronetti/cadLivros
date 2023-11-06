document.getElementById('cadastroForm').addEventListener('submit', cadastrarLivro);
var result = 0;
function cadastrarLivro(event) {
    event.preventDefault();

    const isbn = document.getElementById('isbn').value;
    const descricao = document.getElementById('descricao').value;

    fetch('http://localhost:8080/livro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isbn, descricao }),
    })
        .then(response => response.json())
        .then(data => {
            alert('Livro cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset();            
        })
        .catch(error => {
            console.error('Erro ao cadastrar livro:', error);
        });
}
function pesquisarLivro() {
    const searchId = document.getElementById('searchId').value;

    fetch(`http://localhost:8080/jogo/${searchId}`)
        .then(response => {
            if (response.status === 404) {
                return Promise.reject('Livro não encontrado');
                result = 0;
            }
            return response.json();
        })
        .then(data => {
            result = 1;
            const resultadoPesquisa = document.getElementById('resultadoPesquisa')
            resultadoPesquisa.innerHTML = `
                <h3>ID: ${data.id}</h3>
                <p>Isbn: ${data.isbn}</p>
                <p>Descrição: ${data.descricao}</p>
            `
        })
        .catch(error => {
            console.error('Erro ao pesquisar livro:', error);
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = 'Livro não encontrado.';
            var timer = window.setTimeout(atualizarPagina, 3000);

        });
}
function atualizarLivro() {
    pesquisarLivro();
    if (result == 1) {
        const isbn = document.getElementById('isbn').value;
        const descricao = document.getElementById('descricao').value;
        const searchId = document.getElementById('searchId').value;

        fetch(`http://localhost:8080/jogo/${searchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isbn, descricao }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Livro atualizado com sucesso!');
                document.getElementById('cadastroForm').reset();                
            })
            .catch(error => {
                console.error('Erro ao atualizar livro:', error);
            });
    } else {
        alert('ID não encontrado na base de dados. Nenhum livro foi alterado. Favor pesquisar livro a ser alterado !!!');
    }
}

function deletarLivro() {
    pesquisarLivro();
    if (result == 1) {
        const searchId = document.getElementById('searchId').value;

        fetch(`http://localhost:8080/jogo/${searchId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('cadastroForm').reset();
                document.getElementById('searchId').reset();                
            })
            .catch(error => {
                console.error('Erro ao deletar o livro:', error);
            });
    } else {
        alert('ID não encontrado na base de dados. Nenhum livro foi deletado. Favor pesquisar livro a ser deletado !!!');
    } 
    	alert('Livro deletado com sucesso!');	
}