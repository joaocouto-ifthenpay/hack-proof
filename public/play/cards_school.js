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
    }
];