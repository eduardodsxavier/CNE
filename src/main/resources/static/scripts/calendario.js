
function openModal() {
  const modal = document.getElementById("modal")
  modal.style.display = "flex"


  setTimeout(() => {
    modal.style.opacity = "1"
  }, 10)
}

function closeModal() {
  const modal = document.getElementById("modal")
  modal.style.display = "none"
}


window.onclick = (event) => {
  const modal = document.getElementById("modal")
  if (event.target === modal) {
    closeModal()
  }
}


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal()
  }
})


function initCalendario() {
  const calendarGrid = document.querySelector(".calendar-grid, .calendar-container");
  if (!calendarGrid) return;

  const createBtn = document.querySelector(".create-btn")
  if (createBtn) {
    createBtn.addEventListener("click", () => {
      alert("Função CRIAR clicada!")
    })
  }

  const editBtn = document.querySelector(".edit-btn")
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      alert("Função EDITAR clicada!")
    })
  }

  // Clique em eventos abre o modal com a data correspondente
  calendarGrid.addEventListener("click", (e) => {
    const eventEl = e.target.closest(".event");
    if (eventEl) {
      const dayEl = eventEl.closest(".calendar-day");
      const dayNum = dayEl ? dayEl.querySelector(".day-number").textContent.trim() : "";
      
      const modalHeaderText = document.querySelector("#modal .header-text");
      if (modalHeaderText && dayNum) {
        modalHeaderText.textContent = `${dayNum.padStart(2, '0')}/04/2025`;
      }
      
      openModal();
    }
  });
}

window.initCalendario = initCalendario;
document.addEventListener("DOMContentLoaded", initCalendario);

// Optional: Add smooth animations
function showModal() {
  const modal = document.getElementById("modal")
  const modalContent = modal.querySelector(".modal-content")

  modal.style.display = "flex"
  modal.style.opacity = "0"
  modalContent.style.transform = "scale(0.9)"

  // Trigger animation
  requestAnimationFrame(() => {
    modal.style.transition = "opacity 0.3s ease"
    modalContent.style.transition = "transform 0.3s ease"
    modal.style.opacity = "1"
    modalContent.style.transform = "scale(1)"
  })
}


