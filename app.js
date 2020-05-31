// window.alert('hello world!');
// console.log('its working');


const addCountBtn = document.getElementById('add-count-btn');
      substractCountBtn = document.getElementById('substract-count-btn');
      serialNum = document.getElementById('serial-num');
      justSerial = document.getElementById('just-serial');

      popUp = document.getElementById('pop-up');

      transactionCountBtn = document.getElementById('transaction-count-btn');
      //database instance
      database = firebase.database();
      seikoMasRef = database.ref().child('seiko62mas'); // check also cae-backs/62mas


///////////////////////////////////////////////////////////////////
      var connectedRef = firebase.database().ref(".info/connected");
          // connectionReferance = database.ref('connections');
      connectedRef.on("value", function(snap) {
        if (snap.val() === false) {
          // alert("not connected");
          popUp.innerText = 'sorry -please wayt for connection- we have limit of 100 simultanius users';
          console.log("not connected");

        } else {
          // alert("connected");
          popUp.innerText = 'you are now connected to database - yupiiiii';
          console.log("connected");
          // connectionReferance.transaction(function(currentConnectionsMinus) {
          //       // If users/ada/rank has never been set, currentRank will be `null`.
          //       return currentConnectionsMinus - 1;
          //       console.log("ooooooooooooooooooooooooo");
          // });
        }
      });

///////////////////////////////////////////

seikoMasRef.on('value', snap => {


// store result and manipulation with 000 in variable so i can extract it elsewere

  if (snap.val() > 9999) {
     // document.getElementById("demo3").innerHTML = "sorry end of 9999 production peacesis for this month" ;
     serialNum.innerText = 'sorry end of 9999 production peacesis for this month'; //change with some modal window and notifiction "end of 9999 production for this month"
     justSerial.innerText = 'sorry end of 9999 production peacesis for this month';
  }
  else if (snap.val() < 10) {
     // document.getElementById("demo3").innerHTML = "00" + x;
     serialNum.innerText = '000' + JSON.stringify(snap.val());
     justSerial.innerText = '000' + JSON.stringify(snap.val());
  }
  else if (snap.val() < 100) {
     // document.getElementById("demo3").innerHTML = "0" + x;
      serialNum.innerText = '00' + JSON.stringify(snap.val());
      justSerial.innerText = '00' + JSON.stringify(snap.val());
  }
  else if (snap.val() < 1000 ) {
     // document.getElementById("demo3").innerHTML = "0" + x;
      serialNum.innerText = '0' + JSON.stringify(snap.val());
      justSerial.innerText = '0' + JSON.stringify(snap.val());
  }
  else  {
      serialNum.innerText = JSON.stringify(snap.val());
      justSerial.innerText = JSON.stringify(snap.val());
  }

    // serialNum.innerText = JSON.stringify(snap.val());
    console.log('new value from database: ' + snap.val());

    // firebase.database().goOffline();

});


/////////////////////
//  https://stackoverflow.com/questions/13304471/javascript-get-code-to-run-every-minute
///////////////////////////////////////////////////
// function fn20sec() {
//     // runs every 60 sec and runs on init.
//     firebase.database().goOffline();
// }
// fn20sec();
// setInterval(fn20sec, 20*1000);
//
// function fn40sec() {
//     // runs every 60 sec and runs on init.
//     firebase.database().goOnline();
// }
// fn40sec();
// setInterval(fn40sec, 40*1000);
/////////////////////



  addCountBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // window.alert('btn clicked. its working');
    // console.log('btn clicked. its working');

// firebase.database().goOnline();

    // take serial num p element iner text and c ount from that find beter solutiuon to red directly from database
 var
 // serial = seikoMasRef.value;
     // serialNum.innerText = ++serial;
     serial = ++serialNum.innerText;
     console.log("console-log: " + serial);
     newData =  {
          seiko62mas: serial
        }
   // var seikoMasRef = database.ref();
    database.ref().update(newData);
  });

  substractCountBtn.addEventListener('click', (e) => {
    e.preventDefault();


    // firebase.database().goOnline();

    // take serial num p element iner text and c ount from that find beter solutiuon to red directly from database
 var
 // serial = seikoMasRef.value;
     // serialNum.innerText = ++serial;
     serial = --serialNum.innerText;
     console.log("console-log: " + serial);
     newData =  {
          seiko62mas: serial
        }
   // var seikoMasRef = database.ref();
    database.ref().update(newData, function(error) {
      // Add a Completion Callback
      // https://firebase.google.com/docs/database/web/read-and-write?authuser=0#add_a_completion_callback
      if (error) {
          // The write failed...
          window.alert('The write failed...');
      } else {
         // Data saved successfully!
         window.alert('Data saved successfully!');
         serialNum

      }
    });
  });


// add one with transaction in case of multiply clients simultanius write conflict
// https://firebase.google.com/docs/reference/js/firebase.database.Reference#transaction

var seikoMasReferance = database.ref('case-backs/62mas'); // check also cae-backs/62mas

transactionCountBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Increment seiko62mas  serial  by 1.
  // var adaRankRef = firebase.database().ref('users/ada/rank');

// firebase.database().goOnline();

  // var seikoMasReferance = database.ref('case-backs/62mas'); // check also cae-backs/62mas
  seikoMasReferance.transaction(function(currentSerial) {
        // If users/ada/rank has never been set, currentRank will be `null`.
        return currentSerial + 1;
  });
});

//get new value from case-backs/62mas object in database

seikoMasReferance.on('value', function gistro(snap) {
    // serialNum.innerText = JSON.stringify(snap.val());
    console.log('new case-backs/62mas object value from database:' + snap.val());

    // justSerial.innerText = JSON.stringify(snap.val());

});



///////////////////////////////////////////
// YEAR AND DATE PART OF SERIAL NUMBER
///////////////////////////////////////////


var serialNumYear = document.getElementById('serial-num-year');
    serialNumMonth = document.getElementById('serial-num-month');
    // https://stackoverflow.com/questions/17306830/how-to-get-2-digit-year-w-javascript
    // get curent year and substract only last digit of the year
    productionYear = parseInt(new Date().getUTCFullYear().toString().substr(3,1));
    //get curent month and add 1 couse string starts from 0 (january =0)
    productionMonth = parseInt(new Date().getUTCMonth().toString().substr(0)) + 1;


// write year - last digit only
serialNumYear.innerText = productionYear;

// months and change to o n d if months are okrtobar november and december else get month number
// use switch instead of if statment: https://www.w3schools.com/js/js_switch.asp

var finalMonth;

switch (productionMonth) {
  case 10:
    // serialNumMonth.innerText = "O";
    finalMonth = "O";
    break;
  case 11:
    // serialNumMonth.innerText = "N";
    finalMonth = "N";
    break;
  case 12:
    // serialNumMonth.innerText = "D";
    finalMonth = "D";
    break;
  default:
    finalMonth = productionMonth;
}

serialNumMonth.innerText = finalMonth;


///////////////////////////////////////////
// just test full year
///////////////////////////////////////////
var fullSerial = document.getElementById('full-serial');


// https://www.youtube.com/watch?v=NcewaPfFR6Y
// takodje vidi: https://stackoverflow.com/questions/39888080/how-do-i-return-a-snapshot-val-from-firebase-to-a-variable
// seikoMasReferance.on('value', gotData);
// function gotData(data) {
//   // console.log ('eee: ' + JSON.stringify(data.val()));
//    var gistro = JSON.stringify(data.val());
// }

// convert numbers back to string!: https://www.w3schools.com/jsref/jsref_tostring_number.asp
fullSerial.innerHTML = productionYear.toString() + ' ' + finalMonth.toString() + ' ';

// treba da ih poredjam: last year number + month (1-9 + o, n, d) + production number (4 dig with 0 in front)
