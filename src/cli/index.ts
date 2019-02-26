import FS from 'fs';
import Path from 'path';
import Commander from 'commander';
import Chalk from 'chalk';
import NginxRealip from "../NginxRealip";

const realip = new NginxRealip();
const cli = Commander
    .option('-d, --destination <path>', 'Destination path for NGINX realip list.', './cf-realip.conf')
    .option('-h, --header <header>', 'Header to fetch realip from.', 'CF-Connecting-IP')
    .version(require('../../package.json').version)
    .parse(process.argv);

realip.buildConfig(cli.header).then((config) => {
    let base;

    try {
        if (FS.lstatSync(cli.destination).isDirectory()) {
            base = 'cf-realip.conf';
        }
    } catch {}

    const path = Path.format({
        dir: cli.destination,
        base,
    });

    FS.writeFileSync(path, config);

    console.log(Chalk.green('\nAdded updated CloudFlare realip file to:'), Path.resolve(path));
}).catch((exception) => {
    console.debug(Chalk.red(exception) + '\n');
    console.error(Chalk.bgRed(`Could not create NGINX realip file for the provided path`));
    console.log(Chalk.underline(cli.destination + '\n'));
    console.log(`Check the destination path and try again. ${Chalk.blue(`(Hint: Try to use just ${Chalk.yellow('-p .')})`)}`);
    console.log(`Use ${Chalk.yellow('--help')} to view a list of options\n`);
});