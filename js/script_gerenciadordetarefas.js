//Const botões
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');

//Clicar no Botão
btnAdicionar.addEventListener('click', function (){
    //Pegando os valores preenchidos no formulario
    const tarefa = document.getElementById('tarefa').value;
    const responsavel = document.getElementById('responsavel').value;
    const descricao = document.getElementById('descricao').value;
    const datatarefa = document.getElementById('datatarefa').value;

    const prioridadeSelecionada = document.querySelector('input[name="prioridade"]:checked');
    const prioridade = prioridadeSelecionada ? prioridadeSelecionada.value : 'Não Definida';

    //Não deixar de adicionar a tarefa sem título
    if (tarefa.trim() === '') {
        alert('Por favor, digite o nome da tarefa!');
        return
    }
     //Usando a estrutura HTML
     const novaTarefa = `
        <div class="item-tarefa">
            <h4>${tarefa}</h4>
            <p><strong>Responsável:</strong> ${responsavel}</p>
            <p><strong>Descrição:</strong> ${descricao}</p>
            <p><strong>Prioridade:</strong> ${prioridade}</p>
            <p><strong>Data:</strong> ${data}</p>
        </div>
    `;

    // Insirindo novo card na section #lista tarefas
    listaTarefas.innerHTML += novaTarefa;

    // Limpando o campo do formulario
    document.getElementById('form').reset();

})