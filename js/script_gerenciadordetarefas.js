let listaTarefas = [];

document.addEventListener('DOMContentLoaded', () => {
    const btnAdicionar = document.getElementById('btn-adicionar');
    
    if (btnAdicionar) {
        btnAdicionar.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. Pega os valores digitados
            const tarefa = document.getElementById('tarefa').value;
            const responsavel = document.getElementById('responsavel').value;
            const descricao = document.getElementById('descricao').value;
            const data = document.getElementById('datatarefa').value;
            const prioridade = document.querySelector('input[name="prioridade"]:checked')?.value;

            if (!tarefa || !responsavel || !descricao || !data || !prioridade) {
                alert('Preencha todos os campos!');
                return;
            }

            // 2. Cria a nova tarefa
            const novaTarefa = {
                id: Date.now(),
                tarefa,
                responsavel,
                descricao,
                data,
                prioridade: prioridade.toLowerCase(), // Padroniza para caixa baixa
                status: 'aberto'
            };

            listaTarefas.push(novaTarefa);
            
            // Limpa o formulário
            document.getElementById('form').reset();

            // Atualiza a tela
            renderizar();
        });
    }
});

// Renderiza os cards e atualiza todos os contadores
function renderizar() {
    const colAberto = document.getElementById('coluna-aberto');
    const colAndamento = document.getElementById('coluna-andamento');
    const colFinalizada = document.getElementById('coluna-finalizada');

    if (colAberto) colAberto.innerHTML = '';
    if (colAndamento) colAndamento.innerHTML = '';
    if (colFinalizada) colFinalizada.innerHTML = '';

    listaTarefas.forEach(t => {
        const card = document.createElement('div');
        // Classe dinamica para pegar as cores do CSS (.baixa, .media, .alta)
        card.className = `card-resposta ${t.prioridade}`;

        // Formata a data para DD/MM/AAAA
        let dataExibicao = t.data;
        if (t.data.includes('-')) {
            const partes = t.data.split('-');
            dataExibicao = `${partes[2]}/${partes[1]}/${partes[0]}`;
        }

        // Links de status
        let botoesAcao = '';
        if (t.status === 'aberto') {
            botoesAcao = `
                <a href="javascript:void(0)" onclick="mudarStatus(${t.id}, 'andamento')">Em Andamento</a>
                <a href="javascript:void(0)" onclick="mudarStatus(${t.id}, 'finalizada')">Finalizar</a>
            `;
        } else if (t.status === 'andamento') {
            botoesAcao = `
                <a href="javascript:void(0)" onclick="mudarStatus(${t.id}, 'aberto')">Reabrir</a>
                <a href="javascript:void(0)" onclick="mudarStatus(${t.id}, 'finalizada')">Finalizar</a>
            `;
        } else if (t.status === 'finalizada') {
            botoesAcao = `
                <a href="javascript:void(0)" onclick="mudarStatus(${t.id}, 'aberto')">Reabrir</a>
                <a href="javascript:void(0)" onclick="mudarStatus(${t.id}, 'andamento')">Em Andamento</a>
            `;
        }

        card.innerHTML = `
            <h3>${t.tarefa}</h3>
            <h2>${t.responsavel}</h2>
            <p>${t.descricao}</p>
            <h2 class="txt-destaque">DATA ENTREGA TAREFA ${dataExibicao}</h2>
            <h2 class="txt-destaque">${t.prioridade.toUpperCase()}</h2>
            <div class="links-card">
                ${botoesAcao}
            </div>
            <button type="button" class="btn-remover-card" onclick="removerTarefa(${t.id})">Remover</button>
        `;

        if (t.status === 'aberto' && colAberto) colAberto.appendChild(card);
        else if (t.status === 'andamento' && colAndamento) colAndamento.appendChild(card);
        else if (t.status === 'finalizada' && colFinalizada) colFinalizada.appendChild(card);
    });

    // Atualiza contadores azuis e coloridos
    atualizarContadoresStatus();
    atualizarContadoresPrioridade();
}

window.mudarStatus = function(id, novoStatus) {
    const item = listaTarefas.find(t => t.id === id);
    if (item) {
        item.status = novoStatus;
        renderizar();
    }
};

window.removerTarefa = function(id) {
    listaTarefas = listaTarefas.filter(t => t.id !== id);
    renderizar();
};

// Atualiza a contagem dos cards azuis à direita
function atualizarContadoresStatus() {
    const qtdAberto = listaTarefas.filter(t => t.status === 'aberto').length;
    const qtdAndamento = listaTarefas.filter(t => t.status === 'andamento').length;
    const qtdFinalizada = listaTarefas.filter(t => t.status === 'finalizada').length;

    const elemAberto = document.getElementById('qtd-aberto');
    const elemAndamento = document.getElementById('qtd-andamento');
    const elemFinalizada = document.getElementById('qtd-finalizada');

    if (elemAberto) elemAberto.innerText = qtdAberto;
    if (elemAndamento) elemAndamento.innerText = qtdAndamento;
    if (elemFinalizada) elemFinalizada.innerText = qtdFinalizada;
}

// Atualiza a contagem dos blocos coloridos (Baixa, Média, Alta)
function atualizarContadoresPrioridade() {
    const qtdBaixa = listaTarefas.filter(t => t.prioridade === 'baixa').length;
    const qtdMedia = listaTarefas.filter(t => t.prioridade === 'media' || t.prioridade === 'média').length;
    const qtdAlta = listaTarefas.filter(t => t.prioridade === 'alta').length;

    const elemBaixa = document.getElementById('qtd-baixa');
    const elemMedia = document.getElementById('qtd-media');
    const elemAlta = document.getElementById('qtd-alta');

    if (elemBaixa) elemBaixa.innerText = qtdBaixa;
    if (elemMedia) elemMedia.innerText = qtdMedia;
    if (elemAlta) elemAlta.innerText = qtdAlta;
}