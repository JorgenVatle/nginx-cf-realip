import NginxRealip from "./NginxRealip";
import expect = require("expect");

describe('nginx realip', () => {
    const nginxRealip = new NginxRealip();

    it('can build a configuration file', async () => {
        const config = await nginxRealip.buildConfig();
        expect(config.length).toBeGreaterThan(0);
        expect(typeof config).toBe('string');
    });
});