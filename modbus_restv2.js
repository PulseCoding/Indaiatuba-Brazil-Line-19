var Client = require('node-rest-client').Client;
const fs= require('fs');
var client = new Client();
flagon=1;
var secWeigher=0;
var flagPrintWeigher=0;


setInterval(start,1000);

function start(){

client.get("http://192.168.10.30:5000/test", function (data, response) {


    let varpe_weight1= data.Weightvarpe;
    let varpe_count1= data.Countvarpe;
    let varpe_weight2= data.Weightvarpe2;
    let varpe_count2= data.Countvarpe2;
if (varpe_weight1 < 100)
{
  varpe_weight1 =0;
}

if (varpe_weight2 < 100)
{
  varpe_weight2 =0;
}
    Varpe = {
      WEIGHT: varpe_weight1,
      CPQI: varpe_count1
    };

    Varpe2 = {
      WEIGHT: varpe_weight2,
      CPQI: varpe_count2
    };


    if (secWeigher>=60){
       flagPrintWeigher=1;
       secWeigher=0;
    }

    secWeigher++;

    if (flagPrintWeigher == 1){
     for (var key in Varpe){
       if(Varpe.CPQI != null){
        fs.appendFileSync("../L19_logs/BRA_IND_Checkweigher_L19.1.log","tt=" + Date.now() + ",var=" + key + ",val=" + Varpe[key] + "\n");
      }
      if(Varpe2.CPQI != null){
        fs.appendFileSync("../L19_logs/BRA_IND_Checkweigher_L19.2.log","tt=" + Date.now() + ",var=" + key + ",val=" + Varpe2[key] + "\n");
      }
      }

      flagPrintWeigher = 0;
    }

    //console.log(response);
}).on('error', function (err) {
  console.log('something went wrong on the request', err.request.options);

});;

}
