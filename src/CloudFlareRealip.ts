import Axios from 'axios';

export default class CloudFlareRealip {

    /**
     * Axios instance for CloudFlare
     */
    private readonly cloudflare = Axios.create({
        baseURL: 'https://cloudflare.com',
    });

    /**
     * Fetch a list of IPs for the given IP version.
     *
     * @param version
     */
    protected async getIpList(version: 6 | 4) {
        const request = await this.cloudflare.get(`/ips-v${version}`);
        return request.data;
    }
}