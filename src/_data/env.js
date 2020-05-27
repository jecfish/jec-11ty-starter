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
}

module.exports = {
  siteName: 'your site name',
  author: 'your name',
  environment,
  isProd,
  folder,
  base: {
    site: baseUrl,
    img: `${baseUrl}${dir.img}`,
  },
  tracking: {
    gtag: 'your_tracking_id'
  }
};
