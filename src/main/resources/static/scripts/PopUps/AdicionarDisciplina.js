(function() {
const popupTemplate = (isEdit = false, disciplina = null) => 
  `<div class="pop-overlay" role="dialog" aria-modal="true">
    <div class="pop-card" aria-labelledby="popTitle">
      <div class="pop-header">
        <h2 id="popTitle" class="pop-title">${isEdit ? 'Editar Disciplina' : 'Cadastrar Disciplina'}</h2>
        <p class="pop-subtitle">${isEdit ? 'Atualize as informações da disciplina' : 'Cadastre uma nova disciplina para controle de cenários'}</p>
      </div>
      <div class="pop-body">
        <div class="pop-notification-container" id="pop-error-container">
          <div class="pop-notification-banner">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span id="pop-error-text">Por favor, preencha todos os campos obrigatórios.</span>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="nome-disciplina">Nome da Disciplina:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="nome-disciplina" placeholder="Digite o Nome da Disciplina" value="${disciplina ? disciplina.nome : ''}" />
            <i class="fa-solid fa-chalkboard-teacher pop-input-icon"></i>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="carga-disciplina">Carga Horária (horas):<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="number" id="carga-disciplina" placeholder="Digite a Carga Horária (ex: 60)" value="${disciplina ? disciplina.cargaHoraria : ''}" />
            <i class="fa-solid fa-clock pop-input-icon"></i>
          </div>
        </div>

        <div class="pop-form-group">
          <label class="pop-label" for="nome-responsavel">Professor Orientador:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="nome-responsavel" placeholder="Digite o nome do Professor" value="${disciplina && disciplina.responsavel ? disciplina.responsavel.nome : ''}" />
            <i class="fa-solid fa-user pop-input-icon"></i>
          </div>
        </div>

        <div class="pop-form-group">
          <label class="pop-label" for="email-responsavel">Email do Orientador:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="email" id="email-responsavel" placeholder="Digite o email do Professor" value="${disciplina && disciplina.responsavel ? disciplina.responsavel.email : ''}" />
            <i class="fa-solid fa-envelope pop-input-icon"></i>
          </div>
        </div>

        <div class="pop-form-group">
          <label class="pop-label" for="status-disciplina">Status:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <select class="pop-input" id="status-disciplina">
              <option value="Ativa" ${disciplina && !disciplina.deleted ? 'selected' : (!disciplina ? 'selected' : '')}>Ativa</option>
              <option value="Inativa" ${disciplina && disciplina.deleted ? 'selected' : ''}>Inativa</option>
            </select>
            <i class="fa-solid fa-circle-info pop-input-icon"></i>
          </div>
        </div>
      </div>
      <div class="pop-footer">
        <button id="salvar" class="pop-btn pop-btn-save"><span class="icon"><i class="fa-solid fa-check"></i></span> SALVAR</button>
        <button id="voltar" class="pop-btn pop-btn-back"><span class="icon"><i class="fa-solid fa-arrow-left"></i></span> VOLTAR</button>
      </div>
    </div>
  </div>`;

function showPopup(isEdit = false, disciplina = null, onSave = null) {
  const template = document.createElement('template');
  template.innerHTML = popupTemplate(isEdit, disciplina).trim();
  const overlay = template.content.firstChild;

  const close = () => overlay.remove();
  overlay.querySelector('#voltar').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
  document.body.appendChild(overlay);

  const showError = (message) => {
    const errorContainer = overlay.querySelector('#pop-error-container');
    const errorText = overlay.querySelector('#pop-error-text');
    errorText.textContent = message;
    errorContainer.classList.add('active');
    overlay.querySelector('.pop-body').scrollTop = 0;
  };

  const clearError = () => {
    const errorContainer = overlay.querySelector('#pop-error-container');
    errorContainer.classList.remove('active');
  };

  const salvarButton = overlay.querySelector('#salvar');
  salvarButton.addEventListener('click', async () => {
    clearError();

    const nome = overlay.querySelector('#nome-disciplina').value.trim();
    const cargaHoraria = overlay.querySelector('#carga-disciplina').value.trim();
    const responsavelNome = overlay.querySelector('#nome-responsavel').value.trim();
    const responsavelEmail = overlay.querySelector('#email-responsavel').value.trim();
    const status = overlay.querySelector('#status-disciplina').value;

    if (!nome || !cargaHoraria || !responsavelNome || !responsavelEmail || !status) {
      showError('Todos os campos marcados com * são de preenchimento obrigatório.');
      return;
    }

    const token = localStorage.getItem('jwt'); 
    const endpoint = isEdit ? `/disciplina/${disciplina.id}` : '/disciplina';
    const method = isEdit ? 'PUT' : 'POST';
    const deleted = status === 'Inativa';

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ 
          nome, 
          cargaHoraria: parseInt(cargaHoraria), 
          responsavelNome, 
          responsavelEmail, 
          deleted 
        })
      });

      if (response.ok) {
        alert(isEdit ? 'Disciplina atualizada com sucesso!' : 'Disciplina cadastrada com sucesso!');
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
        if (onSave) onSave();
      } else {
        const errorText = await response.text();
        showError('Erro ao salvar disciplina: ' + (errorText || response.statusText));
      }
    } catch (err) {
      console.error(err);
      showError('Erro de conexão ao salvar disciplina.');
    }
  });
}

window.showPopupDisciplina = showPopup;

document.body.addEventListener('click', (e) => {
  if (e.target.closest('#openPopup')) {
    const path = window.location.pathname;
    if (path === '/disciplinas') {
      if (window.carregarDisciplinas) {
        showPopup(false, null, window.carregarDisciplinas);
      } else {
        showPopup(false, null, () => window.location.reload());
      }
    }
  }
});
})();
