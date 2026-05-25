// Seleção dos elementos do DOM
const formulario = document.getElementById('formulario-agua');
const painelResultado = document.getElementById('painel-resultado');
const consumoAtualEl = document.getElementById('consumo-atual');
const consumoIdealEl = document.getElementById('consumo-ideal');
const mensagemImpactoEl = document.getElementById('mensagem-impacto');
const listaDicasEl = document.getElementById('lista-dicas');

// Valores médios de consumo (em litros por minuto ou por uso) baseados na Sabesp
const LITROS_POR_MINUTO_BANHO = 12; 
const LITROS_POR_MINUTO_TORNEIRA = 9;
const LITROS_POR_DESCARGA = 6;

// Valores de referência econômicos recomendados
const BANHO_IDEAL_MIN = 5;
const TORNEIRA_IDEAL_MIN = 2;

formulario.addEventListener('submit', function(event) {
    // Impede o recarregamento automático da página
    event.preventDefault();

    // Captura os valores inseridos pelo usuário
    const minBanho = parseFloat(document.getElementById('banho').value) || 0;
    const minTorneira = parseFloat(document.getElementById('torneira').value) || 0;
    const qtdDescarga = parseInt(document.getElementById('descarga').value) || 0;

    // Cálculo do Consumo Atual
    const consumoBanho = minBanho * LITROS_POR_MINUTO_BANHO;
    const consumoTorneira = minTorneira * LITROS_POR_MINUTO_TORNEIRA;
    const consumoDescarga = qtdDescarga * LITROS_POR_DESCARGA;
    const consumoTotalAtual = consumoBanho + consumoTorneira + consumoDescarga;

    // Cálculo do Consumo Ideal (Simulando hábitos sustentáveis)
    const consumoIdealBanho = Math.min(minBanho, BANHO_IDEAL_MIN) * LITROS_POR_MINUTO_BANHO;
    const consumoIdealTorneira = Math.min(minTorneira, TORNEIRA_IDEAL_MIN) * LITROS_POR_MINUTO_TORNEIRA;
    const consumoTotalIdeal = consumoIdealBanho + consumoIdealTorneira + consumoDescarga;

    // Exibe os números na tela
    consumoAtualEl.textContent = consumoTotalAtual.toFixed(0);
    consumoIdealEl.textContent = consumoTotalIdeal.toFixed(0);

    // Lógica Criativa: Avaliação do perfil do usuário e geração de dicas
    gerarDiagnostico(consumoTotalAtual, minBanho, minTorneira);

    // Revela a seção de resultados aplicando animação de exibição
    painelResultado.classList.remove('hidden');
    painelResultado.scrollIntoView({ behavior: 'smooth' });
});

function gerarDiagnostico(total, banho, torneira) {
    // Limpa dicas anteriores
    listaDicasEl.innerHTML = '';
    
    // Define o limite da ONU (110 litros diários por pessoa)
    const limiteONU = 110;

    // 1. Mensagem de Impacto Principal
    if (total > limiteONU) {
        mensagemImpactoEl.textContent = "⚠️ Atenção! Seu consumo está acima do recomendado pela ONU (110L/dia).";
        mensagemImpactoEl.parentElement.className = "alerta-container alerta-alto";
    } else {
        mensagemImpactoEl.textContent = "🌱 Parabéns! Seu consumo está dentro de uma média consciente.";
        mensagemImpactoEl.parentElement.className = "alerta-container alerta-bom";
    }

    // 2. Criação dinâmica de dicas baseadas nos erros do usuário
    if (banho > BANHO_IDEAL_MIN) {
        criarItemDica(`Reduza o banho para 5 minutos. Você economizará ${(banho - BANHO_IDEAL_MIN) * LITROS_POR_MINUTO_BANHO} litros diários.`);
    }
    if (torneira > TORNEIRA_IDEAL_MIN) {
        criarItemDica(`Feche a torneira enquanto ensaboa ou escova os dentes para poupar ${(torneira - TORNEIRA_IDEAL_MIN) * LITROS_POR_MINUTO_TORNEIRA} litros.`);
    }
    if (banho <= BANHO_IDEAL_MIN && torneira <= TORNEIRA_IDEAL_MIN) {
        criarItemDica("Seus hábitos são ótimos! Compartilhe essa ideia com seus amigos e familiares.");
    }
}

function criarItemDica(texto) {
    const li = document.createElement('li');
    li.textContent = texto;
    listaDicasEl.appendChild(li);
}
