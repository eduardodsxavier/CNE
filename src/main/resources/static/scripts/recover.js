// --- OVERRIDE DE ALERT GLOBAL COM TOASTS PREMIUM CNE ---
(function() {
    const toastStyles = `
    #cne-toast-container {
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 380px;
        width: 100%;
    }

    .cne-toast {
        display: flex;
        align-items: center;
        background: #ffffff;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
        border-left: 4px solid #1e5b3e;
        animation: cneToastFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        pointer-events: auto;
        position: relative;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    @keyframes cneToastFadeIn {
        from {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes cneToastFadeOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
        }
    }

    .cne-toast.success {
        border-left-color: #10b981;
    }

    .cne-toast.error {
        border-left-color: #ef4444;
    }

    .cne-toast.success .cne-toast-icon {
        color: #10b981;
    }

    .cne-toast.error .cne-toast-icon {
        color: #ef4444;
    }

    .cne-toast-icon {
        font-size: 20px;
        color: #1e5b3e;
        margin-right: 12px;
        flex-shrink: 0;
    }

    .cne-toast-content {
        flex: 1;
        padding-right: 10px;
    }

    .cne-toast-message {
        font-size: 13.5px;
        font-weight: 600;
        color: #1e293b;
        line-height: 1.4;
    }

    .cne-toast-close {
        background: none;
        border: none;
        color: #94a3b8;
        font-size: 18px;
        cursor: pointer;
        padding: 4px;
        line-height: 1;
        transition: color 0.15s ease;
        align-self: flex-start;
    }

    .cne-toast-close:hover {
        color: #475569;
    }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = toastStyles;
    document.head.appendChild(styleSheet);

    window.alert = function(message) {
        let container = document.getElementById('cne-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'cne-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'cne-toast';
        
        let iconClass = 'fa-circle-info';
        let typeClass = 'info';
        
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('sucesso') || lowerMessage.includes('cadastrada') || lowerMessage.includes('salvo') || lowerMessage.includes('atualizado') || lowerMessage.includes('redefinida') || lowerMessage.includes('cadastrado') || lowerMessage.includes('ativad') || lowerMessage.includes('inativad') || lowerMessage.includes('enviad') || lowerMessage.includes('notificado')) {
            iconClass = 'fa-circle-check';
            typeClass = 'success';
        } else if (lowerMessage.includes('erro') || lowerMessage.includes('falha') || lowerMessage.includes('não') || lowerMessage.includes('obrigatório') || lowerMessage.includes('coincidem') || lowerMessage.includes('inválido')) {
            iconClass = 'fa-triangle-exclamation';
            typeClass = 'error';
        }
        
        toast.classList.add(typeClass);
        toast.innerHTML = `
            <i class="fa-solid ${iconClass} cne-toast-icon"></i>
            <div class="cne-toast-content">
                <span class="cne-toast-message">${message}</span>
            </div>
            <button class="cne-toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'cneToastFadeOut 0.4s forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 4000);
    };
})();

document.addEventListener("DOMContentLoaded", function () {
    const btnEnviar = document.querySelector(".btn-entrar");
    const inputRa = document.querySelector(".input-email");

    if (inputRa) {
        inputRa.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                btnEnviar.click();
            }
        });
    }

    if (btnEnviar) {
        btnEnviar.addEventListener("click", async function (event) {
            event.preventDefault();

            const ra = inputRa.value.trim();
            if (!ra) {
                alert("Por favor, preencha a sua matrícula.");
                return;
            }

            try {
                const response = await fetch(`/user/requestToChangePassword/${ra}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    alert("Sucesso! O administrador foi notificado para redefinir sua senha.");
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 3000);
                } else {
                    alert("Erro ao solicitar redefinição. RA inválido ou não cadastrado.");
                }
            } catch (err) {
                console.error(err);
                alert("Erro de conexão com o servidor.");
            }
        });
    }
});
