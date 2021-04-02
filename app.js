const axios = require('axios')
const postJSON = require('./post.json')
require('dotenv').config()

const teamsURL = process.env.TEAMS_WEBHOOK_URL

const postTeams = async () => {
    const res = await axios
                        .post(teamsURL, postJSON)
                        .catch((error) => console.log(error))
    console.log(`statusCode: ${res.data}`)
}

const getTrainDelayInfo = async () => {
    await axios
            .get('https://tetsudo.rti-giken.jp/free/delay.json')
            .then((res) => res.data.some((info) => info.name === '京急線'))
            .then((isDelay) => isDelay && postTeams())
            .catch((error) => console.log(error))
}

getTrainDelayInfo()
