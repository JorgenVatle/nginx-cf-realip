import CloudFlareIps from "./CloudFlareIps";
import expect from "expect";

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
        console.log(ipv4Array[0]);
        expect(
            ipv4Array[0].match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([0-9]|[1-6][0-9])$/)
        ).toBeTruthy();
    });
});