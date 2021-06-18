const URL = {
    DEV: 'http://localhost:8001',
    PROD: 'https://api.webdicebot.xyz'
}

const BOT_API = window.location.hostname == 'localhost' ? URL.DEV : URL.PROD

export default BOT_API