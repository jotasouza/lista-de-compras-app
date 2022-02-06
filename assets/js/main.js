let dataBase = []

//FUNÇÃO QUE CRIA OS ELEMENTOS
const createItem = (itemList) => {
    const item          = document.createElement('label')
    const inputCheckbox = document.createElement('input')
    const div           = document.createElement('div')
    const inputButton   = document.createElement('input')

    inputButton.type    = 'button'
    inputCheckbox.type  = 'checkbox' 
    inputButton.value   = 'X'
    div.innerText       = `${itemList}`

    item.classList.add('todo__item')
    item.appendChild(inputCheckbox)
    item.appendChild(div)
    item.appendChild(inputButton)

    document.querySelector('.todo__list').appendChild(item)
}

//FUNÇÃO QUE LIMPA A LISTA, SE HOUVER CHAMADAS REPETIDAS
const cleanList = () => {
    const todoList = document.querySelector('.todo__list')
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

//FUNÇÃO QUE MOSTRA A LISTA DE ITENS NA TELA
const render    = () => {
   cleanList()
   dataBase.forEach(item => createItem(item.itemList))
}

//FUNÇÃO QUE ADICIONA UM NOVO ITEM A LISTA
const addItem   = (event) => {
    const key = event.key
    if(key === 'Enter'){
        dataBase.push({'itemList': `${inputItem.value}`})
        render()
        cleanInputItem()
    }
}

const inputItem         = document.getElementById('enterItem')
inputItem.addEventListener('keypress', addItem)

//FUNÇÃO QUE LIMPA O CAMPO DE INSERIR
const cleanInputItem = () => {
    inputItem.value = ''
}
