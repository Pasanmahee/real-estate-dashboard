/**
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

 const REACT_APP_ENV = process.env;

 export default {
   dev: {
     '/real_estate_api/': {
       target: REACT_APP_ENV.REAL_ESTATE_MONITORING_API_URL || 'http://localhost:5000',
       changeOrigin: true,
       pathRewrite: { '/real_estate_api': '' },
     },
     '/real_estate_gateway/': {
       target: REACT_APP_ENV.REAL_ESTATE_GATEWAY_API_URL || 'https://realestate.free.beeceptor.com',
       changeOrigin: true,
       pathRewrite: { '/real_estate_gateway': '' },
     },
   },
 };
 