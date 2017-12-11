//cambiar path de pubnub y paths de logs
var fs = require('fs');
var Client = require('node-rest-client').Client;
var authorization = {user:"user",password:"00000000"};
var modbus = require('jsmodbus');
var PubNub = require('pubnub');
var secPubNub=0;


try{

var Fillerct = null,
    Fillerresults = null,
    CntOutFiller = null,
    Filleractual = 0,
    Fillertime = 0,
    Fillersec = 0,
    FillerflagStopped = false,
    Fillerstate = 0,
    Fillerspeed = 0,
    FillerspeedTemp = 0,
    FillerflagPrint = 0,
    FillersecStop = 0,
    FillerONS = 0,
    FillerStartTime = null,
    FillertimeStop = 50, //NOTE: Timestop
    FillerWorktime = 60, // Valor anterior 42 NOTE: 60 si la máquina trabaja continuamente, 3 sí tarda entre 40 y 60 segundos en "operar"
    FillerflagRunning = false,
    WaitFiller=0;

var FoilStatus=0;
var Foil2Status=0;


var Ballerct = null,
    Ballerresults = null,
    CntInBaller = null,
    CntOutBaller = null,
    Balleractual = 0,
    Ballertime = 0,
    Ballersec = 0,
    BallerflagStopped = false,
    Ballerstate = 0,
    Ballerspeed = 0,
    BallerspeedTemp = 0,
    BallerflagPrint = 0,
    BallersecStop = 0,
    BallerONS = 0,
    BallerStartTime = null,
    BallertimeStop = 50, //NOTE: Timestop
    BallerWorktime = 6, //Valor anterior 6 NOTE: 60 si la máquina trabaja continuamente, 3 sí tarda entre 40 y 60 segundos en "operar"
    BallerflagRunning = false;

    var Filler2ct = null,
        Filler2results = null,
        CntOutFiller2 = null,
        Filler2actual = 0,
        Filler2time = 0,
        Filler2sec = 0,
        Filler2flagStopped = false,
        Filler2state = 0,
        Filler2speed = 0,
        Filler2speedTemp = 0,
        Filler2flagPrint = 0,
        Filler2secStop = 0,
        Filler2ONS = 0,
        Filler2StartTime = null,
        Filler2timeStop = 50, //NOTE: Timestop
        Filler2Worktime = 60, //Valor anterior 6 NOTE: 60 si la máquina trabaja continuamente, 3 sí tarda entre 40 y 60 segundos en "operar"
        Filler2flagRunning = false;


        var Baller2ct = null,
            Baller2results = null,
            CntInBaller2 = null,
            CntOutBaller2 = null,
            Baller2actual = 0,
            Baller2time = 0,
            Baller2sec = 0,
            Baller2flagStopped = false,
            Baller2state = 0,
            Baller2speed = 0,
            Baller2speedTemp = 0,
            Baller2flagPrint = 0,
            Baller2secStop = 0,
            Baller2ONS = 0,
            Baller2StartTime = null,
            Baller2timeStop = 50, //NOTE: Timestop
            Baller2Worktime = 6, //Valor anterior 30 NOTE: 60 si la máquina trabaja continuamente, 3 sí tarda entre 40 y 60 segundos en "operar"
            Baller2flagRunning = false;
            var CntOutEOL=null,
                secEOL=0;

    var EOLct = null,
        EOLresults = null,
        CntInEOL = null,
        CntOutEOL = null,
        EOLactual = 0,
        EOLtime = 0,
        EOLsec = 0,
        EOLflagStopped = false,
        EOLstate = 0,
        EOLspeed = 0,
        EOLspeedTemp = 0,
        EOLflagPrint = 0,
        EOLsecStop = 0,
        EOLONS = 0,
        EOLStartTime = null,
        EOLtimeStop = 50, //NOTE: Timestop
        EOLWorktime = 3, // Valor anterior 20 NOTE: 60 si la máquina trabaja continuamente, 3 sí tarda entre 40 y 60 segundos en "operar"
        EOLflagRunning = false;



    var Palletizerct = null,
        Palletizerresults = null,
        CntInPalletizer = null,
        CntOutPalletizer = null,
        Palletizeractual = 0,
        Palletizertime = 0,
        Palletizersec = 0,
        PalletizerflagStopped = false,
        Palletizerstate = 0,
        Palletizerspeed = 0,
        PalletizerspeedTemp = 0,
        PalletizerflagPrint = 0,
        PalletizersecStop = 0,
        PalletizerONS = 0,
        PalletizerStartTime = null,
        PalletizertimeStop = 60*4, //NOTE: Timestop
        PalletizerWorktime = 1, // Valor anterior 20 NOTE: 60 si la máquina trabaja continuamente, 3 sí tarda entre 40 y 60 segundos en "operar"
        PalletizerflagRunning = false;

    var files = fs.readdirSync("C:/PULSE/L19/L19_LOGS/"); //Leer documentos
    var actualdate = Date.now(); //Fecha actual
    var text2send=[];//Vector a enviar
    var flagInfo2Send=0;
    var i=0;

    var PubNub = require('pubnub');

    pubnub = new PubNub({
    publishKey:    "pub-c-8d024e5b-23bc-4ce8-ab68-b39b00347dfb",
    subscribeKey:    "sub-c-c3b3aa54-b44b-11e7-895e-c6a8ff6a3d85",
      uuid: "BRA_IND_L19"
    });


    function senderData(){
      pubnub.publish(publishConfig, function(status, response) {
    });}



    var client1 = modbus.client.tcp.complete({
      'host': "192.168.10.106",
      'port': 502,
      'autoReconnect': true,
      'timeout': 60000,
      'logEnabled': true,
      'reconnectTimeout' : 30000
    });
    var client2 = modbus.client.tcp.complete({
      'host': "192.168.10.105",
      'port': 502,
      'autoReconnect': true,
      'timeout': 60000,
      'logEnabled': true,
      'reconnectTimeout' : 30000
    });
    var client3 = modbus.client.tcp.complete({
      'host': "192.168.10.95",
      'port': 502,
      'autoReconnect': true,
      'timeout': 60000,
      'logEnabled': true,
      'reconnectTimeout' : 30000
    });

    client1.connect();
    client2.connect();
    client3.connect();

    function joinWord(num1, num2) {
      var bits = "00000000000000000000000000000000";
      var bin1 = num1.toString(2),
        bin2 = num2.toString(2),
        newNum = bits.split("");

      for (i = 0; i < bin1.length; i++) {
        newNum[31 - i] = bin1[(bin1.length - 1) - i];
      }
      for (i = 0; i < bin2.length; i++) {
        newNum[15 - i] = bin2[(bin2.length - 1) - i];
      }
      bits = newNum.join("");
      return parseInt(bits, 2);
    }

  //PubNub --------------------------------------------------------------------------------------------------------------------
setInterval(function(){
          if(secPubNub>=60){

            function idle(){
              i=0;
              text2send=[];
              for ( k=0;k<files.length;k++){//Verificar los archivos
                var stats = fs.statSync("C:/PULSE/L19/L19_LOGS/"+files[k]);
                var mtime = new Date(stats.mtime).getTime();
                if (mtime< (Date.now() - (8*60*1000))&&files[k].indexOf("Palletizer")==-1){
                  flagInfo2Send=1;
                  text2send[i]=files[k];
                  i++;
                }
              }
            }
            secPubNub=0;
            idle();
            publishConfig = {
              channel : "IND_Monitor",
              message : {
                    line: "19",
                    tt: Date.now(),
                    machines:text2send

                  }
            };
            senderData();
          }
          secPubNub++;

      },1000);
  //PubNub --------------------------------------------------------------------------------------------------------------------



  client1.on('connect', function(err) {
      setInterval(function(){

        client1.readCoils(0, 16).then(function(respu) {
            FoilStatus = respu.coils[5]; // Wait Filler
            WaitFiller = respu.coils[0]; // Wait Filler 2
            Foil2Status = respu.coils[6]; // Foil Status
            WaitFiller2 = respu.coils[1]; // Foil Status


              });


          client1.readHoldingRegisters(0, 16).then(function(resp) {
            CntOutFiller = joinWord(resp.register[4], resp.register[5]);
            CntOutBaller =  joinWord(resp.register[6], resp.register[7]);
            CntInBaller = joinWord(resp.register[8], resp.register[9]);
            CntOutFiller2 = joinWord(resp.register[14], resp.register[15]);



            //------------------------------------------Filler----------------------------------------------
                  Fillerct = CntOutFiller; // NOTE: igualar al contador de salida
                  if (FillerONS == 0 && Fillerct) {
                    FillerspeedTemp = Fillerct;
                    FillerStartTime = Date.now();
                    FillerONS = 1;
                  }
                  if(Fillerct > Filleractual){
                    if(FillerflagStopped){
                      Fillerspeed = Fillerct - FillerspeedTemp;
                      FillerspeedTemp = Fillerct;
                      FillerStartTime = Date.now();
                      Fillersec = 0;
                    }
                    FillersecStop = 0;
                    Fillersec++;
                    Fillertime = Date.now();
                    Fillerstate = 1;
                    FillerflagStopped = false;
                    FillerflagRunning = true;
                  } else if( Fillerct == Filleractual ){
                    if(FillersecStop == 0){
                      Fillertime = Date.now();
                    }
                    FillersecStop++;
                    if(FillersecStop >= FillertimeStop){
                      Fillerspeed = 0;
                      Fillerstate = 2;
                      FillerspeedTemp = Fillerct;
                      FillerflagStopped = true;
                      FillerflagRunning = false;
                      if (WaitFiller==1 || FoilStatus==0)
                      {
                        Fillerstate=3;
                      }
                    }
                    if(FillersecStop % (FillertimeStop*3) == 0 || FillersecStop == FillertimeStop ){
                      FillerflagPrint = 1;

                      if(FillersecStop % (FillertimeStop*3) == 0){
                        Fillertime = Date.now();
                      }
                    }
                  }
                  Filleractual = Fillerct;
                  if(Fillersec == FillerWorktime){
                    Fillersec = 0;
                    if(FillerflagRunning && Fillerct){
                      FillerflagPrint = 1;
                      FillersecStop = 0;
                      Fillerspeed = Math.floor( (Fillerct - FillerspeedTemp) / (Date.now() - FillerStartTime) * 60000 ); //checar este punto
                      FillerspeedTemp = Fillerct;
                      FillerStartTime = Date.now();
                    }
                  }
                  Fillerresults = {
                    ST: Fillerstate,
                  //  CPQI : CntInFiller,
                    CPQO : CntOutFiller,
                    SP: Fillerspeed
                  };
                  if (FillerflagPrint == 1 && Fillerct) {
                    for (var key in Fillerresults) {
                      if(Fillerresults[key] != null && ! isNaN(Fillerresults[key]))
                      //NOTE: Cambiar path
                      fs.appendFileSync("C:/PULSE/L19/L19_LOGS/BRA_IND_Filler_L19.1.log", 'tt=' + Fillertime + ',var=' + key + ',val=' + Fillerresults[key] + '\n');

                    }
                    FillerflagPrint = 0;
                  }
            //------------------------------------------Filler----------------------------------------------


            //------------------------------------------Baller----------------------------------------------
                  Ballerct = CntOutBaller; // NOTE: igualar al contador de salida
                  if (BallerONS == 0 && Ballerct) {
                    BallerspeedTemp = Ballerct;
                    BallerStartTime = Date.now();
                    BallerONS = 1;
                  }
                  if(Ballerct > Balleractual){
                    if(BallerflagStopped){
                      Ballerspeed = Ballerct - BallerspeedTemp;
                      BallerspeedTemp = Ballerct;
                      BallerStartTime = Date.now();
                      Ballersec = 0;
                    }
                    BallersecStop = 0;
                    Ballersec++;
                    Ballertime = Date.now();
                    Ballerstate = 1;
                    BallerflagStopped = false;
                    BallerflagRunning = true;
                  } else if( Ballerct == Balleractual ){
                    if(BallersecStop == 0){
                      Ballertime = Date.now();
                    }
                    BallersecStop++;
                    if(BallersecStop >= BallertimeStop){
                      Ballerspeed = 0;
                      Ballerstate = 2;
                      BallerspeedTemp = Ballerct;
                      BallerflagStopped = true;
                      BallerflagRunning = false;
                    }
                    if(BallersecStop % (BallertimeStop*3) == 0 || BallersecStop == BallertimeStop ){
                      BallerflagPrint = 1;

                      if(BallersecStop % (BallertimeStop*3) == 0){
                        Ballertime = Date.now();
                      }
                    }
                  }
                  Balleractual = Ballerct;
                  if(Ballersec == BallerWorktime){
                    Ballersec = 0;
                    if(BallerflagRunning && Ballerct){
                      BallerflagPrint = 1;
                      BallersecStop = 0;
                      Ballerspeed = Math.floor( (Ballerct - BallerspeedTemp) / (Date.now() - BallerStartTime) * 60000 );
                      BallerspeedTemp = Ballerct;
                      BallerStartTime = Date.now();
                    }
                  }
                  Ballerresults = {
                    ST: Ballerstate,
                    CPQI : CntInBaller,
                    CPQO : CntOutBaller,
                    SP: Ballerspeed
                  };
                  if (BallerflagPrint == 1 && Ballerct) {
                    for (var key in Ballerresults) {
                      if(Ballerresults[key] != null && ! isNaN(Ballerresults[key]))
                      //NOTE: Cambiar path
                      fs.appendFileSync('C:/PULSE/L19/L19_LOGS/BRA_IND_Baller_L19.1.log', 'tt=' + Ballertime + ',var=' + key + ',val=' + Ballerresults[key] + '\n');
                    }
                    BallerflagPrint = 0;
                  }
            //------------------------------------------Baller----------------------------------------------

            //------------------------------------------Filler2----------------------------------------------
                  Filler2ct = CntOutFiller2; // NOTE: igualar al contador de salida
                  if (Filler2ONS == 0 && Filler2ct) {
                    Filler2speedTemp = Filler2ct;
                    Filler2StartTime = Date.now();
                    Filler2ONS = 1;
                  }
                  if(Filler2ct > Filler2actual){
                    if(Filler2flagStopped){
                      Filler2speed = Filler2ct - Filler2speedTemp;
                      Filler2speedTemp = Filler2ct;
                      Filler2StartTime = Date.now();
                      Filler2sec = 0;
                    }
                    Filler2secStop = 0;
                    Filler2sec++;
                    Filler2time = Date.now();
                    Filler2state = 1;
                    Filler2flagStopped = false;
                    Filler2flagRunning = true;
                  } else if( Filler2ct == Filler2actual ){
                    if(Filler2secStop == 0){
                      Filler2time = Date.now();
                    }
                    Filler2secStop++;
                    if(Filler2secStop >= Filler2timeStop){
                      Filler2speed = 0;
                      Filler2state = 2;
                      Filler2speedTemp = Filler2ct;
                      Filler2flagStopped = true;
                      Filler2flagRunning = false;

                      if (WaitFiller2==1 || Foil2Status==0)
                      {
                        Filler2state=3;
                      }


                    }
                    if(Filler2secStop % (Filler2timeStop*3) == 0 || Filler2secStop == Filler2timeStop ){
                      Filler2flagPrint = 1;

                      if(Filler2secStop % (Filler2timeStop*3) == 0){
                        Filler2time = Date.now();
                      }
                    }
                  }
                  Filler2actual = Filler2ct;
                  if(Filler2sec == Filler2Worktime){
                    Filler2sec = 0;
                    if(Filler2flagRunning && Filler2ct){
                      Filler2flagPrint = 1;
                      Filler2secStop = 0;
                      Filler2speed = Math.floor( (Filler2ct - Filler2speedTemp) / (Date.now() - Filler2StartTime) * 60000 );
                      Filler2speedTemp = Filler2ct;
                      Filler2StartTime = Date.now();
                    }
                  }
                  Filler2results = {
                    ST: Filler2state,
                    //CPQI : CntInFiller2,
                    CPQO : CntOutFiller2,
                    SP: Filler2speed
                  };
                  if (Filler2flagPrint == 1 && Filler2ct) {
                    for (var key in Filler2results) {
                      if(Filler2results[key] != null && ! isNaN(Filler2results[key]))
                      //NOTE: Cambiar path
                      fs.appendFileSync('C:/PULSE/L19/L19_LOGS/BRA_IND_Filler_L19.2.log', 'tt=' + Filler2time + ',var=' + key + ',val=' + Filler2results[key] + '\n');
                    }
                    Filler2flagPrint = 0;
                  }
            //------------------------------------------Filler2----------------------------------------------

          });//Cierre de lectura

        },1000);
    });//Cierre de cliente

        client1.on('error', function(err) {

        });
        client1.on('close', function() {
        });


        client2.on('connect', function(err) {
                  setInterval(function(){

        client2.readHoldingRegisters(0, 16).then(function(resp) {

          CntInBaller2 = joinWord(resp.register[0], resp.register[1]);
          CntOutBaller2 = joinWord(resp.register[2], resp.register[3]);

          //------------------------------------------Baller2----------------------------------------------
                Baller2ct = CntOutBaller2; // NOTE: igualar al contador de salida
                if (Baller2ONS == 0 && Baller2ct) {
                  Baller2speedTemp = Baller2ct;
                  Baller2StartTime = Date.now();
                  Baller2ONS = 1;
                }
                if(Baller2ct > Baller2actual){
                  if(Baller2flagStopped){
                    Baller2speed = Baller2ct - Baller2speedTemp;
                    Baller2speedTemp = Baller2ct;
                    Baller2StartTime = Date.now();
                    Baller2sec = 0;
                  }
                  Baller2secStop = 0;
                  Baller2sec++;
                  Baller2time = Date.now();
                  Baller2state = 1;
                  Baller2flagStopped = false;
                  Baller2flagRunning = true;
                } else if( Baller2ct == Baller2actual ){
                  if(Baller2secStop == 0){
                    Baller2time = Date.now();
                  }
                  Baller2secStop++;
                  if(Baller2secStop >= Baller2timeStop){
                    Baller2speed = 0;
                    Baller2state = 2;
                    Baller2speedTemp = Baller2ct;
                    Baller2flagStopped = true;
                    Baller2flagRunning = false;
                  }
                  if(Baller2secStop % (Baller2timeStop*3) == 0 || Baller2secStop == Baller2timeStop ){
                    Baller2flagPrint = 1;

                    if(Baller2secStop % (Baller2timeStop*3) == 0){
                      Baller2time = Date.now();
                    }
                  }
                }
                Baller2actual = Baller2ct;
                if(Baller2sec == Baller2Worktime){
                  Baller2sec = 0;
                  if(Baller2flagRunning && Baller2ct){
                    Baller2flagPrint = 1;
                    Baller2secStop = 0;
                    Baller2speed = Math.floor( (Baller2ct - Baller2speedTemp) / (Date.now() - Baller2StartTime) * 60000 );
                    Baller2speedTemp = Baller2ct;
                    Baller2StartTime = Date.now();
                  }
                }
                Baller2results = {
                  ST: Baller2state,
                  CPQI : CntInBaller2,
                  CPQO : CntOutBaller2,
                  SP: Baller2speed
                };
                if (Baller2flagPrint == 1 && Baller2ct) {
                  for (var key in Baller2results) {
                    if(Baller2results[key] != null && ! isNaN(Baller2results[key]))
                    //NOTE: Cambiar path
                    fs.appendFileSync('C:/PULSE/L19/L19_LOGS/BRA_IND_Baller_L19.2.log', 'tt=' + Baller2time + ',var=' + key + ',val=' + Baller2results[key] + '\n');
                  }
                  Baller2flagPrint = 0;
                }
          //------------------------------------------Baller2----------------------------------------------


        });//Cierre de lectura

        },1000);
        });//Cierre de cliente

        client2.on('error', function(err) {

        });
        client2.on('close', function() {
        });


        client3.on('connect', function(err) {
                      setInterval(function(){


                          client3.readHoldingRegisters(0, 16).then(function(resp) {
                            CntOutEOL = joinWord(resp.register[0], resp.register[1]);
                            CntOutPalletizer = joinWord(resp.register[2], resp.register[3]);



                            /*----------------------------------------------------------------------------------EOL----------------------------------------------------------------------------------*/
                                  if(secEOL>=60 && CntOutEOL){
                                    fs.appendFileSync("C:/PULSE/L19/L19_LOGS/BRA_IND_EOL_L19.log","tt="+Date.now()+",var=EOL"+",val="+CntOutEOL+"\n");
                                    secEOL=0;
                                  }else{
                                    secEOL++;
                                  }
                            /*----------------------------------------------------------------------------------EOL----------------------------------------------------------------------------------*/

                            //------------------------------------------EOL----------------------------------------------
                                  EOLct = CntOutEOL; // NOTE: igualar al contador de salida
                                  if (EOLONS == 0 && EOLct) {
                                    EOLspeedTemp = EOLct;
                                    EOLStartTime = Date.now();
                                    EOLONS = 1;
                                  }
                                  if(EOLct > EOLactual){
                                    if(EOLflagStopped){
                                      EOLspeed = EOLct - EOLspeedTemp;
                                      EOLspeedTemp = EOLct;
                                      EOLStartTime = Date.now();
                                      EOLsec = 0;
                                    }
                                    EOLsecStop = 0;
                                    EOLsec++;
                                    EOLtime = Date.now();
                                    EOLstate = 1;
                                    EOLflagStopped = false;
                                    EOLflagRunning = true;
                                  } else if( EOLct == EOLactual ){
                                    if(EOLsecStop == 0){
                                      EOLtime = Date.now();
                                    }
                                    EOLsecStop++;
                                    if(EOLsecStop >= EOLtimeStop){
                                      EOLspeed = 0;
                                      EOLstate = 2;
                                      EOLspeedTemp = EOLct;
                                      EOLflagStopped = true;
                                      EOLflagRunning = false;
                                    }
                                    if(EOLsecStop % (EOLtimeStop*2) == 0 || EOLsecStop == EOLtimeStop ){
                                      EOLflagPrint = 1;

                                      if(EOLsecStop % (EOLtimeStop*2) == 0){
                                        EOLtime = Date.now();
                                      }
                                    }
                                  }
                                  EOLactual = EOLct;
                                  if(EOLsec == EOLWorktime){
                                    EOLsec = 0;
                                    if(EOLflagRunning && EOLct){
                                      EOLflagPrint = 1;
                                      EOLsecStop = 0;
                                      EOLspeed = Math.floor( (EOLct - EOLspeedTemp) / (Date.now() - EOLStartTime) * 60000 );
                                      EOLspeedTemp = EOLct;
                                      EOLStartTime = Date.now();
                                    }
                                  }

                                  EOLresults = {
                                    ST: EOLstate,
                                  //  CPQI : CntInEOL,
                                    CPQO : CntOutEOL,
                                    SP: EOLspeed
                                  };

                            //------------------------------------------EOL----------------------------------------------






                            //------------------------------------------Palletizer----------------------------------------------
                                  Palletizerct = CntOutPalletizer; // NOTE: igualar al contador de salida
                                  if (PalletizerONS == 0 && Palletizerct) {
                                    PalletizerspeedTemp = Palletizerct;
                                    PalletizerStartTime = Date.now();
                                    PalletizerONS = 1;
                                  }
                                  if(Palletizerct > Palletizeractual){
                                    if(PalletizerflagStopped){
                                      Palletizerspeed = Palletizerct - PalletizerspeedTemp;
                                      PalletizerspeedTemp = Palletizerct;
                                      PalletizerStartTime = Date.now();
                                      Palletizersec = 0;
                                    }
                                    PalletizersecStop = 0;
                                    Palletizersec++;
                                    Palletizertime = Date.now();
                                    Palletizerstate = 1;
                                    PalletizerflagStopped = false;
                                    PalletizerflagRunning = true;
                                  } else if( Palletizerct == Palletizeractual ){
                                    if(PalletizersecStop == 0){
                                      Palletizertime = Date.now();
                                    }
                                    PalletizersecStop++;
                                    if(PalletizersecStop >= PalletizertimeStop){
                                      Palletizerspeed = 0;
                                      Palletizerstate = 2;
                                      PalletizerspeedTemp = Palletizerct;
                                      PalletizerflagStopped = true;
                                      PalletizerflagRunning = false;
                                    }
                                    if(PalletizersecStop % (PalletizertimeStop*2) == 0 || PalletizersecStop == PalletizertimeStop ){
                                      PalletizerflagPrint = 1;

                                      if(PalletizersecStop % (PalletizertimeStop*2) == 0){
                                        Palletizertime = Date.now();
                                      }
                                    }
                                  }
                                  Palletizeractual = Palletizerct;
                                  if(Palletizersec == PalletizerWorktime){
                                    Palletizersec = 0;
                                    if(PalletizerflagRunning && Palletizerct){
                                      PalletizerflagPrint = 1;
                                      PalletizersecStop = 0;
                                      Palletizerspeed = Math.floor( (Palletizerct - PalletizerspeedTemp) / (Date.now() - PalletizerStartTime) * 300000 );
                                      PalletizerspeedTemp = Palletizerct;
                                      PalletizerStartTime = Date.now();
                                    }
                                  }
                                  console.log( Palletizerct + '    ' + PalletizersecStop )
                                  Palletizerresults = {
                                    ST: EOLstate,
                                  //  CPQI : CntInPalletizer,
                                    CPQO : CntOutPalletizer,
                                    SP: Palletizerspeed
                                  };
                                  if (EOLflagPrint == 1 && Palletizerct) {
                                    for (var key in Palletizerresults) {
                                      if(Palletizerresults[key] != null && ! isNaN(Palletizerresults[key]))
                                      //NOTE: Cambiar path
                                      fs.appendFileSync('C:/PULSE/L19/L19_LOGS/BRA_IND_Palletizer_L19.log', 'tt=' + Palletizertime + ',var=' + key + ',val=' + Palletizerresults[key] + '\n');
                                    }
                                    EOLflagPrint = 0;
                                  }
                            //------------------------------------------Palletizer----------------------------------------------


                          });//Cierre de lectura

                        },1000);
                    });//Cierre de cliente
                        client3.on('error', function(err) {
                            console.log(err);
                        });
                        client3.on('close', function() {
                        });



}catch(err){
    fs.appendFileSync("error.log",err + '\n');
}
