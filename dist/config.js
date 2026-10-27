window.SALON_CONFIG = {
  name: 'Sidney Cabeleireiros',
  whatsapp: '5571987547508',
  phone: '+557136055446',
  instagram: 'https://www.instagram.com/sidneycabeleireiros/',
  maps: 'https://g.co/kgs/8rfwxJ3',
  welcome: 'Olá! Posso ajudar com informações do Sidney Cabeleireiros. Escolha um assunto ou escreva sua dúvida.',
  topics: [
    {id: 'services', label: 'Serviços'},
    {id: 'hours', label: 'Horários'},
    {id: 'location', label: 'Onde fica?'},
    {id: 'prices', label: 'Valores'},
    {id: 'booking', label: 'Agendar'},
    {id: 'team', label: 'Falar com a equipe'}
  ],
  answers: {
    services: {text: 'O perfil do salão apresenta cortes, mechas, cachos, alongamento, maquiagem, corte masculino e produções para noivas e eventos. Qual serviço você gostaria de consultar?', action: 'booking'},
    hours: {text: 'O horário divulgado pelo salão é de terça a sábado, das 8h30 às 19h30. Para feriados ou horários disponíveis, confirme com a equipe pelo WhatsApp.', action: 'whatsapp'},
    location: {text: 'O salão fica na Rua 21 de Abril, Centro, em Candeias/BA. O link abaixo abre a localização divulgada no perfil.', action: 'maps'},
    prices: {text: 'O valor depende do serviço e da avaliação da equipe. Ainda não tenho uma tabela confirmada aqui. Pelo WhatsApp, conte o que você deseja fazer para receber orientação.', action: 'whatsapp'},
    booking: {text: 'Você pode preparar um pedido com o serviço e a data desejada. A equipe confirma a disponibilidade e os detalhes pelo WhatsApp. Este assistente não faz reservas.', action: 'booking'},
    team: {text: 'Claro! Continue com a equipe do Sidney Cabeleireiros pelo WhatsApp. Você revisa a mensagem antes de enviar.', action: 'whatsapp'},
    bridal: {text: 'O perfil do salão divulga dia de noiva, debutantes e produções para eventos. Informe a data e o tipo de ocasião no pedido; opções, valores e disponibilidade são confirmados pela equipe.', action: 'booking', service: 'Noivas e eventos'},
    hair: {text: 'Cortes, mechas, cachos e alongamento estão entre os trabalhos divulgados. A equipe pode avaliar o que você procura e orientar sobre valores e atendimento.', action: 'booking', service: 'Cabelos e cor'},
    makeup: {text: 'O salão divulga produções de maquiagem para ocasiões especiais. Conte a data e o tipo de evento para consultar os detalhes com a equipe.', action: 'booking', service: 'Maquiagem'},
    payment: {text: 'Ainda não tenho as formas de pagamento confirmadas pelo salão. A equipe pode informar esse detalhe pelo WhatsApp.', action: 'whatsapp'},
    availability: {text: 'Não tenho acesso à agenda do salão. Você pode informar o serviço e o dia desejado; a equipe confirma os horários pelo WhatsApp.', action: 'booking'},
    greeting: {text: 'Olá! Tudo bem? Posso ajudar com serviços, horários, localização e pedido de agendamento. Qual assunto você procura?'},
    thanks: {text: 'Por nada! Se precisar combinar seu atendimento, a equipe está no WhatsApp.', action: 'whatsapp'},
    unknown: {text: 'Ainda não tenho essa resposta. Posso preparar sua dúvida para você enviar à equipe pelo WhatsApp.', action: 'whatsapp'}
  },
  // As regras são locais e explícitas. A primeira correspondência define a resposta.
  rules: [
    {intent: 'prices', pattern: /\b(preco|precos|valor|valores|custa|custo|quanto|orcamento|tabela)\b/},
    {intent: 'payment', pattern: /\b(pagamento|pagar|pix|cartao|credito|debito|parcela|parcelamento)\b/},
    {intent: 'availability', pattern: /\b(vaga|vagas|disponivel|disponibilidade|encaixe)\b/},
    {intent: 'booking', pattern: /\b(agendar|agendamento|marcar|reservar|reserva)\b/},
    {intent: 'hours', pattern: /\b(horario|horarios|funciona|funcionamento|abre|aberto|fecha|fechado|domingo|segunda|sabado|feriado)\b/},
    {intent: 'availability', pattern: /\b(hoje|amanha|agora)\b/},
    {intent: 'location', pattern: /\b(onde|endereco|local|localizacao|chegar|rota|rua|cidade|candeias)\b/},
    {intent: 'team', pattern: /\b(equipe|humano|pessoa|atendente|telefone|contato|whatsapp|zap|ligar|falar)\b/},
    {intent: 'bridal', pattern: /\b(noiva|noivas|noivo|casamento|debutante|debutantes|evento|eventos|festa)\b/},
    {intent: 'makeup', pattern: /\b(maquiagem|make|maquiar)\b/},
    {intent: 'hair', pattern: /\b(cabelo|cabelos|corte|mecha|mechas|cacho|cachos|cacheado|alongamento|coloracao|loiro|masculino)\b/},
    {intent: 'booking', pattern: /\b(agendar|agendamento|agenda|marcar|reservar|reserva|atendimento)\b/},
    {intent: 'services', pattern: /\b(servico|servicos|oferece|oferecem|faz|fazem)\b/},
    {intent: 'thanks', pattern: /\b(obrigado|obrigada|valeu|agradeco)\b/},
    {intent: 'greeting', pattern: /^(oi|ola|bom dia|boa tarde|boa noite|tudo bem|hey)[!.?\s]*$/}
  ]
};
