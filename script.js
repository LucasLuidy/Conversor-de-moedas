const apiKey = '25d9812b646890949c7e52b0';
const moedaOrigem = document.getElementById('from-currency');
const moedaDestino = document.getElementById('to-currency');
const valorEntrada = document.getElementById('amount');
const resultado = document.getElementById('result');
const botaoConverter = document.getElementById('convert-btn');
const swapButton = document.getElementById('swap-currencies');
const lastUpdatedSpan = document.getElementById('last-updated-time');

botaoConverter.addEventListener('click', async (event) => {
    event.preventDefault();
    await converterMoeda();
});

async function converterMoeda() {
    try {
        const resposta = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${moedaOrigem.value}/${moedaDestino.value}`);
        const infoFinal = await resposta.json();
        const taxa = infoFinal.conversion_rate;
        const valorConvertido = parseFloat(valorEntrada.value) * taxa;
        resultado.innerHTML = `<span id="from-amount">${valorEntrada.value} ${moedaOrigem.value}</span> = <span id="to-amount">${valorConvertido.toFixed(2)} ${moedaDestino.value}</span>`;
        updateLastUpdated();
    } catch (error) {
        console.error('Erro ao converter moeda:', error);
        resultado.textContent = 'Erro ao converter moeda. Por favor, tente novamente.';
    }
}

swapButton.addEventListener('click', () => {
    const temp = moedaOrigem.value;
    moedaOrigem.value = moedaDestino.value;
    moedaDestino.value = temp;
    converterMoeda();
});

function updateLastUpdated() {
    const now = new Date();
    lastUpdatedSpan.textContent = `Há ${now.getMinutes()} minutos`;
}

// Inicializar a última atualização
updateLastUpdated();

// Atualizar o tempo da última atualização a cada minuto
setInterval(updateLastUpdated, 60000);

// Converter automaticamente quando o usuário muda as moedas ou o valor
valorEntrada.addEventListener('input', converterMoeda);
moedaOrigem.addEventListener('change', converterMoeda);
moedaDestino.addEventListener('change', converterMoeda);

// Converter inicialmente quando a página carrega
document.addEventListener('DOMContentLoaded', converterMoeda);