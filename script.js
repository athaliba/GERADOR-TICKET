const primeiraSecao = document.querySelector(".first-section");
const segundaSecao = document.querySelector(".second-section");
const formulario = document.querySelector("#form");
const nomeCompleto = document.querySelector("#full-name");
const email = document.querySelector("#email");
const usuarioGithub = document.querySelector("#github-username");
const botaoEnviar = document.querySelector("#submit-btn");
const containerBotao = document.querySelector(".btn-container");
const botaoRemover = document.querySelector(".remove-btn");
const botaoAlterar = document.querySelector(".change-btn");
const textoArrastar = document.querySelector(".drag-text");
const avisoTamanho = document.querySelector(".size-warning");
const avisosErro = document.querySelectorAll(".error-warning");
const erroArquivo = document.querySelector(".error");
const etiqueta = document.querySelector("#label");
const previewFoto = document.querySelector(".img-container");
const imagemCarregada = document.querySelector("#uploaded-img");
const iconeUpload = document.querySelector("#upload-icon");
const labelUpload = document.querySelector("#upload-label");
const valorNome = document.querySelector(".nameValue");
const valorEmail = document.querySelector(".emailValue");
const valorData = document.querySelector(".dot");
const avatar = document.querySelector(".avatar");
const nomeUsuario = document.querySelector(".name");
const valorUsuarioGithub = document.querySelector(".githubUsernameValue");
const numeroBilhete = document.querySelector(".ticket-number");

// Limite de tamanho do arquivo (5 MB)
const TAMANHO_ARQUIVO = 5 * 1024 * 1024;

// Função para verificar o tamanho do arquivo e exibir a imagem
function verificarTamanhoArquivo(arquivo) {
  if (!arquivo) return;

  if (arquivo.size > TAMANHO_ARQUIVO) {
    // Mostrar erro se o tamanho do arquivo exceder o limite
    avisoTamanho.style.display = "none";
    erroArquivo.style.display = "block";
    containerBotao.style.display = "none";
    textoArrastar.style.display = "block";
    return;
  }

  // Pré-visualizar a imagem carregada
  const leitor = new FileReader();
  leitor.readAsDataURL(arquivo);
  leitor.onload = () => {
    imagemCarregada.src = leitor.result;
    avatar.src = leitor.result;
    imagemCarregada.style.display = "block";
    iconeUpload.style.display = "none";
    containerBotao.style.display = "block";
    textoArrastar.style.display = "none";
  };
}
etiqueta.addEventListener("drop", (e) => {
  e.preventDefault();
  etiqueta.classList.remove("arrastando");
  const arquivo = e.dataTransfer.files[0];
  verificarTamanhoArquivo(arquivo); //tamanho do arquivo
});
// arrastar e solta
etiqueta.addEventListener("dragover", (e) => {
  e.preventDefault();
  etiqueta.classList.add("arrastando");
});

etiqueta.addEventListener("dragleave", (e) => {
  e.preventDefault();
  etiqueta.classList.remove("arrastando");
});



// input de upload
labelUpload.addEventListener("change", () => {
  const arquivo = labelUpload.files[0];
  verificarTamanhoArquivo(arquivo); // Validar tamanho do arquivo
});

//botão de remover
botaoRemover.addEventListener("click", () => {
  imagemCarregada.style.display = "none";
  iconeUpload.style.display = "block";
  imagemCarregada.src = "";
  containerBotao.style.display = "none";
  textoArrastar.style.display = "block";
});

// Lidar com funcionalidade do botão de alterar
botaoAlterar.addEventListener("click", () => {
  containerBotao.style.display = "none";
  textoArrastar.style.display = "block";
  // avisosErro.forEach((erro) => (erro.style.display = "none"));
  // avisosErro[0].style.display = "none"; N VAI
  labelUpload.click(); // Acionar o input de arquivo
});




// Validação  Nome
nomeCompleto.addEventListener("input", () => {
  if (nomeCompleto.value.trim() !== "") {
    avisosErro[0].style.display = "none";
    nomeCompleto.style.border = "2px solid var(--Neutral-700)";
    nomeUsuario.textContent = nomeCompleto.value;
    valorNome.textContent = nomeCompleto.value;
  }
});

// Validação Email
email.addEventListener("input", () => {
  const ValidarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (ValidarEmail.test(email.value.trim())) {
    avisosErro[1].style.display = "none";
    email.style.border = "2px solid var(--Neutral-700)";
    valorEmail.textContent = email.value;
  }
});

// Usuário do GitHub
usuarioGithub.addEventListener("input", () => {
  if (usuarioGithub.value.trim() !== "") {
    avisosErro[2].style.display = "none";
    usuarioGithub.style.border = "2px solid var(--Neutral-700)";
    valorUsuarioGithub.textContent = usuarioGithub.value;
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir o comportamento padrão de envio do formulário

  let valido = true;

  // Validar Nome 
  if (nomeCompleto.value.trim() === "") {
    avisosErro[0].style.display = "block"; // Mostrar erro
    nomeCompleto.style.border = "2px solid var(--Orange-500)";
    valido = false;
  } else {
    avisosErro[0].style.display = "none"; // Ocultar erro
    nomeCompleto.style.border = "2px solid var(--Neutral-700)";
  }

  // Validar Email
  const ValidarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!ValidarEmail.test(email.value.trim())) {
    avisosErro[1].style.display = "block"; // Mostrar erro
    email.style.border = "2px solid var(--Orange-500)";
    valido = false;
  } else {
    avisosErro[1].style.display = "none"; // Ocultar erro 
    email.style.border = "2px solid var(--Neutral-700)";
  }

  // Validar GitHub
  if (usuarioGithub.value.trim() === "") {
    avisosErro[2].style.display = "block"; // Mostrar erro
    usuarioGithub.style.border = "2px solid var(--Orange-500)";
    valido = false;
  } else {
    avisosErro[2].style.display = "none"; // Ocultar erro
    usuarioGithub.style.border = "2px solid var(--Neutral-700)";
  }

  // Se válidos, trocar de seção
  if (valido) {
    primeiraSecao.style.display = "none";
    segundaSecao.style.display = "block";
  }
});
// Gerar número do bilhete aleatório
numeroBilhete.textContent = "#" + Math.floor(Math.random() * 100000);

// Formatar data atual
const dataAtual = new Date();
const opcoesData = { day: "numeric", month: "long", year: "numeric" };
valorData.textContent = dataAtual.toLocaleDateString("pt-BR", opcoesData);