import CloudFlareIps from "./CloudFlareIps";

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

}