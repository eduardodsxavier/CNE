const steps = [
    { title: 'Aluno', content: `
    <div class="form-group"><label class="label">RA:*<input class="input" placeholder="ra" disabled /></label></div>
    <div class="form-group"><label class="label">Nome:*<input class="input" placeholder="nome" disabled /></label></div>
    <div class="form-group"><label class="label">E-mail:*<input class="input" placeholder="e-mail" disabled /></label></div>
    <div class="form-group"><label class="label">Curso:*<input class="input" placeholder="curso" disabled /></label></div>
    <div class="form-group"><label class="label">Turma:*<input class="input" placeholder="turma" disabled /></label></div>
  ` },
    { title: 'Disciplina', content: `
    <div class="form-group"><label class="label">Nome:*<input class="input" placeholder="nome" disabled /></label></div>
    <div class="form-group"><label class="label">Carga Horária:*<input class="input" placeholder="carga horária" disabled /></label></div>
    <div class="form-group"><label class="label">Professor Orientador:*<input class="input" placeholder="professor orientador" disabled /></label></div>
    <div class="form-group"><label class="label">E-mail Orientador:*<input class="input" placeholder="e-mail orientador" disabled /></label></div>
  ` },
    { title: 'Unidade', content: `
    <div class="form-group"><label class="label">Nome:*<input class="input" placeholder="nome" disabled /></label></div>
    <div class="form-group"><label class="label">Sigla do Órgão*<input class="input" placeholder="interno" disabled /></label></div>
    <div class="form-group"><span class="label">Interno:*<label class="switch"><input type="checkbox" disabled /><span class="slider"></span></label></span></div>
    <div class="form-group"><span class="label">Convênio Público:*<label class="switch"><input type="checkbox" disabled /><span class="slider"></span></label></span></div>
  ` },
    { title: 'VLR', content: `
    <div class="form-group"><label class="label">Preceptor:<input class="input" value="R$ 00,00" disabled /></label></div>
    <div class="form-group"><label class="label">Gerenciamento:<input class="input" value="R$ 00,00" disabled /></label></div>
    <div class="form-group"><label class="label">Total:<input class="input" value="R$ 00,00" disabled /></label></div>
    <div class="form-group"><label class="label">Total do Aluno:<input class="input" value="R$ 00,00" disabled /></label></div>
  ` },
    { title: 'TCE', content: `
    <div class="form-group"><label class="label">Nome do Responsável:*<input class="input" placeholder="nome do responsável" disabled /></label></div>
    <div class="form-group"><label class="label">Cargo:*<input class="input" placeholder="cargo" disabled /></label></div>
    <div class="form-group"><label class="label">E-mail:*<input class="input" placeholder="e-mail" disabled /></label></div>
    <div class="form-group"><label class="label">Telefone:*<input class="input" placeholder="telefone" disabled /></label></div>
    <div class="form-group"><label class="label">Termo de Compromisso:*<select class="select" disabled><option hidden>termo de compromisso</option></select></label></div>
  ` },
    { title: 'Data', content: `
    <div class="form-group"><label class="label">Início:*<select class="select" disabled><option hidden>Selecionar Data</option></select></label></div>
    <div class="form-group"><label class="label">Término:*<select class="select" disabled><option hidden>Selecionar Data</option></select></label></div>
    <div class="form-group"><label class="label">Quantidade de Dias:*<input class="input" placeholder="qntd. de dias" disabled /></label></div>
    <div class="form-group"><label class="label">Dias da Semana:*<input class="input" placeholder="dias da semana" disabled /></label></div>
    <div class="form-group"><span class="label">Feriado:*<label class="switch"><input type="checkbox" disabled /><span class="slider"></span></label></span></div>
  ` },
    { title: 'Horários', content: `
    <div class="form-group"><label class="label">Início:*<input class="input" type="time" disabled /></label></div>
    <div class="form-group"><label class="label">Término:*<input class="input" type="time" disabled /></label></div>
    <div class="form-group"><label class="label">Quantidade de Horas:*<input class="input" placeholder="qntd. de dias" disabled /></label></div>
    <div class="form-group"><label class="label">Turno:*<select class="select" disabled><option hidden>Turno</option></select></label></div>
    <div class="form-group"><label class="label">Carga Total:*<input class="input" placeholder="carga total" disabled /></label></div>
  ` }
];

function showPopup() {
    let current = 0;
    const template = document.createElement('template');
    const render = () => {
        const step = steps[current];
        template.innerHTML = `
      <div class="modal-overlay" role="dialog" aria-modal="true">
        <div class="modal" aria-labelledby="title">
          <div class="modal-header">
            ${step.title}
            <div class="steps">
              ${steps.map((_,i)=>`<div class="step${i<=current?' active':''}"></div>`).join('')}
            </div>
          </div>
          <div class="modal-content">${step.content}</div>
          <div class="modal-footer">
            <button id="back" class="btn back" ${current===0?'disabled':''}><span class="icon">←</span> VOLTAR</button>
            <button id="next" class="btn save"><span class="icon">${current===steps.length-1?'✔':'→'}</span> ${current===steps.length-1?'CONCLUIR':'AVANÇAR'}</button>
          </div>
        </div>
      </div>`;
        const overlay = template.content.firstElementChild;
        document.body.appendChild(overlay);
        overlay.querySelector('#back').addEventListener('click', ()=>{ overlay.remove(); current--; render(); });
        overlay.querySelector('#next').addEventListener('click', ()=>{ overlay.remove(); current++; if(current<steps.length) render(); });
        overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
        document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'){ overlay.remove(); document.removeEventListener('keydown',esc); }});
    };
    render();
}

document.getElementById('openPopup').addEventListener('click', showPopup);

