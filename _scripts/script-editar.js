// Script exclusivo da página Editar Local
window.onload = function(){
    // Le possiveis parametros de url
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    // Carrega JSON para tratamento e visualização de dados
    fetch('http://localhost:3000/locais')
    .then(response => response.json())
    .then(locais => {

        locais.forEach(local => {
            if(id !== null){
                const tituloEditar = document.getElementById('titulo')
                const descricao = document.getElementById('descricao')
                const foto = document.getElementById('foto')

                if(local.id == id){
                    tituloEditar.value = local.titulo
                    descricao.value = local.descricao
                    foto.value = local.foto

                    const titulo = document.getElementById("titulo").value
                    const imgInput = document.getElementById("foto").value
                    const previewDiv = document.getElementById("img-preview")
                    previewDiv.innerHTML = `
                        <img src="${imgInput}" alt="${titulo}">
                    `                
                }
            }
        })

    })
}


function mostrarPreview(){
    const titulo = document.getElementById("titulo").value
    const imgInput = document.getElementById("foto").value
    const previewDiv = document.getElementById("img-preview")
    const img = new Image()
    img.src = imgInput

    img.onload = function(){
        previewDiv.innerHTML = `
            <img src="${imgInput}" alt="${titulo}">
        `
    }
    img.onerror = function(){
        previewDiv.innerHTML = `
            <img src="_images/system/error404.png">
        `
    }
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

function cancelarEdicao() {
    if(confirm("Descartar edição atual?")){
        window.location.href = `index.html`
    }
}