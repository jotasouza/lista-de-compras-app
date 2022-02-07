/**
 * @Author Jonatas Souza da Silva
 * @Reviewer Weriks
 * @Year 2022
 */

const getDataBase = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const setDataBase = (dataBase) => localStorage.setItem('todoList', JSON.stringify(dataBase))

const button = document.querySelector('.button__clean-list')
button.addEventListener('click', function(){
    localStorage.clear()
    render()
})

//FUNÇÃO QUE CRIA OS ELEMENTOS
const createItem = (itemDB, itemIndex) => {
    
    const item          = document.createElement('label')
    const inputCheckbox = document.createElement('input')
    const div           = document.createElement('div')
    const inputButton   = document.createElement('input')

  
    inputCheckbox.type           = 'checkbox' 
    inputCheckbox.dataset.index  = `${itemIndex}`

    
    inputCheckbox.checked        = itemDB.checked || false
     
    inputButton.type             = 'button'
    inputButton.value            = 'X'
    inputButton.dataset.index    = `${itemIndex}`
   
   
    div.innerText                = ` ${itemDB.itemList}`

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
   const dataBase = getDataBase()
   dataBase.forEach((itemDB, index)=> createItem(itemDB, index))
}

//FUNÇÃO QUE ADICIONA UM NOVO ITEM A LISTA
const addItem   = (event) => {
    const key   = event.key
    if(key === 'Enter'){
        const dataBase = getDataBase()
        dataBase.push({'itemList': `${inputItem.value}`, 'checked': inputItem.checked})
        setDataBase(dataBase)
        render()
        cleanInputItem()
    }
}
//PEGA O ELEMENTO DA TELA E ADICIONA O EVENTO COM A CHAMADA DA FUNÇÃO
const inputItem      = document.getElementById('enterItem')
inputItem.addEventListener('keypress', addItem)

//FUNÇÃO QUE LIMPA O CAMPO DE INSERIR
const cleanInputItem = () => {
    inputItem.value  = ''
}

//FUNÇÃO QUE DELETA ITEM DA LISTA
const deleteItem = (indexElement) => {
   const dataBase = getDataBase()
   dataBase.splice(indexElement, 1)
   setDataBase(dataBase)
   render()
}

//FUNÇÃO QUE ALTERA O STATUS DO ITEM
const alterStatusItem = (indexElement) => {
    const dataBase = getDataBase()
    dataBase[indexElement].checked = !dataBase[indexElement].checked 
    setDataBase(dataBase)
    render()
}

//PEGA O CLICK NO ELEMENTO
const clickItem   = (event) => {
    const element = event.target
    let index     = element.dataset.index

    if(element.type === 'button'){
        deleteItem(index)
    }else if(element.type === 'checkbox'){
        alterStatusItem(index)
    }
}
const todoList = document.querySelector('.todo__list')
todoList.addEventListener('click', clickItem)

render()