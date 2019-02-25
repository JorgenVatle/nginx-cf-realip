import FS from 'fs';
import Path from 'path';
import Commander from 'commander';
import NginxRealip from "./NginxRealip";

const realip = new NginxRealip();
const cli = Commander.version(require('../package.json').version)
    .option('-d, --destination <path>', 'Destination path for NGINX realip list.', '/etc/nginx/util/cf-realip.conf')
    .option('-h, --header <header>', 'Header to fetch realip from.', 'CF-Connecting-IP')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    Commander.help();
}

realip.buildConfig(cli.header).then((config) => {
    let base = '.';

    try {
        if (FS.lstatSync(cli.destination).isDirectory()) {
            base = 'cf-realip.conf';
        }
    } catch {}

    FS.writeFileSync(Path.format({
        dir: cli.destination,
        base,
    }), config);
});