# nginx-cf-realip
Update your CloudFlare realip list with a simple commandline utility.

## Installation
```bash
npm install -g nginx-cf-realip
```
## Options
```text
$ nginx-cf-realip [options]

Options:
  -V, --version             output the version number
  -d, --destination <path>  Destination path for NGINX realip list. (default: "./cf-realip.conf")
  -h, --header <header>     Header to fetch realip from. (default: "CF-Connecting-IP")
  -h, --help                output usage information
```

## Usage

Create a `cf-realip.conf` file in the current directory:
```bash
nginx-cf-realip
```

You can also define a desitnation path:
```bash
nginx-cf-realip -d /etc/nginx   # -d can be either a file or directory path.
```