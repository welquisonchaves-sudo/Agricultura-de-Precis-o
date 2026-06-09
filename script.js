document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SEÇÕES EXPANSÍVEIS (ACCORDION) ---
    const accordionHeader = document.querySelector(".accordion-header");
    const accordionBody = document.querySelector(".accordion-body");
    const accordionIcon = accordionHeader.querySelector(".icon");

    accordionHeader.addEventListener("click", () => {
        const expandido = accordionHeader.getAttribute("aria-expanded") === "true";
        accordionHeader.setAttribute("aria-expanded", !expandido);
        
        if (!expandido) {
            accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
            accordionIcon.textContent = "−";
        } else {
            accordionBody.style.maxHeight = "0";
            accordionIcon.textContent = "+";
        }
    });


    // --- 2. ACESSIBILIDADE FLUTUANTE ---
    const toggleAcessibilidade = document.getElementById("toggleAcessibilidade");
    const menuAcessibilidade = document.getElementById("menuAcessibilidade");
    
    // Abre/Fecha Menu flutuante
    toggleAcessibilidade.addEventListener("click", () => {
        menuAcessibilidade.classList.toggle("ativo");
    });

    // Controle de Tamanho de Fonte
    let tamanhoAtual = 100; // percentual inicial
    document.getElementById("btnAumentarFonte").addEventListener("click", () => {
        tamanhoAtual += 10;
        document.documentElement.style.fontSize = `${tamanhoAtual}%`;
    });

    document.getElementById("btnDiminuirFonte").addEventListener("click", () => {
        if (tamanhoAtual > 70) {
            tamanhoAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoAtual}%`;
        }
    });

    // Alternador de Modo Escuro / Claro
    document.getElementById("btnModoEscuro").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });


    // --- 3. SPEECH SYNTHESIS (LEITOR DE VOZ NATIVO) ---
    const conteudoParaLer = document.getElementById("conteudoLer");
    const btnIniciarLeitura = document.getElementById("btnIniciarLeitura");
    const btnPararLeitura = document.getElementById("btnPararLeitura");
    
    let sinfoniaVoz = window.speechSynthesis;
    let leituraUtterance = null;

    btnIniciarLeitura.addEventListener("click", () => {
        // Cancela leituras anteriores ativas
        sinfoniaVoz.cancel();

        // Extrai apenas o texto limpo do container principal de conteúdo
        const textoParaLer = conteudoParaLer.innerText;
        
        leituraUtterance = new SpeechSynthesisUtterance(textoParaLer);
        leituraUtterance.lang = "pt-BR";
        leituraUtterance.rate = 1.0; // Velocidade natural

        // Altera estilo visual indicando atividade
        btnIniciarLeitura.style.backgroundColor = "var(--verde-deep)";
        btnIniciarLeitura.style.color = "white";

        leituraUtterance.onend = () => {
            btnIniciarLeitura.style.backgroundColor = "";
            btnIniciarLeitura.style.color = "";
        };

        sinfoniaVoz.speak(leituraUtterance);
    });

    btnPararLeitura.addEventListener("click", () => {
        sinfoniaVoz.cancel();
        btnIniciarLeitura.style.backgroundColor = "";
        btnIniciarLeitura.style.color = "";
    });


    // --- 4. FORMULÁRIO DE INSCRIÇÃO DA ESCOLA DO CAMPO ---
    const formInscricao = document.getElementById("formInscricao");
    formInscricao.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const responsavel = document.getElementById("campoWelquison").value;
        const escola = document.getElementById("campoEscola").value;
        const local = document.getElementById("campoPalmital").value;
        
        alert(`Inscrição Confirmada com sucesso!\n\nBem-vindo à escola do campo: ${escola}\nResponsável: ${responsavel}\nUnidade: ${local}`);
    });


    // --- 5. ÁREA DE INTERAÇÃO (COMENTÁRIOS) ---
    const formComentario = document.getElementById("formComentario");
    const txtComentario = document.getElementById("txtComentario");
    const listaComentarios = document.getElementById("listaComentarios");

    formComentario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const mensagem = txtComentario.value.trim();
        if (mensagem !== "") {
            const novoComentario = document.createElement("div");
            novoComentario.classList.add("comentario-item");
            
            // Define a data atual de postagem
            const dataAtual = new Date().toLocaleDateString("pt-BR");
            
            novoComentario.innerHTML = `
                <p><strong>Leitor Anônimo</strong> <span style="font-size:0.8rem; color:var(--lavanda-acinzen);">• em ${dataAtual}</span></p>
                <p style="margin-top: 5px; text-align: left;">${mensagem}</p>
            `;
            
            listaComentarios.prepend(novoComentario);
            txtComentario.value = "";
        }
    });
});