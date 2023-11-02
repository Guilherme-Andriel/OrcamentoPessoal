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


let saldoAtual = 0;
   
    const valorSalvo = localStorage.getItem('saldoAtual');
    if (valorSalvo !== null) {
      let saldo = document.getElementById('saldoAtual');
      saldo.textContent = valorSalvo;
     
    }
    
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
if(minhaConta.validarDados()){

    let quant = minhaConta.valor
    quant = quant.replace(',', '.');
    let operacao = quant[0]


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
    
    

      const valorFinal = saldoAtual.toFixed(2)
    localStorage.setItem("saldoAtual", valorFinal)

    window.location.reload()
 
    
      clearInput()
   
     modals('Registro inserido com sucesso', 'modal-header text-success', 'Os dados foram cadastrados com sucesso!', 'Voltar', 'btn btn-success')
    }
    
     }

  else {
     modals('Erro na inclusão do registro', 'modal-header text-danger', 'Erro, verifique se todos os campos foram preenchidos corretamente ou se o valor adicionado foi zero (indiferente).', 'Voltar e corrigir', 'btn btn-danger')
  }

  let meuBanco = new Banco();

  meuBanco.gravar(minhaConta)


});



