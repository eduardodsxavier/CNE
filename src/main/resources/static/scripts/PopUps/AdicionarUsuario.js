const popupTemplate = () => 
  `<div class="modal-overlay" role="dialog" aria-modal="true">
    <div class="modal" aria-labelledby="modalTitle">
      <div id="modalTitle" class="modal-header">Cadastrar Usuário</div>
      <div class="modal-content">
        <div class="form-group">
          <label class="label" for="matricula">Matrícula:<span style=\"color:red\">*</span></label>
          <input class="input" type="text" id="matricula" placeholder="Matrícula" />
        </div>
        <div class="form-group">
          <label class="label" for="nome">Nome:<span style=\"color:red\">*</span></label>
          <input class="input" type="text" id="nome" placeholder="Nome" />
        </div>
        <div class="form-group">
          <label class="label" for="email">Email:</label>
          <input class="input" type="email" id="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <label class="label" for="admin">Administrador:<span style=\"color:red\">*</span></label>
          <label class="switch">
            <input type="checkbox" id="admin" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button id="salvar" class="btn btn-save"><span class="icon"><i class="fa-solid fa-check"></i></span> SALVAR</button>
        <button id="voltar" class="btn btn-back"><span class="icon"><i class="fa-solid fa-arrow-left"></i></span> VOLTAR</button>
      </div>
    </div>
  </div>`;

function showPopup() {
  const template = document.createElement('template');
  template.innerHTML = popupTemplate().trim();
  const overlay = template.content.firstChild;

  const close = () => overlay.remove();
  overlay.querySelector('#voltar').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  });
  document.body.appendChild(overlay);
    const salvarButton = overlay.querySelector('#salvar');

salvarButton.addEventListener('click', async () => {
    const RA = overlay.querySelector('#matricula').value;
    const nome = overlay.querySelector('#nome').value;
    const email = overlay.querySelector('#email').value;
    const admin = overlay.querySelector('#admin').checked;

  if (!RA || !nome) {
    alert('Matrícula e nome são obrigatórios.');
    return;
  }

  const token = localStorage.getItem('jwt'); 

  const response = await fetch('/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify({ RA, nome, email, admin })
  });

  if (response.ok) {
    alert('Usuário cadastrado com sucesso!');
    overlay.remove();
  } else {
    alert('Erro ao cadastrar usuário.');
  }
});
}

document.getElementById('openPopup').addEventListener('click', showPopup);

