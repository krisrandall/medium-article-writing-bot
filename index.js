
const newsProvider = require('./news');

newsProvider.getLatestNewsBrief().then( (n) => console.log(n) );
