// Acontece toda vez que a página inicia
window.onload = function(){

        // Carrega JSON para tratamento e visualização de dados
        fetch('http://localhost:3000/locais')
        .then(response => response.json())
        .then(locais => {
    
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
                        <button id="delete" onclick="excluirLocal(${local.id})">Excluir</button>
                        </div>
                    `
                    locaisDiv.appendChild(localDiv)
                })
            }
        })
}

function buscarLocais() {
    let search = document.getElementById("busca").value
    search = search.toLowerCase()
    fetch('http://localhost:3000/locais')
        .then(response => response.json())
        .then(locais => {
            let locaisDiv = document.getElementById('locais')
            locaisDiv.innerHTML = '' // Limpa a lista de locais

            locais.forEach(local => {
                const found = local.titulo.toLowerCase()
                if (found.includes(search)){
                const localDiv = document.createElement('div')
                localDiv.classList.add('local')
                localDiv.innerHTML = `
                    <h2>${local.titulo}</h2>
                    <img src="${local.foto}" alt="${local.titulo}">
                    <p>${local.descricao}</p>
                    <div class="btn-local">
                    <button onclick="editarLocal(${local.id})">Editar</button>
                    <button id="delete" onclick="excluirLocal(${local.id})">Excluir</button>
                    </div>
                `
                locaisDiv.appendChild(localDiv)
                }
            })
        })

}


function editarLocal(id) {
    window.location.href = `editar-local.html?id=${id}`
}


function excluirLocal(id) {
    // Mensagem de confirmação
    if(confirm("Deseja excluir permanentemente o local?")){
        // Enviar requisição DELETE para excluir o local
        fetch(`http://localhost:3000/locais/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                // Atualizar a lista de locais
                buscarLocais()
            })
    }
}