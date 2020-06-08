const environment = process.env.ELEVENTY_ENV;
const PROD_ENV = 'prod';
const prodUrl = 'https://your-production.url';
const devUrl = 'http://localhost:8080';
const baseUrl = environment === PROD_ENV ? prodUrl : devUrl;
const isProd = environment === PROD_ENV;

const folder = {
  assets: 'assets',
  input: 'src',
  output: 'dist'
};

const dir = {
  img: `/${folder.assets}/img/`,
  favicons: `/${folder.assets}/img/favicons/`,
  css: `/${folder.assets}/css/`,
  icons: `/${folder.assets}/img/icons/`,
}

module.exports = {
  siteName: 'your site name',
  themeColor: '#000000',
  author: 'your name',
  environment,
  isProd,
  folder,
  base: {
    site: baseUrl,
    img: `${baseUrl}${dir.img}`,
    favicons: `${baseUrl}${dir.favicons}`,
    css: `${baseUrl}${dir.css}`,
    icons: `${baseUrl}${dir.icons}`,
  },
  tracking: {
    gtag: 'your_tracking_id'
  }
};
