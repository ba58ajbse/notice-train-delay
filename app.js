const axios = require('axios')
const qs = require('querystring')
require('dotenv').config()

const LINE_TOKEN = process.env.LINE_TOKEN
const LINE_URL = 'https://notify-api.line.me/api/notify'
const HP = 'https://unkou.keikyu.co.jp/'
const TWITTER = 'https://twitter.com/keikyu_official'

const message = `\n京急線の遅延があります\n
                HP: ${HP}\n
                Twitter: ${TWITTER}`

const config = {
    url: LINE_URL,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${LINE_TOKEN}`
    },
    data: qs.stringify({
        message: message
    })
}

const postLine = async () => {
    axios
    .request(config)
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error))
}

const getTrainDelayInfo = async () => {
    await axios
            .get('https://tetsudo.rti-giken.jp/free/delay.json')
            .then((res) => res.data.some((info) => info.name === '京急線'))
            .then((isDelay) => isDelay && postLine())
            .catch((error) => console.log(error))
}

getTrainDelayInfo()
