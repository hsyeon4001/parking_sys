const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const moment = require('moment');
const flash = require('connect-flash');
const { stream } = require('./server/config/winston');

const mainRouter = require('./server/routes/mainRouter');
const inRouter = require('./server/routes/inRouter');
const outRouter = require('./server/routes/outRouter');
const checkRouter = require('./server/routes/checkRouter');
const ticketRouter = require('./server/routes/ticketRouter');

const app = express();

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

app.use(morgan('combined', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());

app.use('/', mainRouter);
app.use('/in', inRouter);
app.use('/out', outRouter);
app.use('/check', checkRouter);
app.use('/ticket', ticketRouter);

app.set('port', process.env.PORT || 3001);

const server = app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${server.address().port}`);
})


module.exports = app;