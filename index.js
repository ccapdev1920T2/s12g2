const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

const routes = require('./routes/routes.js');

const port = process.env.PORT || 3000;
const app = express();

const admin = false;
const cannotBeFound = "Cannot find the page you are looking for. :/ or incorrect view (change it sa index.js)";

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
    
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
});

handlebars.registerHelper('loop', function(n) {
    var a = [];
    
    for(var i = 0; i < n; i++)
        a.push(' ');

    return a;
});

app.use('/', routes);


app.listen(port, function() {
    console.log('Listening at port ' + port); 
});