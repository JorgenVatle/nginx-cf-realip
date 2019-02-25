import Axios from 'axios';

type ipVersion = 6 | 4;

export default class CloudFlareIps {

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
    protected async getIpList(version: ipVersion) {
        const request = await this.cloudflare.get(`/ips-v${version}`);
        return request.data;
    }

    /**
     * Fetch an array of IPs for the given IP version.
     *
     * @param version
     */
    protected async getIpArray(version: ipVersion) {
        return this.listToArray(await this.getIpList(version));
    }

    /**
     * Convert a list separated by linebreaks to an array.
     *
     * @param list
     */
    protected listToArray(list: string) {
        return list.split(/\n/);
    }

}