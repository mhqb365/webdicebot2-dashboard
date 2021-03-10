const URL = {
    DEV: 'https://api.shasta.trongrid.io',
    PROD: 'https://api.trongrid.io'
}

const TRON_NODE = window.location.hostname == 'localhost' ? URL.DEV : URL.PROD

export default TRON_NODE