let num_id = 0
window.onload = function(){

        const urlParams = new URLSearchParams(window.location.search)
        const id = urlParams.get('id')

        fetch('http://localhost:3000/locais')
        .then(response => response.json())
        .then(locais => {

            num_id = locais.length + 1

            locais.forEach(local => {
                if(id !== null){
                    const titulo = document.getElementById('titulo')
                    const descricao = document.getElementById('descricao')
                    const foto = document.getElementById('foto')

                    if(local.id == id){
                        titulo.value = local.titulo
                        descricao.value = local.descricao
                        foto.value = local.foto
                    }
                }
            })
    
            const locaisDiv = document.getElementById('locais')

            if (locaisDiv !== null){
                locaisDiv.innerHTML = '' // Limpa a lista de locais
                locais.forEach(local => {
                    const localDiv = document.createElement('div')
                    localDiv.classList.add('local')
                    localDiv.innerHTML = `
                        <h2>${local.titulo}</h2>
                        <img src="${local.foto}" alt="${local.titulo}">
                        <p>${local.descricao}</p>
                        <div class="btn-local">
                        <button onclick="editarLocal(${local.id})">Editar</button>
                        <button onclick="excluirLocal(${local.id})">Excluir</button>
                        </div>
                    `
                    locaisDiv.appendChild(localDiv)
                })
            }
        })
}

function buscarLocais() {
    let search = document.getElementById("busca").value
    fetch('http://localhost:3000/locais')
        .then(response => response.json())
        .then(locais => {
            let locaisDiv = document.getElementById('locais')
            locaisDiv.innerHTML = '' // Limpa a lista de locais

            locais.forEach(local => {
                if (local.titulo.includes(search)){
                const localDiv = document.createElement('div')
                localDiv.classList.add('local')
                localDiv.innerHTML = `
                    <h2>${local.titulo}</h2>
                    <img src="${local.foto}" alt="${local.titulo}">
                    <p>${local.descricao}</p>
                    <div class="btn-local">
                    <button onclick="editarLocal(${local.id})">Editar</button>
                    <button onclick="excluirLocal(${local.id})">Excluir</button>
                    </div>
                `
                locaisDiv.appendChild(localDiv)
                }
            })
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

function editarLocal(id) {
    window.location.href = `editar-local.html?id=${id}`
}

function salvarEdicao() {
    // Obter dados do formulário de edição
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    const titulo = document.getElementById('titulo').value
    const descricao = document.getElementById('descricao').value
    const foto = document.getElementById('foto').value

    // Criar objeto com os dados do local
    const localAtualizado = {
        titulo: titulo,
        descricao: descricao,
        foto: foto
    }

    // Enviar requisição PUT para atualizar o local
    fetch(`http://localhost:3000/locais/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(localAtualizado)
    })
        .then(response => response.json())
        alert("Alterado com sucesso!")
        window.location.href = "index.html"

}

function excluirLocal(id) {
    // Enviar requisição DELETE para excluir o local
    fetch(`http://localhost:3000/locais/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            // Atualizar a lista de locais
            buscarLocais()
        })
}