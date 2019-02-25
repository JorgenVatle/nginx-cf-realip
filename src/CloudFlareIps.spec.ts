import CloudFlareIps from "./CloudFlareIps";
import expect from "expect";
const rangeCheck = require('range_check');

describe('cloudflare ips', () => {
    const ips = new CloudFlareIps();

    it('can fetch ipv4 plaintext lists', async () => {
        const ipv4List = await ips.getList(4);
        expect(ipv4List.length).toBeGreaterThan(0);
    });

    it('can fetch ipv6 plaintext lists', async () => {
        const ipv6List = await ips.getList(6);
        expect(ipv6List.length).toBeGreaterThan(0);
    });

    it('can fetch ipv4 arrays', async () => {
        const ipv4Array = await ips.getArray(4);
        expect(ipv4Array.length).toBeGreaterThan(0);
    });

    it('can fetch ipv6 arrays', async () => {
        const ipv6Array = await ips.getArray(6);
        expect(ipv6Array.length).toBeGreaterThan(0);
    });

    it('fetches valid ipv4 ranges', async () => {
        const ipv4Array = await ips.getArray(4);
        const ip = ipv4Array[0];
        expect(
            ip.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([0-9]|[1-6][0-9])$/)
        ).toBeTruthy();
        expect(rangeCheck.isRange(ip)).toBeTruthy();
    });

    it('fetches valid ipv6 ranges', async () => {
        const ipv6Array = await ips.getArray(6);
        const ip = ipv6Array[0];
        expect(
            ip.match(/^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/i)
        ).toBeTruthy();
        expect(rangeCheck.isRange(ip)).toBeTruthy();
    });
});