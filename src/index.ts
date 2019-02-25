import FS from 'fs';
import Path from 'path';
import Commander from 'commander';
import Chalk from 'chalk';
import NginxRealip from "./NginxRealip";

const realip = new NginxRealip();
const cli = Commander.version(require('../package.json').version)
    .option('-d, --destination <path>', 'Destination path for NGINX realip list.', '.')
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
}).catch((exception) => {
    console.debug(Chalk.red(exception) + '\n');
    console.error(Chalk.bgRed(`Could not create NGINX realip file for the provided path`));
    console.log(Chalk.underline(cli.destination + '\n'));
    console.log(`Check the destination path and try again. ${Chalk.blue(`(Hint: Try to use just ${Chalk.yellow('-p .')})`)}`);
    console.log(`Use ${Chalk.yellow('--help')} to view a list of options\n`);
});