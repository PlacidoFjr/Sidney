# Validação da prévia — 27/10/2026

- Sintaxe: `node --check` em `config.js`, `script.js` e `portfolio.js`, sem erros.
- HTTP: home e portfólio retornaram 200 no servidor local.
- Filtro Maquiagem: 3 registros corretos; Todos: 6. O filtro escolhido pode ser compartilhado por parâmetro `categoria`.
- Visualizador: abre a fotografia, mostra contador 1/3 na seleção filtrada e avança para a próxima foto; caption, crédito e URL de consulta mudam junto.
- WhatsApp do portfólio: número 5571987547508, título e publicação original incluídos na mensagem preparada. Não foi enviado contato.
- Assistente: horário, preço, dúvida sobre estacionamento e pedido para sábado receberam respostas correspondentes; valor desconhecido e dúvida não coberta não foram inventados.
- Assistente na página de portfólio: perguntar sobre maquiagem e clicar em preparar pedido abre a home com serviço Maquiagem selecionado.
- Formulário: pedido de teste com data 31/10/2026 gerou texto e número corretos; o site somente abriu a página de preparação do WhatsApp, sem enviar a mensagem. Data mínima lida: 27/10/2026.
- Navegador: nenhum erro ou aviso nos logs da home e do portfólio nas verificações executadas.
- Responsivo: 390×844 e 320×740; largura de conteúdo dentro da tela, menu móvel abre e fecha, seis imagens carregadas. Assistente em 320px: limites esquerdo 12px/direito 293px dentro da área útil de 305px.
- Capturas em `docs/portfolio-desktop.png`, `docs/portfolio-mobile.png` e `docs/chatbot-mobile.png`. A captura de conversa fornecida pelo usuário está fora da pasta pública.
- Limite de publicação: `sites.create_site` indisponível ao modelo nesta sessão. Nenhum projeto remoto ou link público foi criado. Prévia em `http://127.0.0.1:4175/portfolio.html`.

## Modo escuro

- Adicionado às duas páginas, com botão de sol/lua, nome acessível e aplicação do tema antes de carregar os estilos.
- Alternância para claro, recarregamento e navegação ao portfólio preservaram a escolha; retorno ao escuro também foi validado. A escolha segue o aparelho quando não há preferência salva.
- Filtro de maquiagem e respostas do chatbot funcionaram no tema escuro, sem erros nos logs observados.
- Tela de 320×740: conteúdo 305px dentro da largura útil, botão de 42×42px sem conflito com menu/agendamento; chatbot conferido. Capturas `modo-escuro-desktop.png` e `modo-escuro-mobile.png`.
- Preferência visual persistida localmente; conversas e dados do formulário continuam sem armazenamento.
