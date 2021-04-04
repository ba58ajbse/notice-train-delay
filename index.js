const axios = require('axios');
const qs = require('querystring');
require('dotenv').config();

const LINE_TOKEN = process.env.LINE_TOKEN;
const LINE_URL = 'https://notify-api.line.me/api/notify';
const HP = 'https://unkou.keikyu.co.jp/';
const TWITTER = 'https://twitter.com/keikyu_official';

const message = `\n京急線の遅延があります\n
                HP: ${HP}\n
                Twitter: ${TWITTER}`;

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
};

exports.handler = async function(event, context) {
    const res = await axios
                        .get('https://tetsudo.rti-giken.jp/free/delay.json')
                        .catch((error) => console.log(error));
    const isDelay = res.data.some((data) => data.name === '京急線');
    if (isDelay) {
        await axios
                .request(config)
                .then((res) => console.log(`post status: ${res.data}`))
                .catch((error) => console.log(error));
    } else {
        console.log('遅延はありません');
    }
};
