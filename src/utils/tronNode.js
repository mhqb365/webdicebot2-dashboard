const URL = {
    DEV: 'https://shasta.tronscan.org/#/',
    PROD: 'https://tronscan.org/#/'
}

const TRON_NODE = window.location.hostname == 'localhost' ? URL.DEV : URL.PROD

export default TRON_NODE