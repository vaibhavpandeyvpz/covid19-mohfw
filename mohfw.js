const axios = require('axios');

const URL = 'https://www.mohfw.gov.in/data/datanew.json';

module.exports = async () => {
    let response;
    try {
        response = await axios.get(URL);
    } catch (ignore) {
    }
    if (response && (response.status === 200)) {
        const states = [];
        response.data.forEach(metric => {
            if (metric.state_name && metric.sno !== '11111') {
                states.push({
                    state: metric.state_name,
                    cases: parseInt(metric.active),
                    recoveries: parseInt(metric.cured),
                    deaths: parseInt(metric.death),
                    total: parseInt(metric.positive)
                })
            }
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
            cases: 0,
            recoveries: 0,
            deaths: 0,
            total: 0,
        };
        states.forEach(x => {
            totals.cases += x.cases;
            totals.recoveries += x.recoveries;
            totals.deaths += x.deaths;
            totals.total += x.total
        });
        return { states, totals }
    }
    return null
};
