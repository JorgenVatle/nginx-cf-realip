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
    public async getList(version: ipVersion): Promise<string> {
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
    public async getArray(version: ipVersion): Promise<Array<string>> {
        return this.listToArray(await this.getList(version));
    }

    /**
     * All available CloudFlare IPs.
     */
    public async all(): Promise<Array<string>> {
        const v4 = await this.getArray(4);
        const v6 = await this.getArray(6);

        return [...v4, ...v6];
    }
}