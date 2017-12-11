try{
var Cliente = require('node-rest-client').Client;
var fs = require('fs');
var client = new Cliente;
var barcodeToWrite = '0';

setInterval(function(){
	let val1,val2;
	client.get('http://192.168.10.15:3000/data/barcode',function(req,resp){
		val1 = req.bcn;
		client.get('http://192.168.10.15:3001/data/barcode',function(req2,resp2){
			val2 = req2.bcn;
			barcodeToWrite = validate( [val1,val2] );
			writeData(barcodeToWrite);
		});
	});
},60000);
}catch(err){
	fs.appendFile('barcode_l19_ERROR.log',err);
}

var writeData = function(bc){
	var str = 'tt=' + Date.now() + ',var=bc' + ',val=' + bc + '\n';
	fs.appendFile('C:/PULSE/L19/L19_LOGS/BRA_IND_BARCODE_L19.log',str, (err)=>{
		if(err) throw err;
	});
}

var validate = function(arr){
	for ( let i = 0 ; i < arr.length ; i++ ){
		if (arr[i] != '0' && ! isNaN(arr[i])) return arr[i];
	}
	return '0';
}
