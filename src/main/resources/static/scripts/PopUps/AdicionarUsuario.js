const popupTemplate = (isEdit = false, user = null) => 
  `<div class="pop-overlay" role="dialog" aria-modal="true">
    <div class="pop-card" aria-labelledby="popTitle">
      <div class="pop-header">
        <h2 id="popTitle" class="pop-title">${isEdit ? 'Editar Usuário' : 'Cadastrar Usuário'}</h2>
        <p class="pop-subtitle">${isEdit ? 'Atualize as credenciais e o cargo do usuário' : 'Cadastre um novo usuário para acesso ao sistema'}</p>
      </div>
      <div class="pop-body">
        <div class="pop-form-group">
          <label class="pop-label" for="matricula">Matrícula:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="matricula" placeholder="Matrícula" ${isEdit ? 'disabled' : ''} value="${user ? user.RA : ''}" />
            <i class="fa-solid fa-id-card pop-input-icon"></i>
          </div>
        </div>
        <div class="pop-form-group">
          <label class="pop-label" for="nome">Nome:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="nome" placeholder="Nome" value="${user ? user.name : ''}" />
            <i class="fa-solid fa-user pop-input-icon"></i>
          </div>
        </div>
        <div class="pop-form-group">
          <label class="pop-label" for="email">Email:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="email" id="email" placeholder="Email" value="${user ? user.email : ''}" />
            <i class="fa-solid fa-envelope pop-input-icon"></i>
          </div>
        </div>
        <div class="pop-form-group">
          <label class="pop-label">Cargo:<span style="color:red">*</span></label>
          <div class="role-selector">
            <div class="role-card" id="role-user" title="Acesso comum">
              <div class="role-card-icon"><i class="fa-solid fa-user"></i></div>
              <div class="role-card-text">
                <span class="role-card-title">Usuário</span>
                <span class="role-card-desc">Acesso Padrão</span>
              </div>
              <div class="role-card-check"><i class="fa-solid fa-circle-check"></i></div>
            </div>
            <div class="role-card" id="role-admin" title="Acesso administrador">
              <div class="role-card-icon"><i class="fa-solid fa-user-shield"></i></div>
              <div class="role-card-text">
                <span class="role-card-title">Administrador</span>
                <span class="role-card-desc">Controle Total</span>
              </div>
              <div class="role-card-check"><i class="fa-solid fa-circle-check"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div class="pop-footer">
        <button id="salvar" class="pop-btn pop-btn-save"><span class="icon"><i class="fa-solid fa-check"></i></span> SALVAR</button>
        <button id="voltar" class="pop-btn pop-btn-back"><span class="icon"><i class="fa-solid fa-arrow-left"></i></span> VOLTAR</button>
      </div>
    </div>
  </div>`;

function showPopup(isEdit = false, user = null, onSave = null) {
  const template = document.createElement('template');
  template.innerHTML = popupTemplate(isEdit, user).trim();
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

  // Set initial role selection state and click handlers
  let selectedAdmin = false;
  const userCard = overlay.querySelector('#role-user');
  const adminCard = overlay.querySelector('#role-admin');

  const updateRoleUI = () => {
    if (selectedAdmin) {
      adminCard.classList.add('selected');
      userCard.classList.remove('selected');
    } else {
      userCard.classList.add('selected');
      adminCard.classList.remove('selected');
    }
  };

  if (user && user.admin) {
    selectedAdmin = true;
  } else {
    selectedAdmin = false;
  }
  updateRoleUI();

  userCard.addEventListener('click', () => {
    selectedAdmin = false;
    updateRoleUI();
  });

  adminCard.addEventListener('click', () => {
    selectedAdmin = true;
    updateRoleUI();
  });

  const salvarButton = overlay.querySelector('#salvar');
  salvarButton.addEventListener('click', async () => {
    const RA = overlay.querySelector('#matricula').value.trim();
    const nome = overlay.querySelector('#nome').value.trim();
    const email = overlay.querySelector('#email').value.trim();
    const admin = selectedAdmin;

    if (!RA || !nome || !email) {
      alert('Matrícula, nome e email são obrigatórios.');
      return;
    }

    const token = localStorage.getItem('jwt'); 
    const endpoint = isEdit ? '/user/update' : '/user/create';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ RA, nome, email, admin })
      });

      if (response.ok) {
        alert(isEdit ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
        if (onSave) onSave();
      } else {
        const errorText = await response.text();
        alert('Erro ao salvar usuário: ' + (errorText || response.statusText));
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão ao salvar usuário.');
    }
  });
}

// Bind to window context to make it globally available
window.showPopup = showPopup;

document.body.addEventListener('click', (e) => {
  if (e.target.closest('#openPopup')) {
    const path = window.location.pathname;
    if (path === '/usuarios') {
      if (window.carregarUsuarios) {
        showPopup(false, null, window.carregarUsuarios);
      } else {
        showPopup(false, null, () => window.location.reload());
      }
    }
  }
});
