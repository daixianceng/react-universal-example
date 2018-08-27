# react-universal-example

<p align="center">
  <a href="https://demo.zhaidongxi.com/react-universal-example/" target="_blank">
    <img src="./media.gif" alt="react-universal-example" />
  </a>
</p>

This is an universal example app for [React](https://github.com/facebook/react), Based on [react-starter-kit](https://github.com/kriasoft/react-starter-kit/tree/feature/redux)

[中文文档](./README.zh_CN.md)

Here is a [demo](https://demo.zhaidongxi.com/react-universal-example/)

Compared to `react-starter-kit`, this application provides the following features:

- Google [Material](https://github.com/mui-org/material-ui) Design
- Jss([Css in Js](http://cssinjs.org/)) themes
- Write PostCss using Sass syntax ([precss](https://github.com/jonathantneal/precss))
- Supports relative path (`APP_BASE_URL`)
- Better webpack configuration
- Removed unused dependencies

## Quick Start

```
git clone https://github.com/daixianceng/react-universal-example.git
cd react-universal-example

# Copy default configuration
cp .env.example .env

# Install dependencies
npm install
# or
yarn

# Run application in development
npm start
# or
yarn start
```

Now you can open `localhost:3000` in your borwser. The project depends on the API of [yii2-app-example](https://github.com/daixianceng/yii2-app-example). This is a clean and beautiful RESTful API, you will love it. The project has a default API to `https://demo.zhaidongxi.com/yii2-app-example-api`, so you do not need to install `yii2-app-example`.

Compile the project:

```
npm run build -- --release
# or
yarn build -- --release
```

Run:

```
npm run serve
# or
yarn serve

# Or use pm2 to start the daemon (install pm2 first: npm i pm2 -g)
npm run pm2-serve
# or
yarn pm2-serve
```

More documentation please move [getting started guide](https://github.com/kriasoft/react-starter-kit/blob/feature/redux/docs/getting-started.md)

## License

**react-universal-example** is released under the FSB License. See the bundled `LICENSE` for details.
