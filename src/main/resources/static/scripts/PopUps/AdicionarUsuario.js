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
        <button id="salvar" class="btn save"><span class="icon">✔</span> SALVAR</button>
        <button id="voltar" class="btn back"><span class="icon">←</span> VOLTAR</button>
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
}

document.getElementById('openPopup').addEventListener('click', showPopup);

