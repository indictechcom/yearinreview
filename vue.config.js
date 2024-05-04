module.exports = {
    extendConfig(config) {
      config.defineConstants({
        '__VUE_OPTIONS_API__': true,
        '__VUE_PROD_DEVTOOLS__': false
      });
      return config;
    }
};