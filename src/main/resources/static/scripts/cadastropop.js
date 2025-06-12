const dialog = document.querySelector("#ModalDialog");
const openButton = document.querySelector(".btn-register");
const closeButton = document.querySelector("#closeButton"); 

openButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close(); 
});
