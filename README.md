# Website Oficial — José Menezes (Vereador da Câmara Municipal de Anadia)

Website completo, moderno e responsivo desenvolvido para **José Menezes**, vereador na Câmara Municipal de Anadia (Mandato 2025–2029).

Desenvolvido exclusivamente com tecnologias web nativas (**HTML5**, **CSS3**, **JavaScript ES6+**), sem dependências de compilação ou frameworks pesados, 100% compatível com **GitHub Pages** e preparado para domínio personalizado do **Dominios.pt**.

---

## 📁 Estrutura do Projeto

```text
jose-menezes/
├── assets/
│   ├── images/
│   │   ├── placeholder-avatar.svg   # Silhueta / Espaço reservado para a foto oficial
│   │   ├── favicon.svg              # Ícone institucional do site
│   │   └── hero-bg-pattern.svg      # Textura visual geométrica
│   └── docs/                        # Pasta para atas e documentos PDF
├── css/
│   └── style.css                    # Design System, cores (vermelho, branco, preto, cinzento) e responsividade
├── js/
│   ├── config.js                    # Definições centrais (EmailJS, WhatsApp, Redes Sociais, Contactos)
│   ├── main.js                      # Menu mobile, sincronização de links e modal de vídeos
│   ├── compromissos.js              # Filtros, pesquisa e modal de evidências das propostas
│   ├── a-sua-voz-conta.js           # Formulário cívico, modo anónimo, contador e integração EmailJS
│   ├── reunioes.js                  # Linha cronológica das reuniões de câmara, pesquisa e detalhes
│   ├── militantes.js                # Listagem alfabética, barra de pesquisa e filtro A-Z
│   └── data/
│       ├── propostas.js             # Base de dados demonstrativa de compromissos
│       ├── reunioes.js              # Base de dados demonstrativa de reuniões quinzenais
│       ├── militantes.js            # Base de dados demonstrativa de militantes por freguesia
│       └── videos.js                # Base de dados demonstrativa de vídeos do YouTube
├── index.html                       # Página 1: Início (Hero, Apresentação, Destaques, Vídeos)
├── compromissos.html                # Página 2: Compromissos Cumpridos (Filtros por Estado)
├── a-sua-voz-conta.html             # Página 3: A Sua Voz Conta (Formulário com 11 Freguesias)
├── reunioes.html                    # Página 4: Reuniões de Câmara (Atividade Quinzenal)
├── militantes.html                  # Página 5: Militantes no Concelho
├── comunidade.html                  # Página 6: Comunidade de WhatsApp
├── .nojekyll                        # Assegura o correto carregamento no GitHub Pages
├── CNAME.example                    # Modelo para associação de domínio no Dominios.pt
└── README.md                        # Documentação de apoio
```

---

## 🌐 As 6 Páginas do Website

1. **Início (`index.html`)**: Apresentação de José Menezes como vereador de Anadia, pilares do mandato (Transparência, Proximidade, Rigor), biografia provisória e linha do tempo de marcos, grelha multimédia com vídeos do YouTube e atalhos para todas as áreas do site.
2. **Compromissos Cumpridos (`compromissos.html`)**: Painel de acompanhamento das propostas eleitorais com contadores estatísticos em tempo real, 4 estados visuais (*Implementada*, *Em execução*, *Em análise*, *Não implementada*), filtros rápidos, pesquisa e janela modal de consulta de evidências autárquicas.
3. **A Sua Voz Conta (`a-sua-voz-conta.html`)**: Canal de participação cidadã com envio anónimo opcional, contador de carateres, validação e seleção entre «Município de Anadia — Geral» e as 10 freguesias oficiais do concelho. Preparado para envio direto via **EmailJS**.
4. **Reuniões de Câmara (`reunioes.html`)**: Histórico cronológico das sessões ordinárias quinzenais, declarações de voto, propostas apresentadas e estados das deliberações, com pesquisa por palavras-chave e filtro por ano.
5. **Militantes (`militantes.html`)**: Lista organizada por ordem alfabética, filtro por iniciais (A-Z) e barra de pesquisa instantânea à medida que o utilizador escreve. (Com aviso de conformidade RGPD).
6. **Comunidade (`comunidade.html`)**: Página dedicada à comunidade no WhatsApp, com descrição dos objetivos, regras de convivência, aviso de privacidade sobre a visibilidade do número e botão de adesão ligado à hiperligação de convite.

---

## 🛠️ Como Personalizar os Conteúdos

### 1. Fotografia Oficial de José Menezes
- Guarde a sua fotografia profissional na pasta `assets/images/` (por exemplo: `foto-jose-menezes.jpg`).
- No ficheiro `index.html`, procure por:
  ```html
  <img src="assets/images/placeholder-avatar.svg" alt="...">
  ```
  e substitua pelo caminho da sua fotografia:
  ```html
  <img src="assets/images/foto-jose-menezes.jpg" alt="José Menezes, Vereador da Câmara Municipal de Anadia">
  ```

### 2. Configurar o WhatsApp e as Redes Sociais
Abra o ficheiro `js/config.js` e altere os campos correspondentes:
```javascript
whatsappInviteUrl: "https://chat.whatsapp.com/SEU_LINK_REAL_AQUI",

redesSociais: {
  facebook: "https://www.facebook.com/oseu.perfil",
  instagram: "https://www.instagram.com/oseu.perfil",
  youtube: "https://www.youtube.com/@oseu.canal",
  x: "https://x.com/oseu.perfil"
}
```

### 3. Configurar o Envio de Emails (EmailJS)
No ficheiro `js/config.js`, introduza as credenciais obtidas em [emailjs.com](https://www.emailjs.com/):
```javascript
emailjs: {
  publicKey: "SUA_PUBLIC_KEY",
  serviceId: "SEU_SERVICE_ID",
  templateId: "SEU_TEMPLATE_ID"
}
```
*Enquanto não preencher estas três chaves, o formulário valida os dados e avisa amigavelmente o utilizador de que está em modo de demonstração, sem simular envios falsos.*

### 4. Adicionar ou Modificar Propostas, Reuniões e Militantes
Não precisa de alterar o código HTML das páginas. Basta editar os ficheiros respetivos na pasta `js/data/`:
- `js/data/propostas.js`: Adicione novos objetos à lista `PROPOSTAS_DATA`.
- `js/data/reunioes.js`: Adicione novas reuniões a `REUNIOES_DATA`.
- `js/data/militantes.js`: Adicione os nomes autorizados a `MILITANTES_DATA`.
- `js/data/videos.js`: Atualize os IDs dos vídeos do YouTube em `VIDEOS_DATA`.

---

## 🚀 Como Visualizar Localmente

### Com Python (Recomendado):
```bash
python -m http.server 5500
```
Depois abra no navegador: `http://localhost:5500/`

### Com Node.js / npx:
```bash
npx serve -l 5500 .
```

---

## 🌍 Domínio Personalizado (Dominios.pt) & GitHub Pages

Quando desejar publicar o website:
1. Copie o ficheiro `CNAME.example` para `CNAME`.
2. Insira o seu domínio adquirido no Dominios.pt (ex: `josemenezes.pt`).
3. No painel de DNS do Dominios.pt, configure:
   - Registos `A` a apontar para os IPs do GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Registo `CNAME` para o subdomínio `www` a apontar para o seu endereço GitHub (`seu-utilizador.github.io`).
