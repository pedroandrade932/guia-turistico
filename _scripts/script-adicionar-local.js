// Acontece toda vez que a página inicia
let num_id = 0
window.onload = function(){
        // Carrega JSON para tratamento e visualização de dados
        fetch('http://localhost:3000/locais')
        .then(response => response.json())
        .then(locais => {
            num_id = locais.length + 1
        })
}


function criarLocal() {
    // Obter dados do formulário de criação de local
    const titulo = document.getElementById('titulo').value
    const descricao = document.getElementById('descricao').value
    const foto = document.getElementById('foto').value

    // Criar objeto com os dados do local
    const novoLocal = {
        id: `${num_id}`,
        titulo: titulo,
        descricao: descricao,
        foto: foto
    }

    // Enviar requisição POST para criar o local
    fetch('http://localhost:3000/locais', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoLocal)
    })
        .then(response => response.json())
        alert("Adicionado com sucesso!")
        window.location.href = "index.html"
}
