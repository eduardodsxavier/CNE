document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".btn-entrar");

    button.addEventListener("click", async function (event) {
        event.preventDefault();

        const password = document.querySelector(".input-email").value;
        const confirmPassword = document.querySelector(".input-senha").value;

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        const token = localStorage.getItem("jwt");

        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            window.location.href = "/login";
            return;
        }

        const response = await fetch("/user/changePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                password: password,
                confirmPassword: confirmPassword
            })
        });

        if (response.ok) {
            localStorage.removeItem("jwt"); 
            window.location.href = "/login";
        } else {
            alert("Erro ao redefinir a senha.");
        }
    });
});

