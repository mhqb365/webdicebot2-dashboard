const URL = {
    DEV: 'https://shastapi.tronscan.org',
    PROD: 'https://apilist.tronscan.org'
}

const TRON_API = window.location.hostname == 'localhost' ? URL.DEV : URL.PROD

export default TRON_API