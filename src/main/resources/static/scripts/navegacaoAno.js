// Seleciona os elementos do HTML
  const botaoAnterior = document.getElementById('btn-anterior');
  const botaoProximo = document.getElementById('btn-proximo');
  const anoExibido = document.getElementById('ano-exibido');

  botaoProximo.addEventListener('click', () => {

    let anoAtual = parseInt(anoExibido.textContent);

    anoAtual++;

    anoExibido.textContent = anoAtual;
  });


  botaoAnterior.addEventListener('click', () => {

    let anoAtual = parseInt(anoExibido.textContent);

    anoAtual--;

    anoExibido.textContent = anoAtual;
  });
