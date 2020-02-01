# blacklist

[![Build Status](https://travis-ci.com/luctst/blacklist.svg?branch=master)](https://travis-ci.com/luctst/blacklist)
[![NPM version](https://img.shields.io/npm/v/blacklist?style=flat-square)](https://img.shields.io/npm/v/blacklist?style=flat-square)
[![Package size](https://img.shields.io/bundlephobia/min/blacklist)](https://img.shields.io/bundlephobia/min/blacklist)
[![Dependencies](https://img.shields.io/david/luctst/blacklist.svg?style=popout-square)](https://david-dm.org/luctst/blacklist)
[![devDependencies Status](https://david-dm.org/luctst/blacklist/dev-status.svg?style=flat-square)](https://david-dm.org/luctst/blacklist?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter](https://img.shields.io/twitter/follow/luctstt.svg?label=Follow&style=social)](https://twitter.com/luctstt)

*A hidden connected secret list from everyone except you ⚫️ ⚫️*

## Install
First install client and server dependencies.

### Client
```
cd client/
npm install
```

### Server
```
cd ..
npm install
```

Once it's done you must create a `.env` files to keep your secrets variables, the first one is for the server at the root of your project and should contain this variable `DB_URL` ask me for authorization in order to get acces to database.

```bash
-- .github/
-- client/
-- server/
-- .env
```

The second one should be in the client project, with your terminal go in the `client` folder and create another `.env` file, it should have those variables `REACT_APP_APIURLDEV = http://localhost:<server-port>, REACT_APP_APIURLPROD = "`.

```bash
-- client/
    -- public/
    -- src/
    -- .env
```

> **Note** - You must have Nodejs >=10.0.0

## Usage
One everything is done you can launch the server by running these command `npm run back`, it should start the nodejs process.

You can now start the client side by running those commands:

```
cd client/
npm start
```

If you had any troubles don't hesitate to create an issues, happy coding 👩‍💻🧑‍💻

## License
MIT

<p style="font-size:8px;text-align:center;margin-top:50px;">File generated with <a href="https://github.com/luctst/get-good-readme">get-good-readme</a> module.</p>
