<div align="center">
  <a href="#">
  	<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy-downsized.gif" alt="Logo project" height="160" />
  </a>
  <br>
  <br>
  <p>
    <b>blacklist</b>
  </p>
  <p>
     <i>A hidden connected secret list from everyone except you ⚫️ ⚫️</i>
  </p>
  <p>

[![Build Status](https://travis-ci.com/luctst/blacklist.svg?branch=master)](https://travis-ci.com/luctst/blacklist)
[![NPM version](https://img.shields.io/npm/v/blacklist?style=flat-square)](https://img.shields.io/npm/v/blacklist?style=flat-square)
[![Package size](https://img.shields.io/bundlephobia/min/blacklist)](https://img.shields.io/bundlephobia/min/blacklist)
[![Dependencies](https://img.shields.io/david/luctst/blacklist.svg?style=popout-square)](https://david-dm.org/luctst/blacklist)
[![devDependencies Status](https://david-dm.org/luctst/blacklist/dev-status.svg?style=flat-square)](https://david-dm.org/luctst/blacklist?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter](https://img.shields.io/twitter/follow/luctstt.svg?label=Follow&style=social)](https://twitter.com/luctstt)

  </p>
</div>

---

**Content**

* [Install](##install)
* [Usage](##usage)
* [Contributing](##contributing)
* [Maintainers](##maintainers)

## Install 🐙
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

## Usage 💡
One everything is done you can launch the server by running these command `npm run back`, it should start the nodejs process.

You can now start the client side by running those commands:

```
cd client/
npm start
```

If you had any troubles don't hesitate to create an issues, happy coding 👩‍💻🧑‍💻

## Contributing 🍰
Please make sure to read the [Contributing Guide](https://github.com/luctst/blacklist/blob/master/.github/CONTRIBUTING.md) before making a pull request.

Thank you to all the people who already contributed to this project!

## Maintainers 👷
List of maintainers, replace all `href`, `src` attributes by your maintainers datas.
<table>
  <tr>
    <td align="center"><a href="https://lucastostee.now.sh/"><img src="https://avatars3.githubusercontent.com/u/22588842?s=460&v=4" width="100px;" alt="Tostee Lucas"/><br /><sub><b>Tostee Lucas</b></sub></a><br /><a href="#" title="Code">💻</a></td>
  </tr>
</table>

## License ⚖️
MIT

---
<div align="center">
	<b>
		<a href="https://www.npmjs.com/package/get-good-readme">File generated with get-good-readme module</a>
	</b>
</div>
