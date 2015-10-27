#! /usr/bin/node

var mongoose = require('mongoose');
mongoose.connect('localhost', 'test');

var fs = require('fs');
var lineList = fs.readFileSync('http://dadosabertos.rio.rj.gov.br/apiTransporte/Apresentacao/csv/gtfs/onibus/percursos/gtfs_linha377-shapes.csv').toString().split('\n');
lineList.shift(); // Shift the headings off the list of records.


var schemaKeyList = ["linha","descricao","agencia","sequencia","shape_id","latitude","longitude"];

var RotaSquema = new mongoose.Schema({
    linha: String,
    descricao: String,
    agencia: String,
    sequencia: Number,
    shape_id: Number,
    latitude: Number,
    longitude: Number
});
var RotaModel = mongoose.model('RepOpp', RotaSquema);

function queryAllEntries () {
    RotaModel.aggregate(
        {$group: {_id: '$linha', rotaArray: {$push: {
            descricao: '$descricao', 
            agencia: '$agencia',
            sequencia: '$sequencia',
            shape_id: '$shape_id',
            latitude: '$latitude',
            longitude: '$longitude'
            }}
        }}, function(err, qDocList) {
        console.log(util.inspect(qDocList, false, 10));
        process.exit(0);
    });
}

// Recursively go through list adding documents.
// (This will overload the stack when lots of entries
// are inserted.  In practice I make heavy use the NodeJS 
// "async" module to avoid such situations.)
function createDocRecurse (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    if (lineList.length) {
        var line = lineList.shift();
        var doc = new RotaModel();
        line.split(',').forEach(function (entry, i) {
            doc[schemaKeyList[i]] = entry;
        });
        doc.save(createDocRecurse);
    } else {
        // After the last entry query to show the result.
        queryAllEntries();
    }
}

createDocRecurse(null);