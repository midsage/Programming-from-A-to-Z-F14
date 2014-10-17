var servi = require('servi');
var app = new servi(true);

port(8080);

serveFiles('public');

var concordance = useDatabase('words');

route('/save', saveData);


// function searchIt(word) {
//   return function(data) {
//     if (data.length === 0) {
//       var record = {};
//       record.word = word;
//       record.count = 1;
//       concordance.add(record);
//       console.log('New word! ' + word + ': ' + 1);
//     } else {
//       var record = data[0]; // Assume it's the first record
//       var num = data[0].count + 1;
//       var id = data[0]._id;
//       // concordance.update({_id: id}, {$set: {count: num}}, {});  
//       console.log('New count for ' + word + ': ' + num);
//       // concordance.change(id, {count: num});
//     }
//   }
// }

function searchIt(word, data) {
  console.log(data);
  //console.log('what: ' + what);
  if (data.length === 0) {
    var record = {};
    record.word = word;
    record.count = 1;
    concordance.add(record);
    console.log('New word! ' + word + ': ' + 1);
  } else {
    var record = data[0]; // Assume it's the first record
    var num = data[0].count + 1;
    var id = data[0]._id;
    // concordance.update({_id: id}, {$set: {count: num}}, 
    //   function(err, numReplaced) {
    //     console.log('updated ' + numReplaced);
    //     if (err) console.log(err);
    //   });  
    console.log('New count for ' + word + ': ' + num);
    // concordance.change(id, {count: num});
  }
}

function testCallback(data) {
  if (data.length !== 0) {
    console.log(data);
    var record = data[0]; // Assume it's the first record
    var num = data[0].count + 1;
    var id = data[0]._id;
    concordance.update({_id: id}, {$set: {count: num}}, {},
      function(err, numReplaced) {
        console.log('updated ' + numReplaced);
        if (err) console.log(err);
      });  
    //concordance.remove({_id: record._id}, {});
    //concordance.add({word: record.word, count: num});
    console.log('New count for ' + record.word + ': ' + num);
  } else {
    var record = {};
    record.word = 'test';
    record.count = 1;
    concordance.add(record);  }

    // concordance.change(id, {count: num});
}


function saveData(request) {
  // if (request.fields === undefined) {
  //   request.respond('no data from form');
  //   return;
  // }
  // var txt = request.fields.txt;
  // var tokens = txt.split(/\W+/);  
  //for (var i = 0; i < tokens.length; i++) {
    // concordance.search('word', tokens[i], searchIt.bind(null,tokens[i])); 

    // concordance.search('word', tokens[i], searchIt(tokens[i])); 
  //}
  //concordance.search('word', 'hello', searchIt.bind(null,'hello')); 
  concordance.search('word', 'test', testCallback); 

  //request.respond('finished');
  request.redirect('/');
  //names.add(data);
  //request.respond('Thanks your data was saved:' + data.name + ',' + data.num);
}

// route('/json', jsonData);

// function jsonData(request) {
//   names.getAll(gotData);

//   function gotData(data) {
//     var output = JSON.stringify(data);
//     request.respond(output);
//   }
// }



// function saveData(request) {
//   // Query String
//   var data = {
//     name: request.params['name'],
//     num: request.params['num']
//   };

//   names.add(data);
//   request.respond('Thanks your data was saved:' + data.name + ',' + data.num);
// }

start();