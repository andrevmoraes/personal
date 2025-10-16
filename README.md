# Zune Treinos

Versão unificada e pronta para deploy do app inspirado no Windows Phone 8.1 (Metro UI).

Conteúdo do projeto:
- `index.html` — aplicação single-page com pivots/abas e fichas de treino.
- `css/styles.css` — estilos Metro, modo escuro por padrão (OLED true black).
- `js/main.js` — persistência via localStorage, indicadores de progresso e reset por formulário.
- `package.json` — scripts `dev`, `build`, `preview` (Vite).

Requisitos: Node.js + npm (para usar Vite localmente). Não são necessárias bibliotecas externas para rodar a app.

Rodando localmente:

1. Instale dependências:

```bash
npm install
```

2. Desenvolvimento (servidor local):

```bash
npm run dev
```

O Vite servirá o site (endereço mostrado no terminal). Acesse no celular pela rede local se precisar.

Build para produção:

```bash
npm run build
```

Isso gera a pasta `dist/`, pronta para publicar.

Deploy no Vercel:

- Conecte o repositório no Vercel.
- Build command: `npm run build`
- Output directory: `dist`

Deploy no Render (Static Site):

- Crie um novo "Static Site" no Render.
- Connect repository and set build command: `npm run build`
- Publish directory: `dist`

Observações sobre design e acessibilidade:
- Tipografia usa `Segoe UI` quando disponível, com fallbacks.
- Foco e contraste pensados para leitura em ambientes de treino (OLED dark preferred).
- Persistência simples via localStorage (pode ser enviado a backend futuro).

Checklist de testes manuais (no celular):
- Abrir a página e confirmar que o fundo é preto verdadeiro.
- Tocar na aba "Treino C" e ver a ficha completa.
- Tocar nos quadrados de séries — cada um deve marcar/desmarcar e o contador (x / y) deve atualizar.
- Pressionar "Resetar Séries" limpa as caixas e zera o contador.
- Abrir link "Assistir vídeo" abre em nova aba.
- Alternar o tema (toggle) e recarregar a página — o tema salvo deve persistir.

Próximos passos recomendados:
- (opcional) sincronizar com backend para histórico/usuário.
- (opcional) testes automatizados de integração e linting.

