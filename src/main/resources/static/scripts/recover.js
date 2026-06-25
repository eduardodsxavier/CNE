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
        pointer-events: none;
    }

    .cne-toast {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(226, 232, 240, 0.8);
        border-radius: 16px;
        padding: 16px 20px;
        box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03);
        animation: cneToastFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        pointer-events: auto;
        position: relative;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        overflow: hidden;
    }

    /* Success Theme */
    .cne-toast.success {
        border-color: rgba(34, 197, 94, 0.25);
        background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
    }
    .cne-toast.success .cne-toast-badge {
        background: rgba(34, 197, 94, 0.1);
        color: #16a34a;
    }

    /* Error Theme */
    .cne-toast.error {
        border-color: rgba(239, 68, 68, 0.25);
        background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%);
    }
    .cne-toast.error .cne-toast-badge {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
    }

    /* Info Theme */
    .cne-toast.info {
        border-color: rgba(59, 130, 246, 0.25);
        background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
    }
    .cne-toast.info .cne-toast-badge {
        background: rgba(59, 130, 246, 0.1);
        color: #2563eb;
    }

    .cne-toast-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 12px;
        margin-right: 14px;
        flex-shrink: 0;
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .cne-toast:hover .cne-toast-badge {
        transform: scale(1.08);
    }

    .cne-toast-icon {
        font-size: 18px;
    }

    .cne-toast-content {
        flex: 1;
        padding-right: 8px;
    }

    .cne-toast-message {
        font-size: 14px;
        font-weight: 600;
        color: #1e293b;
        line-height: 1.4;
    }

    .cne-toast-close {
        background: rgba(241, 245, 249, 0.8);
        border: none;
        color: #64748b;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
    }

    .cne-toast-close:hover {
        background: rgba(226, 232, 240, 1);
        color: #1e293b;
        transform: rotate(90deg);
    }

    /* Progress bar at the bottom */
    .cne-toast-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        transform-origin: left;
        animation: cneToastProgress 4s linear forwards;
    }
    .cne-toast.success .cne-toast-progress {
        background: #22c55e;
    }
    .cne-toast.error .cne-toast-progress {
        background: #ef4444;
    }
    .cne-toast.info .cne-toast-progress {
        background: #3b82f6;
    }

    @keyframes cneToastProgress {
        from { transform: scaleX(1); }
        to { transform: scaleX(0); }
    }

    @keyframes cneToastFadeIn {
        from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
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
            transform: translateY(-8px) scale(0.96);
        }
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
        if (lowerMessage.includes('erro') || lowerMessage.includes('falha') || lowerMessage.includes('não') || lowerMessage.includes('obrigatório') || lowerMessage.includes('coincidem') || lowerMessage.includes('inválido')) {
            iconClass = 'fa-triangle-exclamation';
            typeClass = 'error';
        } else if (lowerMessage.includes('sucesso') || lowerMessage.includes('cadastrada') || lowerMessage.includes('salvo') || lowerMessage.includes('atualizado') || lowerMessage.includes('redefinida') || lowerMessage.includes('cadastrado') || lowerMessage.includes('ativad') || lowerMessage.includes('inativad') || lowerMessage.includes('enviad') || lowerMessage.includes('notificado')) {
            iconClass = 'fa-circle-check';
            typeClass = 'success';
        }
        
        toast.classList.add(typeClass);
        toast.innerHTML = `
            <div class="cne-toast-badge">
                <i class="fa-solid ${iconClass} cne-toast-icon"></i>
            </div>
            <div class="cne-toast-content">
                <span class="cne-toast-message">${message}</span>
            </div>
            <button class="cne-toast-close" onclick="this.parentElement.remove()">&times;</button>
            <div class="cne-toast-progress"></div>
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
