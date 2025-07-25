// BMS Conecta - JavaScript Separado

// Configurações globais
const CONFIG = {
    MIN_PHONE_LENGTH: 10,
    MAX_PHONE_LENGTH: 11,
    CNPJ_LENGTH: 14,
    INSTAGRAM_URL: 'https://www.instagram.com/bmsconsultoriatributaria/',
    WHATSAPP_NUMBER: '5521992884021'
};

document.addEventListener('DOMContentLoaded', function() {
    // Navbar mobile toggle
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navbarLinks = navbarMenu.querySelectorAll('a');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Máscara para telefone (todos os campos de telefone)
    document.querySelectorAll('input[type="tel"], input[name*="celular"], input[name*="telefone"]').forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Limita o número de dígitos
            if (value.length > CONFIG.MAX_PHONE_LENGTH) {
                value = value.substr(0, CONFIG.MAX_PHONE_LENGTH);
            }
            
            // Aplica a máscara
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.substr(0, 2)}) ${value.substr(2)}`;
                } else {
                    value = `(${value.substr(0, 2)}) ${value.substr(2, 5)}-${value.substr(7)}`;
                }
            }
            
            e.target.value = value;
        });
    });

    // Máscara para CNPJ
    document.querySelectorAll('input[name*="cnpj"]').forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > CONFIG.CNPJ_LENGTH) value = value.substr(0, CONFIG.CNPJ_LENGTH);
            
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            
            e.target.value = value;
        });
    });

    // Validação de formulário
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Validação em tempo real
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }

    // Validação específica para telefone (todos os campos de telefone)
    document.querySelectorAll('input[type="tel"], input[name*="celular"], input[name*="telefone"]').forEach(input => {
        input.addEventListener('blur', validateTelefone);
        input.addEventListener('input', function() {
            // Limpar erro quando usuário começa a digitar
            clearFieldError(this);
        });
    });

    // Validação específica para CNPJ
    document.querySelectorAll('input[name*="cnpj"]').forEach(input => {
        input.addEventListener('blur', validateCNPJ);
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Validação específica para LinkedIn
    const linkedinInput = document.getElementById('linkedin');
    if (linkedinInput) {
        linkedinInput.addEventListener('blur', validateLinkedIn);
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            
            // Fecha outras FAQs abertas
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
        });
    });

    // Smooth Scroll com logs de depuração
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            console.log('Clique anchor:', targetId, 'Elemento encontrado?', !!target);
            if (target) {
                e.preventDefault();
                if (targetId === '#hero') {
                    const hero = document.querySelector('.hero');
                    const heroContent = document.querySelector('.hero-content');
                    if (hero && heroContent) {
                        hero.style.transform = 'translateY(0px)';
                        heroContent.style.transform = 'translateY(0px)';
                        heroContent.style.opacity = '1';
                    }
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetRect = target.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetPosition = targetRect.top + scrollTop - navbarHeight;
                console.log('Scroll para:', targetId, 'targetPosition:', targetPosition, 'navbarHeight:', navbarHeight);
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Detectar scroll programático e resetar parallax
    let isScrolling = false;
    let scrollTimeout;
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(...args) {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        // Reset imediato das transformações parallax
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        if (hero && heroContent) {
            hero.style.transform = 'translateY(0px)';
            heroContent.style.transform = 'translateY(0px)';
            heroContent.style.opacity = '1';
        }
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 1000);
        return originalScrollTo.apply(this, args);
    };
});

// Função para validar campo individual
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover classes de erro/sucesso anteriores
    field.classList.remove('error', 'success');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    
    // Validações específicas
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Digite um email válido');
            return false;
        }
    }
    
    // Se passou por todas as validações
    if (value) {
        field.classList.add('success');
    }
    
    return true;
}

// Função para validar telefone especificamente
function validateTelefone(e) {
    const field = e.target;
    const value = field.value.replace(/\D/g, '');
    
    // Remover classes de erro/sucesso anteriores
    field.classList.remove('error', 'success');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    
    // Validação específica para telefone
    if (value.length === 0) {
        showFieldError(field, 'Telefone é obrigatório');
        return false;
    }
    
    if (value.length < CONFIG.MIN_PHONE_LENGTH) {
        showFieldError(field, `Telefone deve ter pelo menos ${CONFIG.MIN_PHONE_LENGTH} dígitos`);
        return false;
    }
    
    if (value.length === 10) {
        showFieldError(field, `Telefone deve ter ${CONFIG.MAX_PHONE_LENGTH} dígitos (com o 9)`);
        return false;
    }
    
    if (value.length !== CONFIG.MAX_PHONE_LENGTH) {
        showFieldError(field, `Telefone deve ter ${CONFIG.MAX_PHONE_LENGTH} dígitos`);
        return false;
    }
    
    // Se passou por todas as validações
    field.classList.add('success');
    return true;
}

// Função para validar CNPJ especificamente
function validateCNPJ(e) {
    const field = e.target;
    const value = field.value.replace(/\D/g, '');
    
    // Remover classes de erro/sucesso anteriores
    field.classList.remove('error', 'success');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    
    // Validação específica para CNPJ
    if (value.length === 0) {
        showFieldError(field, 'CNPJ é obrigatório');
        return false;
    }
    
    if (value.length !== CONFIG.CNPJ_LENGTH) {
        showFieldError(field, `CNPJ deve ter ${CONFIG.CNPJ_LENGTH} dígitos`);
        return false;
    }
    
    // Se passou por todas as validações
    field.classList.add('success');
    return true;
}

// Função para validar LinkedIn especificamente
function validateLinkedIn(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover classes de erro/sucesso anteriores
    field.classList.remove('error', 'success');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    
    if (value) {
        // Regex mais flexível para LinkedIn
        const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
        if (!linkedinRegex.test(value)) {
            showFieldError(field, 'Digite uma URL válida do LinkedIn');
            return false;
        }
    }
    
    // Se passou por todas as validações
    if (value) {
        field.classList.add('success');
    }
    
    return true;
}

// Função para mostrar erro no campo
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Função para limpar erro do campo
function clearFieldError(e) {
    const field = e.target || e;
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

// Função para lidar com envio do formulário BMS Conecta
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    
    // Verificar se é o formulário de indicação
    if (form.id === 'indicacaoForm') {
        // Validação de e-mails
        const seuEmailInput = form.querySelector('[name="seu_email"]');
        const indicadoEmailInput = form.querySelector('[name="indicado_email"]');
        let valid = true;
        if (!isValidEmail(seuEmailInput.value.trim())) {
            showFieldError(seuEmailInput, 'Digite um e-mail válido');
            valid = false;
        }
        if (!isValidEmail(indicadoEmailInput.value.trim())) {
            showFieldError(indicadoEmailInput, 'Digite um e-mail válido');
            valid = false;
        }
        // Validação obrigatória dos campos principais
        const obrigatorios = [
            {input: form.querySelector('[name="seu_nome"]'), msg: 'Nome é obrigatório'},
            {input: form.querySelector('[name="seu_cargo"]'), msg: 'Cargo é obrigatório'},
            {input: form.querySelector('[name="sua_empresa"]'), msg: 'Empresa é obrigatória'},
            {input: form.querySelector('[name="seu_cnpj"]'), msg: 'CNPJ é obrigatório'},
            {input: form.querySelector('[name="seu_celular"]'), msg: 'Celular é obrigatório'},
            {input: form.querySelector('[name="indicado_nome"]'), msg: 'Nome do indicado é obrigatório'},
            {input: form.querySelector('[name="indicado_cargo"]'), msg: 'Cargo do indicado é obrigatório'},
            {input: form.querySelector('[name="indicado_empresa"]'), msg: 'Empresa do indicado é obrigatória'},
            {input: form.querySelector('[name="indicado_cnpj"]'), msg: 'CNPJ do indicado é obrigatório'},
            {input: form.querySelector('[name="indicado_celular"]'), msg: 'Celular do indicado é obrigatório'}
        ];
        obrigatorios.forEach(campo => {
            if (!campo.input.value.trim()) {
                showFieldError(campo.input, campo.msg);
                valid = false;
            }
        });
        if (!valid) return;
        handleIndicacaoForm(form, submitButton);
        return;
    }
    
    // Para outros formulários, usar a lógica padrão
    const buttonText = submitButton.querySelector('.button-text') || submitButton;
    
    // Validar todos os campos
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        return false;
    }
    
    // Mostrar loading
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simular envio (substitua por sua lógica real)
    setTimeout(() => {
        // Sucesso
        submitButton.classList.remove('loading');
        submitButton.textContent = '✓ Enviado com Sucesso!';
        submitButton.style.background = 'var(--verde-sucesso)';
        
        // Reset do formulário após 3 segundos
        setTimeout(() => {
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Candidatura';
            submitButton.style.background = '';
            
            // Limpar classes de sucesso dos campos
            inputs.forEach(input => {
                input.classList.remove('success');
            });
        }, 3000);
        
    }, 2000);
    
    return false;
}

// Função específica para o formulário de indicação
async function handleIndicacaoForm(form, submitButton) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbzCtpeHnh4X2ImTofZreRYhgap6PW5scCankirqvxKqJWKBlWWKlDhD70YDduZRh6kh/exec";

    // Validar todos os campos obrigatórios
    const requiredFields = [
        'seu-nome', 'seu-cargo', 'sua-empresa', 'seu-cnpj', 'seu-celular',
        'indicado-nome', 'indicado-cargo', 'indicado-empresa', 'indicado-cnpj', 'indicado-celular', 'indicado-email'
    ];
    
    let isValid = true;
    
    // Validar campos obrigatórios
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field && !validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Validações específicas
    const seuTelefone = document.getElementById('seu-celular');
    const indicadoTelefone = document.getElementById('indicado-celular');
    const seuCNPJ = document.getElementById('seu-cnpj');
    const indicadoCNPJ = document.getElementById('indicado-cnpj');
    
    if (seuTelefone && !validateTelefone({ target: seuTelefone })) {
        isValid = false;
    }
    
    if (indicadoTelefone && !validateTelefone({ target: indicadoTelefone })) {
        isValid = false;
    }
    
    if (seuCNPJ && !validateCNPJ({ target: seuCNPJ })) {
        isValid = false;
    }
    
    if (indicadoCNPJ && !validateCNPJ({ target: indicadoCNPJ })) {
        isValid = false;
    }
    
    if (!isValid) {
        // Mostra erro no primeiro campo inválido
        const firstInvalidField = document.querySelector('.form-group input.error, .form-group textarea.error, .form-group select.error');
        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalidField.focus();
        }
        return;
    }

    const seuEmail = form.querySelector('[name="seu_email"]').value.trim();
    const indicadoEmail = form.querySelector('[name="indicado_email"]').value.trim();

    const data = {
        seu_nome: form.querySelector('[name="seu_nome"]').value.trim(),
        seu_cargo: form.querySelector('[name="seu_cargo"]').value.trim(),
        sua_empresa: form.querySelector('[name="sua_empresa"]').value.trim(),
        seu_cnpj: form.querySelector('[name="seu_cnpj"]').value.trim(),
        seu_celular: form.querySelector('[name="seu_celular"]').value.trim(),
        seu_email: seuEmail,
        indicado_nome: form.querySelector('[name="indicado_nome"]').value.trim(),
        indicado_cargo: form.querySelector('[name="indicado_cargo"]').value.trim(),
        indicado_empresa: form.querySelector('[name="indicado_empresa"]').value.trim(),
        indicado_cnpj: form.querySelector('[name="indicado_cnpj"]').value.trim(),
        indicado_celular: form.querySelector('[name="indicado_celular"]').value.trim(),
        indicado_email: indicadoEmail
    };

    try {
        // Mostrar loading
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Simula retorno positivo após 1,5s
        setTimeout(() => {
            // Sucesso
            submitButton.classList.remove('loading');
            submitButton.textContent = '✓ Enviado com Sucesso!';
            submitButton.style.background = 'var(--verde-sucesso)';
            
            // Reset do formulário após 3 segundos
            setTimeout(() => {
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Indicação';
                submitButton.style.background = '';
                // Limpar classes de validação dos campos
                const campos = form.querySelectorAll('input, textarea, select');
                campos.forEach(campo => {
                    campo.classList.remove('success', 'error');
                });
            }, 3000);
        }, 1000);
    } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao enviar a indicação. Tente novamente mais tarde.");
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Indicação';
    }
}

// Função para fazer links clicáveis
function makeLinksClickable() {
    // WhatsApp
    const whatsappElements = document.querySelectorAll('.contact-method a[href*="wa.me"]');
    whatsappElements.forEach(element => {
        element.setAttribute('target', '_blank');
    });
    
    // Email
    const emailElements = document.querySelectorAll('.contact-method a[href^="mailto:"]');
    emailElements.forEach(element => {
        element.setAttribute('target', '_blank');
    });
    
    // LinkedIn
    const linkedinElements = document.querySelectorAll('.contact-method a[href*="linkedin.com"]');
    linkedinElements.forEach(element => {
        element.setAttribute('target', '_blank');
    });
    
    // Instagram
    const instagramElements = document.querySelectorAll('.contact-method a[href*="instagram.com"]');
    instagramElements.forEach(element => {
        element.setAttribute('target', '_blank');
    });
}

// Inicializar links clicáveis
document.addEventListener('DOMContentLoaded', function() {
    makeLinksClickable();
});

// Animação de scroll para elementos
function animateOnScroll() {
    const elements = document.querySelectorAll('.step-card, .form-container, .trust-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Inicializar animações de scroll
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
});

// Validação de e-mail
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 