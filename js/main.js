import { Banco, Conta } from './banco.js';
// ----------------- Alerta de Notação do valor ---------------------- 
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const valorInput = document.getElementById('valor');

let ano = document.getElementById('ano')
let mes = document.getElementById('mes')
let dia = document.getElementById('dia')
let tipo = document.getElementById('tipo') 
let descricao = document.getElementById('descricao') 
let valor = document.getElementById('valor')

let wrapper = null; 

const adicionar = document.querySelector("#adicionar");

let saldo = document.getElementById("saldoAtual")


let saldoAtual = 0;
    
let saldoAntigo = 0; 
let saldoModificado = 0;

const appendAlert = (message, type) => {

if(wrapper){
  return;
}

  wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" id="close"></button>',
    '</div>'

  ].join('')

  alertPlaceholder.append(wrapper)

  const close = document.querySelector('#close');

close.addEventListener('click', () => {
  alertPlaceholder.remove();
  wrapper=null;
});

}



valorInput.addEventListener("focus", () => {
   appendAlert('Atenção:  -Valor (despesa) ou +Valor (ganho)', 'warning')

});


function modals(titulo, div, conteudo, btn1, btn2){
    document.getElementById('modal_titulo').innerHTML = `${titulo}`
    document.getElementById('modal_titulo_div').className = `${div}`
    document.getElementById('modal_conteudo').innerHTML = `${conteudo}`
    document.getElementById('modal_btn').innerHTML = `${btn1}`
    document.getElementById('modal_btn').className = `${btn2}`

    //dialog de erro
    $('#modalRegistra').modal('show')
}

function verificarLoalStorageSaldo(){

  document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há um valor de saldo salvo no localStorage
    if (localStorage.getItem('saldoAtual')) {
        saldoAtual = parseFloat(localStorage.getItem('saldoAtual'));
        saldo.innerHTML = saldoAtual.toFixed(2); // Atualiza a exibição do saldo na página
    }
    
  });
}

// ---------------------------------------------------------------------

//-------------- Class Despesa -----------------------------------------


 adicionar.addEventListener("click", function operacoes() {

  let minhaConta = new Conta(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )


//Validações de entradas e Cálculos 
if(minhaConta.validarDados() == 1){

    let quant = minhaConta.valor
    quant = quant.replace(',', '.');
    let operacao = quant[0]

    minhaConta.receita()
    minhaConta.despesa()


    if(operacao !== '+' && operacao !==  '-'){
    modals('Erro na inclusão do operador - ou +', 'modal-header text-danger', 'Verifique se ao preencher o valor foi colocado - ou + corretamente.', 'Voltar e corrigir', 'btn btn-danger')
    }else{

const valorNumerico = parseFloat(quant).toFixed(2)

       saldoAntigo = saldoAtual;

function clearInput(){
  ano.value = ''
  mes.value = ''
  tipo.value = ''
  dia.value = ''
  descricao.value = ''
  valor.value = ''
}
      
    if(operacao === '+'){
      saldoAtual =  saldoAtual + Math.abs(valorNumerico)
     
      
    }else if(operacao === '-'){
      
      if(saldoAntigo <= 0){
        modals('Saldo insuficiente!', 'modal-header text-danger', 'Você não tem dinheiro na sua conta para fazer essa operação.', 'Voltar', 'btn btn-danger')

        return -1;
      }else{

        saldoModificado = saldoAntigo - Math.abs(valorNumerico);
        
        
     
       if(saldoModificado < 0){
        modals('Saldo insuficiente!', 'modal-header text-danger', 'Você não tem dinheiro compatível na sua conta para fazer essa operação.', 'Voltar', 'btn btn-danger')

        return -1;
      }

       saldoAtual = saldoModificado
      }
  
    } 
    
   
    let v = saldoAtual.toFixed(2)
    localStorage.setItem('saldoAtual', v)
    saldo.innerHTML = localStorage.getItem('saldoAtual')


      clearInput()
   
     modals('Registro inserido com sucesso', 'modal-header text-success', 'Os dados foram cadastrados com sucesso!', 'Voltar', 'btn btn-success')
    }


    let meuBanco = new Banco();

  meuBanco.gravar(minhaConta)
    
     }
     else if(minhaConta.validarDados() == 2){
      modals('Erro na inclusão do registro DIA', 'modal-header text-danger', 'O valor DIA é somente um número de 1 à 31. Verifique.', 'Voltar e corrigir', 'btn btn-danger')

     } else if(minhaConta.validarDados() == 3){
      modals('Erro na inclusão do registro VALOR', 'modal-header text-danger', 'O valor adicionado foi zero, logo indiferente.', 'Voltar e corrigir', 'btn btn-danger')
     }

  else {
     modals('Erro na inclusão do registro', 'modal-header text-danger', 'Erro, verifique se todos os campos foram preenchidos corretamente.', 'Voltar e corrigir', 'btn btn-danger')
  }


});

verificarLoalStorageSaldo()


