import Commander from 'commander';

Commander.version(require('../package.json').version).parse(process.argv);

if (!process.argv.slice(2).length) {
    Commander.help();
}