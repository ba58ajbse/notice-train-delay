const axios = require('axios')
const postJSON = require('./post.json')
require('dotenv').config()

const teamsURL = process.env.TEAMS_WEBHOOK_URL

const filterInfo = (data) => {
    const isDelay = data.some((item) => item.name === '京急線')
    if (isDelay) {
        postTeams()
    }
}

const postTeams = () => {
    axios
    .post(teamsURL, postJSON)
    .then((res) => {
        console.log(`statusCode: ${res.data}`)
    })
    .catch((error) => {
        console.log(error)
    })
}

const getTrainDelayInfo = async () => {
    try {
        const response = await axios.get('https://tetsudo.rti-giken.jp/free/delay.json')
        filterInfo(response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}

getTrainDelayInfo()
