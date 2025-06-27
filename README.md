# BMS Partners Program - Landing Page

Landing page responsiva para o programa de parceiros da BMS Consultoria Tributária.

## 📁 Estrutura do Projeto

```
programa_exclusivo_parceiros/
├── index.html              # Arquivo HTML principal
├── css/
│   └── styles.css          # Estilos CSS organizados
├── js/
│   └── main.js            # JavaScript com funcionalidades
├── images/                # Pasta para imagens (futuro)
└── README.md              # Documentação do projeto
```

## 🚀 Funcionalidades

### ✅ Implementadas
- **Navbar responsiva** com menu mobile
- **Design responsivo** para todos os dispositivos
- **Validação de formulário** com feedback visual
- **Validação de telefone** com mínimo de 10 dígitos e máximo de 11
- **Máscara de telefone** automática
- **Formatação de Instagram** automática (@)
- **FAQ accordion** interativo
- **Smooth scroll** para navegação
- **Animações** de entrada dos elementos
- **Links atualizados** do Instagram (@bmsconsultoriatributaria)
- **Separação de responsabilidades** (HTML, CSS, JS)

### 🎨 Design
- **Cores da marca**: Azul escuro (#003868), Laranja vibrante (#D58435)
- **Tipografia**: Sistema de fontes moderno
- **Layout**: Grid e Flexbox para responsividade
- **Animações**: CSS e JavaScript para melhor UX

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px  
- **Mobile**: < 768px
- **Mobile pequeno**: < 480px

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e animações
- **JavaScript ES6+** - Funcionalidades interativas
- **Google Apps Script** - Backend do formulário

## 📋 Validações do Formulário

### Campos Obrigatórios
- Nome Completo
- Cargo/Profissão
- Segmento de Atuação
- E-mail Corporativo
- WhatsApp
- Rede de Contatos
- Quantidade de Indicações

### Validações Específicas
- **Telefone**: Mínimo 10 dígitos, máximo 11 dígitos
- **E-mail**: Formato válido
- **Instagram**: Formatação automática com @

## 🎯 Seções da Landing Page

1. **Hero** - Apresentação principal com calculadora de ganhos
2. **Como Funciona** - Processo em 3 etapas
3. **Perfil Ideal** - Características do parceiro
4. **Benefícios** - Vantagens do programa
5. **Comparação** - Tabela comparativa
6. **FAQ** - Perguntas frequentes
7. **Formulário** - Cadastro de parceiros
8. **Footer** - Informações de contato

## 🔗 Links Importantes

- **Instagram**: https://www.instagram.com/bmsconsultoriatributaria/
- **WhatsApp**: (21) 99288-4021
- **E-mail**: daniele.rezende@bmsprojetos.com
- **LinkedIn**: https://linkedin.com/company/bms-consultoria-tributaria

## 🚀 Como Usar

1. Clone ou baixe o projeto
2. Abra o arquivo `index.html` no navegador
3. Para desenvolvimento, use um servidor local

### Desenvolvimento Local
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (se tiver http-server instalado)
npx http-server

# Usando PHP
php -S localhost:8000
```

## 📝 Personalizações

### Cores
As cores estão definidas como variáveis CSS no arquivo `css/styles.css`:
```css
:root {
    --azul-escuro: #003868;
    --azul-medio: #004d8f;
    --laranja-vibrante: #D58435;
    --laranja-fechado: #CB622C;
    /* ... */
}
```

### Configurações JavaScript
As configurações estão no arquivo `js/main.js`:
```javascript
const CONFIG = {
    MIN_PHONE_LENGTH: 10,
    MAX_PHONE_LENGTH: 11,
    INSTAGRAM_URL: 'https://www.instagram.com/bmsconsultoriatributaria/',
    WHATSAPP_NUMBER: '5521992884021'
};
```

## 🔄 Atualizações Futuras

- [ ] Adicionar imagens e ícones personalizados
- [ ] Implementar analytics
- [ ] Adicionar mais animações
- [ ] Criar versão PWA
- [ ] Implementar cache de formulário
- [ ] Adicionar testes automatizados

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato:
- **WhatsApp**: (21) 99288-4021
- **E-mail**: daniele.rezende@bmsprojetos.com

---

**Desenvolvido para BMS Consultoria Tributária** 🚀 