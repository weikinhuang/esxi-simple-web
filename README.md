esxi-simple-web
===============

Basic controls straight from the esxi host in the browser

This allows you to run basic operations against the ESXi MOB api from a simple
web interface straight from the ESXi host without the need for the vCenter web client.

Inspired by virtuallyGhetto's [Ghetto webAccess for ESXi](http://www.virtuallyghetto.com/2011/12/ghetto-webaccess-for-esxi.html)

## Installation & Usage

Copy over the web directory to your esxi host with

```bash
scp -r web {ESXi hostname}:/usr/lib/vmware/hostd/docroot/
```

Then navigate to `https://{ESXi hostname}/web/`, accept the certificate error and
enter your username/password for the host.

## Development

Requires php >= 5.4.0

Start the development server with

```bash
php -S 127.0.0.1:8080 proxy.php
```

In your browser go to `http://localhost:8080/encrypt.php` to generate the config file.
Afterwards go to your browser and visit `http://localhost:8080/web/` and start developing!

## Notes

In ESXi 6, the vSphere MOB is disabled by default, this web view requires that it be enabled. virtuallyGhetto
has already solved this issue in [Quick Tip - vSphere MOB is disabled by default in ESXi 6.0](http://www.virtuallyghetto.com/2015/02/quick-tip-vsphere-mob-is-disabled-by-default-in-esxi-6-0.html).

In the ESXi shell, enable it with the command:
```bash
vim-cmd hostsvc/advopt/view Config.HostAgent.plugins.solo.enableMob
```
