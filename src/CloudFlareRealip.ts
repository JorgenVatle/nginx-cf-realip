import Axios from 'axios';

export default class CloudFlareRealip {

    /**
     * Axios instance for CloudFlare
     */
    private readonly cloudflare = Axios.create({
        baseURL: 'https://cloudflare.com',
    });

}