window.onload = function(){
        fetch('http://localhost:3000/locais')
        .then(response => response.json())
        .then(locais => {
            const locaisDiv = document.getElementById('locais')
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
        //window.open("index.html")
}

function editarLocal(id) {
    // Obter dados do local a ser editado
    fetch(`http://localhost:3000/locais?id=${id}`)
        .then(response => response.json())
        .then(local => {
            // Preencher formulário de edição com os dados do local
            document.getElementById('titulo').value = local.titulo
            document.getElementById('descricao').value = local.descricao
            document.getElementById('foto').value = local.foto

            // Adicionar botão de salvar edição
            const salvarButton = document.createElement('button')
            salvarButton.textContent = 'Salvar Edição'
            salvarButton.onclick = () => salvarEdicao(id)
            document.getElementById('formulario-edicao').appendChild(salvarButton)
        })
}

function salvarEdicao(id) {
    // Obter dados do formulário de edição
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
    fetch(`http://localhost:5500/locais/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(localAtualizado)
    })
        .then(response => response.json())
        .then(local => {
            // Atualizar a lista de locais
            buscarLocais()
        })
}

function excluirLocal(id) {
    // Enviar requisição DELETE para excluir o local
    fetch(`http://localhost:5500/locais/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            // Atualizar a lista de locais
            buscarLocais()
        })
}