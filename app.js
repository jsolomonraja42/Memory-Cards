var http = require('http');
var fs = require('fs');

fs.readFile('./index.html', function (err, data) {
    if (err) {
        console.log(err);
    }
    var server = http.createServer(function (req, res) {   //create web server
        if (req.url == '/memorycard/play') { //check the URL of the current request

            // set response header
            res.writeHead(200, { 'Content-Type': 'text/html' });

            // set response content    
            res.write(data);
            res.end();

        }
    }).listen(3000);
})


