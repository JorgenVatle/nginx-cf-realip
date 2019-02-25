import CloudFlareIps from "./CloudFlareIps";

type RealipHeader = 'CF-Connecting-IP' | 'X-Forwarded-For' | string;

export default class NginxRealip {

    /**
     * CloudFlare IPs
     */
    private readonly ips = new CloudFlareIps();

    /**
     * NGINX `set_real_ip_from` rules.
     */
    protected async rules() {
        const ips = await this.ips.all();
        return ips.map((ip) => {
            return `set_real_ip_from ${ip}`
        });
    }

    /**
     * Serialize the given NGINX ruleset.
     *
     * @param rules
     */
    protected serialize(rules: Array<string>) {
        return rules.concat(';\n');
    }

    /**
     * Build NGINX configuration for the given realip header.
     */
    public async buildConfig(realipHeader: RealipHeader = 'CF-Connecting-IP') {
        return this.serialize([...await this.rules(), `real_ip_header ${realipHeader}`]);
    }
}