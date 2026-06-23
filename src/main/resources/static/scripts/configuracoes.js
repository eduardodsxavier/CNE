function initConfiguracoes() {
    const token = localStorage.getItem('jwt');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    let ra = null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        ra = payload.sub;
    } catch (e) {
        console.error("Erro ao decodificar token para obter RA:", e);
    }

    const navButtons = document.querySelectorAll('.config-nav-btn');
    const sections = document.querySelectorAll('.config-section');
    const themeCards = document.querySelectorAll('.theme-card');
    const saveBtn = document.getElementById('config-save-btn');
    const banner = document.getElementById('config-banner-container');

    const avatarInput = document.getElementById('profile-avatar-input');
    const avatarPreview = document.getElementById('profile-avatar-preview');
    const removeAvatarBtn = document.getElementById('profile-avatar-remove');
    const usernameInput = document.getElementById('profile-username');

    let pendingAvatarBase64 = '';

    // --- NAVEGAÇÃO DA SIDEBAR INTERNA ---
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });
        });
    });

    // --- SELEÇÃO DE TEMA ---
    let selectedTheme = 'light';
    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            themeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedTheme = card.dataset.value;
        });
    });

    // --- LÓGICA DE UPLOAD E REMOÇÃO DE AVATAR (PREVIEW) ---
    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    pendingAvatarBase64 = event.target.result;
                    if (avatarPreview) {
                        avatarPreview.src = pendingAvatarBase64;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', () => {
            pendingAvatarBase64 = '';
            if (avatarInput) {
                avatarInput.value = '';
            }
            if (avatarPreview) {
                const currentName = usernameInput ? usernameInput.value.trim() : 'U';
                avatarPreview.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentName || 'U')}&backgroundColor=1e5b3e&textColor=ffffff`;
            }
        });
    }

    if (usernameInput) {
        usernameInput.addEventListener('input', () => {
            if (!pendingAvatarBase64 && avatarPreview) {
                const currentName = usernameInput.value.trim();
                avatarPreview.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentName || 'U')}&backgroundColor=1e5b3e&textColor=ffffff`;
            }
        });
    }

    // --- CARREGAR CONFIGURAÇÕES ---
    const carregarConfiguracoes = () => {
        // Carrega as configurações de Perfil primeiro
        if (ra) {
            const cachedName = localStorage.getItem(`cne_user_name_${ra}`) || sessionStorage.getItem('cne_user_name') || '';
            if (usernameInput) {
                usernameInput.value = cachedName;
            }

            const cachedAvatar = localStorage.getItem(`cne_user_avatar_${ra}`) || '';
            pendingAvatarBase64 = cachedAvatar;

            if (avatarPreview) {
                if (cachedAvatar) {
                    avatarPreview.src = cachedAvatar;
                } else {
                    avatarPreview.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cachedName || 'U')}&backgroundColor=1e5b3e&textColor=ffffff`;
                }
            }
        }

        // Carrega configurações gerais do sistema
        const configJson = localStorage.getItem('cne_system_settings');
        let settings = {
            theme: 'light',
            emailNotif: true,
            passwordNotif: true,
            sessionTimeout: 30,
            backupInterval: 'diario',
            language: 'pt'
        };

        if (configJson) {
            try {
                settings = { ...settings, ...JSON.parse(configJson) };
            } catch (e) {
                console.error("Erro ao decodificar configurações:", e);
            }
        }

        // Aplicar valores carregados à interface
        selectedTheme = settings.theme;
        themeCards.forEach(c => {
            if (c.dataset.value === selectedTheme) {
                c.classList.add('selected');
            } else {
                c.classList.remove('selected');
            }
        });

        const emailInput = document.getElementById('config-email-notif');
        if (emailInput) emailInput.checked = settings.emailNotif;

        const pwdInput = document.getElementById('config-password-notif');
        if (pwdInput) pwdInput.checked = settings.passwordNotif;

        const timeoutInput = document.getElementById('config-session-timeout');
        if (timeoutInput) timeoutInput.value = settings.sessionTimeout;

        const backupInput = document.getElementById('config-backup-interval');
        if (backupInput) backupInput.value = settings.backupInterval;

        const langInput = document.getElementById('config-language');
        if (langInput) langInput.value = settings.language;
    };

    // --- SALVAR CONFIGURAÇÕES ---
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // Salvar informações de Perfil
            if (ra) {
                const newUsername = usernameInput ? usernameInput.value.trim() : '';
                if (newUsername) {
                    localStorage.setItem(`cne_user_name_${ra}`, newUsername);
                    sessionStorage.setItem('cne_user_name', newUsername);
                }

                if (pendingAvatarBase64) {
                    localStorage.setItem(`cne_user_avatar_${ra}`, pendingAvatarBase64);
                } else {
                    localStorage.removeItem(`cne_user_avatar_${ra}`);
                }
            }

            // Salvar configurações de sistema
            const emailNotif = document.getElementById('config-email-notif')?.checked ?? true;
            const passwordNotif = document.getElementById('config-password-notif')?.checked ?? true;
            const sessionTimeout = parseInt(document.getElementById('config-session-timeout')?.value ?? '30', 10);
            const backupInterval = document.getElementById('config-backup-interval')?.value ?? 'diario';
            const language = document.getElementById('config-language')?.value ?? 'pt';

            const settings = {
                theme: selectedTheme,
                emailNotif,
                passwordNotif,
                sessionTimeout,
                backupInterval,
                language
            };

            localStorage.setItem('cne_system_settings', JSON.stringify(settings));

            // Atualiza o header imediatamente
            if (typeof exibirUsuarioLogado === 'function') {
                exibirUsuarioLogado();
            }

            // Feedback visual de sucesso
            if (banner) {
                banner.classList.add('active');
                setTimeout(() => {
                    banner.classList.remove('active');
                }, 3000);
            }
        });
    }

    carregarConfiguracoes();
}

window.initConfiguracoes = initConfiguracoes;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConfiguracoes);
} else {
    initConfiguracoes();
}
