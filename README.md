# PA - Desktop Client

***

## Running

Do the following, to clone this repo and the dev server and run them both (tested on Debian):

```
git clone https://github.com/dosyago-corp/pa-os-desktopclient.git
git clone https://github.com/dosyago-corp/pa-os-server.git
cd pa-os-desktopclient
npm install 
cd ..
cd pa-os-server
npm install
cd ..
cp pa-os-server/dev .
./dev
```

This ought to clone, install and start the dev environment.

### Troubleshooting 

You should also have `google-chrome-stable`, `neo4j`, `mysql`  and `mongod` installed as well. If you don't you can comment out those lines in the `./dev` that start those services. 

If you are commenting out the lines starting the databases, you'll also want to comment out the line in `pa-os-server/index.js` that calls `db.connect()` to start the database clients. 



