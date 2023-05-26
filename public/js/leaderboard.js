/**
*   Array colors descreve as cores de cada equipa.
*   Com camel case, o nomes passam a ter espaço
*/
const colors = {
    ispgaya: 'orange'
};

// Obter dados do leaderboard a partir da base de dados
const getLeaderboard = () => {
    const database = firebase.database().ref('score');

    database.once('value')
        .then(snapshot => {
            const leaderboardDatabase = Object.values(snapshot.val() || []);
            leaderboardDatabase.sort((a, b) => b.score - a.score);

            /**
             * Usar o método slice(0, 5) no array leaderboardDatabase antes de mapeá-lo para o array leaderboard. 
             * Isso garante que apenas os 5 primeiros elementos sejam considerados. 
             */
            const leaderboard = leaderboardDatabase.slice(0, 5).map(data => ({
                name: data.name,
                team: 'ispgaya',
                score: data.score
            }));

            console.log(leaderboard);
            renderLeaderboard(leaderboard);
        })
        .catch(error => {
            console.log('Erro ao obter os dados da classificação dos jogadores:', error);
        });
};


const renderLeaderboard = leaderboard => {
    const main = d3.select('table');

    const players = main
        .selectAll('tr.driver')
        .data(leaderboard)
        .enter()
        .append('tr')
        .attr('class', 'driver');

    players
        .append('td')
        .text((d, i) => i + 1)
        .attr('class', 'position');

    players
        .append('td')
        .html(({
            name,
            team
        }) => {
            const formattedName = name ? name.split(' ').map((part, index) => (index > 0 ? `<strong>${part}</strong>` : `${part}`)).join(' ') : '(Sem nome)';
            return `${formattedName} <small>${team}</small>`;
        })
        .style('border-left', ({
            team
        }) => {
            const color = team.split(' ').map((word, index) => (index > 0 ? `${word[0].toUpperCase()}${word.slice(1)}` : `${word}`)).join('');
            return `4px solid ${colors[color]}`;
        })
        .attr('class', 'driver');

    players
        .append('td')
        .attr('class', 'score')
        .append('span')
        .text(({
            score
        }) => score);
};


// Chamar a função para obter e renderizar o top 5 do leaderboard
getLeaderboard();