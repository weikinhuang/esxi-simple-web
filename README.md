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
