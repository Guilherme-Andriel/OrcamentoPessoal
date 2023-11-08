import { Banco, Conta } from './banco.js';
const valorDeReceita = document.querySelector("#receita")
const valorDeDespesa = document.querySelector("#despesa")
valorDeReceita.innerHTML = localStorage.getItem('receitas') || "0.00"
valorDeDespesa.innerHTML = localStorage.getItem('despesas')|| "0.00"

const meuBanco = new Banco(); 
const lista = document.getElementById('lista')

function criarCardModal(descricao) {
    let divEscuro = document.createElement("div");
    divEscuro.classList.add("overlay");
    document.body.appendChild(divEscuro);

    let divDescricao = document.createElement("div");
    divDescricao.classList.add("card-modal");
    divDescricao.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Descrição</h5>
            <p class="card-text">${descricao}</p>
            <a href="#" class="btn btn-primary dVoltar">Voltar</a>
        </div>
    `;
    document.body.appendChild(divDescricao);

    let dVoltar = divDescricao.querySelector(".dVoltar");
    dVoltar.addEventListener("click", () => {
        divDescricao.remove();
        divEscuro.remove();
    });
}

function adicionarEventoDescricao() {
    let truncateText = document.querySelectorAll(".truncate-text");

    truncateText.forEach(function(element) {
        element.addEventListener("click", () => {
            let descricao = element.textContent;

            // Verifica se há algum card-modal aberto antes de abrir outro
            if (!document.querySelector(".card-modal")) {
                criarCardModal(descricao);
            }
        });
    });
}

function carregarLista(elemento) {
    elemento.forEach(function(d) {
        let linha = lista.insertRow();
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

        switch (d.tipo) {
            case '1':
                d.tipo = 'Alimentação';
                break;
            case '2':
                d.tipo = 'Educação';
                break;
            case '3':
                d.tipo = 'Lazer';
                break;
            case '4':
                d.tipo = 'Saúde';
                break;
            case '5':
                d.tipo = 'Transporte';
                break;
        }

        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = `<div class="truncate-text">${d.descricao}</div>`;
        linha.insertCell(3).innerHTML = d.valor;

        let btn = document.createElement("button");
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = `id_${d.id}`;

        btn.onclick = () => {
            meuBanco.remover(d.id);
            window.location.reload();
        };

        linha.insertCell(4).append(btn);
    });
}

window.onload = () => {
    let registros = meuBanco.recuperarTodosRegistros();
    carregarLista(registros);
    adicionarEventoDescricao();
};

let buscar = document.querySelector('#buscar');

buscar.addEventListener("click", () => {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let minhaConta = new Conta(ano, mes, dia, tipo, descricao, valor);
    let items = meuBanco.buscar(minhaConta);

    lista.innerHTML = '';
    carregarLista(items);
});

