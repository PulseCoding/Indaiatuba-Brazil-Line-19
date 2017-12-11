var Service = require('node-windows').Service


var svc = new Service({
  name:'PULSE line19 Barcode SERVICE',
  description: 'Control of the PULSE code',
  script: __dirname + '\\app-rest-barcode-19.js',
  env: {
    name: "HOME",
    value: process.env["USERPROFILE"]
  }
})

svc.on('uninstall',function(){
  console.log('Uninstall complete.')
  console.log('The service exists: ',svc.exists)
})

svc.uninstall()
