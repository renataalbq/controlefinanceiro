const transactionUl = document.querySelector('#transactions');
const receitasDisplay = document.querySelector('#money-plus')
const despesasDisplay = document.querySelector('#money-minus')
const saldo = document.querySelector('#saldo');

const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');


let movimentacoes = [
    { id: 1, name: 'Condominio', amount: -200},

]

const remove = ID => {
    movimentacoes = movimentacoes.filter(transaction => transaction.id !== ID)
    init()
}

const addTransaction = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const classeCSS = transaction.amount < 0 ? 'minus' : 'plus'
    const li = document.createElement('li')

    li.classList.add(classeCSS)
    li.innerHTML = `
        ${transaction.name} 
        <span> ${operator} R$ ${Math.abs(transaction.amount)} </span>
        <button class="delete-btn"onClick="remove(${transaction.id})">x</button>
    `
    transactionUl.appendChild(li)
   
}

const updateSaldo = () => {
    const transactionsAmount = movimentacoes
        .map(transaction => transaction.amount)
    const total = transactionsAmount
        .reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const receitas = transactionsAmount
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    const despesas = Math.abs(transactionsAmount
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)).toFixed(2)
    
    saldo.textContent = `R$ ${total}`
    receitasDisplay.textContent = `R$ ${receitas}`
    despesasDisplay.textContent = `R$ ${despesas}`
}

const init = () => {
    transactionUl.innerHTML = ''
    movimentacoes.forEach(addTransaction)
    updateSaldo()
}

init()

const gerarID = () => Math.round(Math.random()*1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionAmount === '' ){
        alert('Os campos não podem estar vazios!')
        return
    }

    const transaction = { 
        id: gerarID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    }

    movimentacoes.push(transaction)
    init()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})

