const campoSenha = document.querySelector("#campo-senha");
const botoes = document.querySelectorAll(".parametro-senha__botao");
const textoQuantidade = document.querySelector(".parametro-senha__texto");

const checkMaiusculas = document.querySelector('input[name="maiusculo"]');
const checkMinusculas = document.querySelector('input[name="minusculo"]');
const checkNumeros = document.querySelector('input[name="numero"]');
const checkSimbolos = document.querySelector('input[name="simbolo"]');

const forcaDiv = document.querySelector(".forca");

let quantidadeCaracteres = 12;

// Caracteres possíveis
const caracteres = {
    maiusculo: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    minusculo: "abcdefghijklmnopqrstuvwxyz",
    numero: "0123456789",
    simbolo: "!@#$%^&*()_+[]{}<>?/|"
};

// Função para gerar senha
function gerarSenha() {
    let conjunto = "";
    let senha = "";

    if (checkMaiusculas.checked) conjunto += caracteres.maiusculo;
    if (checkMinusculas.checked) conjunto += caracteres.minusculo;
    if (checkNumeros.checked) conjunto += caracteres.numero;
    if (checkSimbolos.checked) conjunto += caracteres.simbolo;

    if (conjunto.length === 0) {
        campoSenha.value = "";
        forcaDiv.className = "forca fraca"; // Zera a força
        return;
    }

    for (let i = 0; i < quantidadeCaracteres; i++) {
        const index = Math.floor(Math.random() * conjunto.length);
        senha += conjunto[index];
    }

    campoSenha.value = senha;
    atualizarForca(senha, conjunto.length);
}

// Função para atualizar o nível de força com base na entropia estimada
function atualizarForca(senha, poolLength) {
    const entropia = senha.length * Math.log2(poolLength);
    
    if (entropia < 40) {
        forcaDiv.className = "forca fraca";
    } else if (entropia < 80) {
        forcaDiv.className = "forca media";
    } else {
        forcaDiv.className = "forca forte";
    }
}

// Botões + e -
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.textContent === "-" && quantidadeCaracteres > 4) {
            quantidadeCaracteres--;
        } else if (botao.textContent === "+" && quantidadeCaracteres < 64) {
            quantidadeCaracteres++;
        }
        textoQuantidade.textContent = quantidadeCaracteres;
        gerarSenha();
    });
});

// Gera senha ao alterar qualquer checkbox
document.querySelectorAll(".checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", gerarSenha);
});

// Gera senha ao carregar a página
window.addEventListener("load", gerarSenha);
