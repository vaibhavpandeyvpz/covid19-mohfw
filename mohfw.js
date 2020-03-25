const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://www.mohfw.gov.in/';

module.exports = async () => {
    let response;
    try {
        response = await axios.get(URL);
    } catch (ignore) {
    }
    if (response && (response.status === 200)) {
        const states = [];
        const $ = cheerio.load(response.data);
        $('#cases .table > tbody > tr').each((i, el) => {
            const cells = $(el).find('td');
            if (cells.length !== 6) {
                return
            }
            const state = $(cells[1]).text().trim();
            const cases_domestic = $(cells[2]).text().trim();
            const cases_international = $(cells[3]).text().trim();
            const recoveries = $(cells[4]).text().trim();
            const deaths = $(cells[5]).text().trim();
            states.push({
                state,
                cases_domestic: parseInt(cases_domestic),
                cases_international: parseInt(cases_international),
                recoveries: parseInt(recoveries),
                deaths: parseInt(deaths),
            })
        });
        states.sort((a, b) => {
            const a2 = a.state.toLowerCase(),
                  b2 = b.state.toLowerCase();
            if (a2 < b2) {
                return -1
            } else if (a2 > b2) {
                return 1
            }
            return 0
        });
        const totals = {
            cases_domestic: 0,
            cases_international: 0,
            recoveries: 0,
            deaths: 0,
        };
        states.forEach(x => {
            totals.cases_domestic += x.cases_domestic;
            totals.cases_international += x.cases_international;
            totals.recoveries += x.recoveries;
            totals.deaths += x.deaths
        });
        return { states, totals }
    }
    return null
};
