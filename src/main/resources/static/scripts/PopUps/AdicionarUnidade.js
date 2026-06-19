const popupTemplate = (isEdit = false, unidade = null) => 
  `<div class="pop-overlay" role="dialog" aria-modal="true">
    <div class="pop-card" aria-labelledby="popTitle">
      <div class="pop-header">
        <h2 id="popTitle" class="pop-title">${isEdit ? 'Editar Unidade' : 'Cadastrar Unidade'}</h2>
        <p class="pop-subtitle">${isEdit ? 'Atualize as informações da unidade' : 'Cadastre uma nova unidade para controle de cenários'}</p>
      </div>
      <div class="pop-body">
        <div class="pop-notification-container" id="pop-error-container">
          <div class="pop-notification-banner">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span id="pop-error-text">Por favor, preencha todos os campos obrigatórios.</span>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="nome-unidade">Nome da Unidade:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="nome-unidade" placeholder="Digite o Nome da Unidade" value="${unidade ? unidade.nome : ''}" />
            <i class="fa-solid fa-building pop-input-icon"></i>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="sigla-unidade">Sigla:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="sigla-unidade" placeholder="Digite a Sigla" value="${unidade ? unidade.sigla : ''}" />
            <i class="fa-solid fa-tag pop-input-icon"></i>
          </div>
        </div>

        <div class="pop-form-group pop-form-group-inline">
          <label class="pop-label">Interno</label>
          <label class="pop-switch">
            <input type="checkbox" id="interno-unidade" ${unidade && unidade.interno ? 'checked' : ''} />
            <span class="pop-slider"></span>
          </label>
        </div>
        
        <div class="pop-form-group pop-form-group-inline">
          <label class="pop-label">Convênio Público</label>
          <label class="pop-switch">
            <input type="checkbox" id="convenio-unidade" ${unidade && unidade.convenioPublico ? 'checked' : ''} />
            <span class="pop-slider"></span>
          </label>
        </div>

        <div class="pop-form-group">
          <label class="pop-label" for="status-unidade">Status:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <select class="pop-input" id="status-unidade">
              <option value="Ativa" ${unidade && !unidade.deleted ? 'selected' : (!unidade ? 'selected' : '')}>Ativa</option>
              <option value="Inativa" ${unidade && unidade.deleted ? 'selected' : ''}>Inativa</option>
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

function showPopup(isEdit = false, unidade = null, onSave = null) {
  const template = document.createElement('template');
  template.innerHTML = popupTemplate(isEdit, unidade).trim();
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

    const nome = overlay.querySelector('#nome-unidade').value.trim();
    const sigla = overlay.querySelector('#sigla-unidade').value.trim();
    const interno = overlay.querySelector('#interno-unidade').checked;
    const convenioPublico = overlay.querySelector('#convenio-unidade').checked;
    const status = overlay.querySelector('#status-unidade').value;

    if (!nome || !sigla || !status) {
      showError('Todos os campos marcados com * são de preenchimento obrigatório.');
      return;
    }

    const token = localStorage.getItem('jwt'); 
    const endpoint = isEdit ? `/unidade/${unidade.id}` : '/unidade';
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
          id: unidade ? unidade.id : null,
          nome, 
          sigla, 
          interno, 
          convenioPublico, 
          deleted 
        })
      });

      if (response.ok) {
        alert(isEdit ? 'Unidade atualizada com sucesso!' : 'Unidade cadastrada com sucesso!');
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
        if (onSave) onSave();
      } else {
        const errorText = await response.text();
        showError('Erro ao salvar unidade: ' + (errorText || response.statusText));
      }
    } catch (err) {
      console.error(err);
      showError('Erro de conexão ao salvar unidade.');
    }
  });
}

window.showPopup = showPopup;

document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openPopup');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      if (window.carregarUnidades) {
        showPopup(false, null, window.carregarUnidades);
      } else {
        showPopup(false, null, () => window.location.reload());
      }
    });
  }
});
