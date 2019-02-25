import Commander from 'commander';

Commander.version(require('../package.json').version)
    .option('-d, --destination <path>', 'Destination path for NGINX realip list. [Default: /etc/nginx/util]')
    .option('-h, --h <header>', 'Header to fetch realip from. defaults to [Default: CF-Connecting-IP]')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    Commander.help();
}