var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'PULSE line19 checkweigher SERVICE',
  description: 'Control of the PULSE code',
  script: __dirname + '\\modbus_restv2.js',
  env: {
    name: "HOME",
    value: process.env["USERPROFILE"]
  }
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
