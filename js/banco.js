



export class Conta {
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
        if(this[i] == undefined || this[i] == '' || this[i] == null){
          return false;
        }
      }
      const regex = /^([1-9]|[12]\d|3[01])$|^0[1-9]$/ //apenas numeros de 1 a 31
      if(!this.dia.match(regex)){
        return 2
      }
      if(this.valor == 0.00){
        return 3
      }
  
       return 1;
    }

    receita(){

      if(this.valor > 0){
          let receitas = parseFloat(localStorage.getItem('receitas') || 0);
          receitas  += parseFloat(this.valor)
          localStorage.setItem('receitas', receitas.toFixed(2))
      }
    }

    despesa(){

      if(this.valor < 0){
          let despesas = parseFloat(localStorage.getItem('despesas') || 0);
          despesas  -= parseFloat(this.valor) * -1
          localStorage.setItem('despesas', despesas.toFixed(2))

        
      }
    }
  
  
    
  }


export class Banco{

    constructor(){
      let id = localStorage.getItem('id')
  
      if(id === null){ 
        localStorage.setItem('id', 0) //Modificando valor inical do id para 0, como o objetivo criar mais de uma gravação no localStorage
        
      }
    }
  
    getProximoId(){
      let id = localStorage.getItem('id'); // id já sendo zero
  
      return parseInt(id)+1 //somando 1 para ir modificando o valor do indice do id
    }
  
    gravar(g){
      let novoId = this.getProximoId() //variavel que possui o retorno do método como um novo valor do id
       localStorage.setItem(novoId, JSON.stringify(g)) //transformando um objeto literal em JASON e referenciando o conteudo JASON ao indice id
    
      localStorage.setItem('id', novoId); //novo valor do id atualizado
    }
  
    recuperarTodosRegistros(){

    let registros = Array()

      let id = localStorage.getItem('id')

      for(let i = 1; i <= id; i++){
        let item = JSON.parse(localStorage.getItem(i)) //Acessando cada item da lista e Transformando de JSON para obj literal

        // Se existe items que foram removidos (null), neste caso é feito um pulo para o proximo item que será adicionado ao array.

        if(item === null){
            continue
        }
        item.id = i //criando atributo id para cada item (diferenciando cada na deletação)
        registros.push(item)
      }

      return registros;
    }

    buscar(item){
        
        let registrosFiltrados  = this.recuperarTodosRegistros()

        //ano
        if(item.ano != ''){      
            registrosFiltrados = registrosFiltrados.filter(r => r.ano == item.ano)
        }
        //mes
        if(item.mes != ''){      
            registrosFiltrados = registrosFiltrados.filter(r => r.mes == item.mes)
        }
         //dia
         if(item.dia != ''){      
            registrosFiltrados = registrosFiltrados.filter(r => r.dia == item.dia)
        }
         //tipo
         if(item.tipo != ''){      
            registrosFiltrados = registrosFiltrados.filter(r => r.tipo == item.tipo)
        }
         //descricao
         if(item.descricao != ''){      
            registrosFiltrados = registrosFiltrados.filter(r => r.descricao == item.descricao)
        }
         //valor
         if(item.valor != ''){      
            registrosFiltrados = registrosFiltrados.filter(r => r.valor == item.valor)
        }

        return registrosFiltrados
    }

    remover(id){
        localStorage.removeItem(id)
    }
  
  }