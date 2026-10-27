# Sidney Cabeleireiros

Site de apresentação e portfólio para o salão em Candeias, Bahia. Feito com HTML, CSS e JavaScript, sem build e sem dependências de execução.

![Portfólio do salão](docs/portfolio-desktop.png)

## Recursos

- Portfólio com seis registros reais, filtros por categoria e visualizador de fotos.
- Consulta por trabalho no WhatsApp, incluindo a referência da publicação.
- Apresentação do salão, serviços, contatos e pedido de agendamento.
- Assistente de dúvidas por respostas prontas e palavras-chave, sem IA, API ou assinatura.
- Temas claro e escuro, com preferência visual salva no navegador.
- Layout responsivo, navegação por teclado e respeito à preferência de movimento reduzido.

O assistente não confirma preços nem horários disponíveis. O formulário prepara uma mensagem; o visitante revisa e decide enviá-la no WhatsApp. Conversas e dados do formulário não são armazenados no site. Apenas a preferência de tema usa armazenamento local.

## Executar localmente

```sh
cd dist
python -m http.server 4175 --bind 127.0.0.1
```

Abra o portfólio em `http://127.0.0.1:4175/portfolio.html` ou a apresentação em `http://127.0.0.1:4175/index.html`.

## Estrutura

```text
dist/
  index.html       Apresentação e pedido de agendamento
  portfolio.html   Galeria de trabalhos
  styles.css       Estilos compartilhados
  portfolio.css    Apresentação do portfólio
  config.js        Contatos, respostas e regras do assistente
  script.js        Interações compartilhadas
  portfolio.js     Filtros e consulta por trabalho
  theme.js         Preferência de tema
  theme.css        Paleta escura e seletor
  assets/          Fotos, fontes e licenças
docs/
  FONTES.md        Origem das imagens e informações
  VALIDACAO.md     Verificações realizadas na prévia
```

Para hospedagem estática, publique o conteúdo de `dist/`. Não há comando de build. Este repositório não ativa publicação automática.

## Conteúdo e manutenção

Contatos e respostas do assistente ficam em `dist/config.js`; textos e trabalhos estão nos arquivos HTML. A seleção usa fotografias autorizadas pelo usuário, com origem e créditos registrados em [FONTES.md](docs/FONTES.md). Fontes Cormorant Garamond e Manrope distribuídas sob SIL Open Font License; licenças em `dist/assets/`.

Esta é uma versão de apresentação, ainda sujeita à revisão do salão. Confirmar o número do endereço e as informações comerciais antes do lançamento; a página usa a rua e o link Maps divulgado no perfil. A marcação `noindex,nofollow` permanece durante a revisão.

![Modo escuro](docs/modo-escuro-desktop.png)
