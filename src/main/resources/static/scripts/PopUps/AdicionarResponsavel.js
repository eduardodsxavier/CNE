(function() {
const popupTemplate = (isEdit = false, resp = null) => 
  `<div class="pop-overlay" role="dialog" aria-modal="true">
    <div class="pop-card" aria-labelledby="popTitle">
      <div class="pop-header">
        <h2 id="popTitle" class="pop-title">${isEdit ? 'Editar Responsável TCE' : 'Cadastrar Responsável TCE'}</h2>
        <p class="pop-subtitle">${isEdit ? 'Atualize as informações do responsável' : 'Cadastre um novo responsável do termo de compromisso de estágio'}</p>
      </div>
      <div class="pop-body">
        <div class="pop-notification-container" id="pop-error-container">
          <div class="pop-notification-banner">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span id="pop-error-text">Por favor, preencha todos os campos obrigatórios.</span>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="nome-tce">Nome:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="nome-tce" placeholder="Digite o Nome Completo" value="${resp ? resp.nome : ''}" />
            <i class="fa-solid fa-user pop-input-icon"></i>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="cargo-tce">Cargo:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="cargo-tce" placeholder="Digite o Cargo (ex: Coordenador de Estágio)" value="${resp ? resp.cargo : ''}" />
            <i class="fa-solid fa-briefcase pop-input-icon"></i>
          </div>
        </div>

        <div class="pop-form-group">
          <label class="pop-label" for="email-tce">Email:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="email" id="email-tce" placeholder="Digite o Email" value="${resp ? resp.email : ''}" />
            <i class="fa-solid fa-envelope pop-input-icon"></i>
          </div>
        </div>

        <div class="pop-form-group">
          <label class="pop-label" for="telefone-tce">Telefone:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="telefone-tce" placeholder="Digite o Telefone (ex: (61) 99999-9999)" value="${resp ? resp.telefone : ''}" />
            <i class="fa-solid fa-phone pop-input-icon"></i>
          </div>
        </div>

        <div class="pop-form-group">
          <label class="pop-label" for="status-tce">Status:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <select class="pop-input" id="status-tce">
              <option value="Ativo" ${resp && !resp.deleted ? 'selected' : (!resp ? 'selected' : '')}>Ativo</option>
              <option value="Inativo" ${resp && resp.deleted ? 'selected' : ''}>Inativo</option>
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

function showPopup(isEdit = false, resp = null, onSave = null) {
  const template = document.createElement('template');
  template.innerHTML = popupTemplate(isEdit, resp).trim();
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

    const nome = overlay.querySelector('#nome-tce').value.trim();
    const cargo = overlay.querySelector('#cargo-tce').value.trim();
    const email = overlay.querySelector('#email-tce').value.trim();
    const telefone = overlay.querySelector('#telefone-tce').value.trim();
    const status = overlay.querySelector('#status-tce').value;

    if (!nome || !cargo || !email || !telefone || !status) {
      showError('Todos os campos marcados com * são de preenchimento obrigatório.');
      return;
    }

    const token = localStorage.getItem('jwt'); 
    const endpoint = isEdit ? `/tce/${resp.id}` : '/tce';
    const method = isEdit ? 'PUT' : 'POST';
    const deleted = status === 'Inativo';

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ 
          id: resp ? resp.id : null,
          nome, 
          cargo,
          email, 
          telefone, 
          deleted 
        })
      });

      if (response.ok) {
        alert(isEdit ? 'Responsável TCE atualizado com sucesso!' : 'Responsável TCE cadastrado com sucesso!');
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
        if (onSave) onSave();
      } else {
        const errorText = await response.text();
        showError('Erro ao salvar responsável TCE: ' + (errorText || response.statusText));
      }
    } catch (err) {
      console.error(err);
      showError('Erro de conexão ao salvar responsável TCE.');
    }
  });
}

window.showPopupResponsavel = showPopup;

document.body.addEventListener('click', (e) => {
  if (e.target.closest('#openPopup')) {
    const path = window.location.pathname;
    if (path === '/responsaveis') {
      if (window.carregarResponsaveis) {
        showPopup(false, null, window.carregarResponsaveis);
      } else {
        showPopup(false, null, () => window.location.reload());
      }
    }
  }
});
})();
