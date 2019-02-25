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
    protected async getList(version: ipVersion) {
        const request = await this.cloudflare.get(`/ips-v${version}`);
        return request.data;
    }

    /**
     * Convert a list separated by linebreaks to an array.
     *
     * @param list
     */
    protected listToArray(list: string) {
        return list.split(/\n/);
    }

    /**
     * Fetch an array of IPs for the given IP version.
     *
     * @param version
     */
    public async getArray(version: ipVersion) {
        return this.listToArray(await this.getList(version));
    }
}