const URL = {
    DEV: 'https://shastapi.tronscan.org/api',
    PROD: 'https://apilist.tronscan.org/api'
}

const TRON_API_LIST = window.location.hostname == 'localhost' ? URL.DEV : URL.PROD

export default TRON_API_LIST