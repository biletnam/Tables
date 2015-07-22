
process.env.NODE_ENV = 'development';
process.env.PATH = './';
var express = require('express'),
    http    = require('http'),
    config  = require('backend/config'),
    path    = require('path');
var mongoose = require('backend/libs/mongoose');
var app = express();
app.set('port', config.get('port'));
http.createServer(app).listen(app.get('port'), function () {
    // console.log(log);
    console.log( 'Express on port ' + config.get('port'));
});


app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/teplates');
app.set('view engine', 'ejs');


app.use(express.favicon());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.bodyParser());

app.use(express.cookieParser());

var MongoStore = require('connect-mongo')(express);
app.use(express.session({
    secret : config.get('session:secret'),
    key : config.get('session:key'),
    store : new MongoStore({mongoose_connection: mongoose.connection})

}));

app.use(app.router);
require('backend/routes')(app);

app.use(function (req, res) {
    res.send('404', " 404: Page not found :( ");
});