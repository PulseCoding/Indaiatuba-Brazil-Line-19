var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'PULSE line19 SERVICE',
  description: 'Control of the PULSE code',
  script: __dirname + '\\main_v0.0.4.js',
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
