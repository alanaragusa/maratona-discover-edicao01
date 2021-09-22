const Modal = {
  open(){
    //abrir modal - adicional classe active ao modal
    document
      .querySelector('.modal-overlay')
      .classList.add('active')
  },
  close(){
    //fechar o modal - remover a classe active no modal
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  }
}

const transactions = [
  {
    description:'Luz',
    amount: -50000, //valor será formatado posteriormente
    date: '23/01/2021'
  }, {
    description:'Website',
    amount: 500000, 
    date: '23/01/2021'
  }, {
    description:'Internet',
    amount: -20000, 
    date: '23/01/2021'
  }, {
    description:'App',
    amount: 200000, 
    date: '23/01/2021'
  }
]

const Transaction = {
  //novos lançamentos
  all: transactions, 

  add(transaction){
    Transaction.all.push(transaction)

    App.reload()
  },
  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },
  incomes(){
    //somar as entradas - pegar todas as transações. Para cada transaçao, se ela for maior que zero, somar a uma variável e retornar
    let income = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount > 0){
        income += transaction.amount;
      }
    })
    return income;
  },
  expenses(){
    //somar as saídas - mesmo processo do incomes
    let expense = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0){
        expense += transaction.amount;
      }
    })
    return expense;
  },
  total(){
    //entradas - saídas
    return Transaction.incomes() + Transaction.expenses()
  }
}

//Substituir os dados do HTML com os dados do JS
const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index){
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = ` 
      <tr>
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg " alt="Remover transação">
          </td>
      </tr>
    `
    return html
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  }
}

const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : ""
    value = String(value).replace(/\D/g, "")
    value = Number(value)/100
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  }
}

const Form = {
  submit(event){
    event.preventDefault()

  }
}

const App = {
  init() {

    Transaction.all.forEach(DOM.addTransaction)
    DOM.updateBalance()
    
  },
  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init()

