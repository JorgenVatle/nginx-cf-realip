import CloudFlareIps from "./CloudFlareIps";
import expect from "expect";

describe('cloudflare ips', () => {
    const ips = new CloudFlareIps();

    it('can fetch ipv4 plaintext lists', async () => {
        const ipv4List = await ips.getList(4);
        expect(ipv4List.length).toBeGreaterThan(1);
    });

    it('can fetch ipv6 plaintext lists', async () => {
        const ipv6List = await ips.getList(6);
        expect(ipv6List.length).toBeGreaterThan(1);
    });

    it('can fetch ipv4 arrays', async () => {
        const ipv4Array = await ips.getArray(4);
        expect(ipv4Array.length).toBeGreaterThan(1);
    });

    it('can fetch ipv6 arrays', async () => {
        const ipv6Array = await ips.getArray(6);
        expect(ipv6Array.length).toBeGreaterThan(1);
    });
});