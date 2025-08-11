document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".btn-entrar");

    document.querySelectorAll('.input-email, .input-senha').forEach(input => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                loginButton.click();
            }
        });
    });

    loginButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const ra = document.querySelector(".input-email").value;
        const password = document.querySelector(".input-senha").value;

        const response = await fetch("/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ RA: ra, password: password })
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem("jwt", data.token);

            if (data.changePassword) {
                window.location.href = "/register";
            } else {
                window.location.href = "/cenarios";
            }
        } else {
            document.getElementById("erro-login").style.display = "block";
        }
    });
});

