import configProd from './prod.mjs'
// import configDev from './dev.mjs'


export var config

if (process.env.NODE_ENV === 'production') {
  config = configProd
} else {
  config = configProd
}
config.isGuestMode = true


