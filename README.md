# nginx-cf-realip
Update your CloudFlare realip list with a simple commandline utility.

### Why?
CloudFlare essentially acts as a reverse proxy for your website, meaning requests to your servers served by CloudFlare
are in fact coming from CloudFlare's servers not your visitors. This means that in certain situations, such as for
your NGINX access logs you'll see CloudFlare's IP addresses instead of your visitors'. This can be problematic for
services that rely on visitor's true IP addresses. Particularly if you're relying on a fraud prevention system that
requires visitor IPs.

See [CloudFlare's support article on the topic](https://support.cloudflare.com/hc/en-us/articles/200170706-How-do-I-restore-original-visitor-IP-with-Nginx-) 
for a much better explaination.

This package helps you keep CloudFlare's list or IP addresses updated with a simple command: `nginx-cf-realip`.

### Requirements
- [npm](https://www.npmjs.com/get-npm) v4.6.1 or higher.

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

You can also define a destination path:
```bash
nginx-cf-realip -d /etc/nginx   # -d can be either a file or directory path.
```

Then, include your generated `cf-realip.conf` file in your NGINX configuration. (Default path: `/etc/nginx/nginx.conf`)
```nginx
http {
    # ...
    include /etc/nginx/cf-realip.conf;
    # ...
}
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2019, Jørgen Vatle.