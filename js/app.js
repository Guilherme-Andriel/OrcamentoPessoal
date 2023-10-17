// ----------------- Alerta de Notação do valor ---------------------- 
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
let wrapper = null; 

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

const valorInput = document.getElementById('valor');

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

// ---------------------------------------------------------------------

//-------------- Class Despesa -----------------------------------------

class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor){
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor= valor
  }

  validarDados(){
    for(let i in this){
      if(this[i] == undefined || this[i] == '' || this[i] == null || this[i] == 0.00){
        return false;
      }
    }

     return true;
  }
}

class Bd {

  constructor(){
    let id = localStorage.getItem('id')

    if(id === null){
      localStorage.setItem('id', 0)
    }
  }

  getProximoId(){
    let proximoId = localStorage.getItem('id')

    return parseInt(proximoId)+1;
  }

  gravar(d){
    let id = this.getProximoId()

    localStorage.setItem(id, JSON.stringify(d))

    localStorage.setItem('id', id)
}
}

let bd = new Bd()

const cadastrar = document.querySelector("#adicionar");

    let saldo = document.getElementById("saldoAtual")
    let saldoAtual = 0;
    
let saldoAntigo = 0; 
let saldoModificado = 0;
cadastrar.addEventListener("click", function operacoes() {
  

  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo') 
  let descricao = document.getElementById('descricao') 
  let valor = document.getElementById('valor')


  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )

if(despesa.validarDados()){

    let quant = despesa.valor
    quant = quant.replace(',', '.');
    let operacao = quant[0]


    if(operacao !== '+' && operacao !==  '-'){
    modals('Erro na inclusão do operador - ou +', 'modal-header text-danger', 'Verifique se ao preencher o valor foi colocado - ou + corretamente.', 'Voltar e corrigir', 'btn btn-danger')
    }else{

const valorNumerico = parseFloat(quant).toFixed(2)

       saldoAntigo = saldoAtual;

      
      
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
    
    
    saldo.innerHTML = saldoAtual.toFixed(2)
    //bd.gravar(despesa)
     modals('Registro inserido com sucesso', 'modal-header text-success', 'Os dados foram cadastrados com sucesso!', 'Voltar', 'btn btn-success')
    }
    
     }

  else {
     modals('Erro na inclusão do registro', 'modal-header text-danger', 'Erro, verifique se todos os campos foram preenchidos corretamente ou se o valor adicionado foi zero (indiferente).', 'Voltar e corrigir', 'btn btn-danger')
  }


});



