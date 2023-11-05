import { Banco, Conta } from './banco.js';
const valorDeReceita = document.querySelector("#receita")
const valorDeDespesa = document.querySelector("#despesa")
valorDeReceita.innerHTML = localStorage.getItem('receitas') || "0.00"
valorDeDespesa.innerHTML = localStorage.getItem('despesas')|| "0.00"

const meuBanco = new Banco(); 
const lista = document.getElementById('lista')

function carregarLista(elemento){

    elemento.forEach(function(d){

             /* <tr>
                <td>15/03/2018</td>
                <td>Alimentação</td>
                <td>compras do mês</td>
                <td>444.75</td>
              </tr> */
        
        // método para criar as linhas (tr) de acordo com a quantidade de items no array
        let linha = lista.insertRow()

         // método para criar as colunas (td) de acordo com as linhas (cada linha tem com 4 colunas)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //criar botão de exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_${d.id}` // criação do id pelo indice no localStorage

        btn.onclick = () =>{
            meuBanco.remover(d.id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)


    })
}

window.onload = () => {
  let registros = meuBanco.recuperarTodosRegistros();
carregarLista(registros)

};


let buscar = document.querySelector('#buscar')

buscar.addEventListener("click", () =>{
    
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value 
    let descricao = document.getElementById('descricao').value 
    let valor = document.getElementById('valor').value


    let minhaConta = new Conta(ano, mes, dia, tipo, descricao, valor)

    let items = meuBanco.buscar(minhaConta)

   
    lista.innerHTML = '' //eliminando os items não filtrados

   carregarLista(items)

})