// You can add new scenarios, but make sure that there is exactly...
// * 1 hackerCard per scenario
// * 3 playerCards per scenario

var scenarios = [
    {
        hackerCard: {
            description: "Lancei diversos ataques de phishing.",
            power: 4,
        },
        playerCards: [
            {
                description: "O utilizador utiliza software antiphishing para poder detetar e bloquear sites de phishing.",
                power: 1,
            },
            {
                description: "O utilizador utiliza software antiphishing e adicionar uma proteção adicional de autenticação de dois fatores para ultrapassar diversos problemas.",
                power: 2,
            },
            {
                description: "O utilizador deve ser informado dos riscos que corre quando navega na internet, deve obter educação e formação para identificar possíveis ameaças de phishing em conjunto com o uso de software antiphishing e autenticação de dois fatores.",
                power: 4,
            }
        ]
    },
    {
        hackerCard : {
          description : "I sent a fake email from your bank asking for your account details.",
          power : 3,
        },
        playerCards : [
          {
            description : "I checked the email address - the message didn’t come from my bank.",
            power : 5,
          },
          {
            description : "I never give out personal information in response to an email.",
            power : 4,
          },
          {
            description : "I sent the details you asked for so you could check on my account.",
            power : 1,
          }
        ]
    }
];