
const axios = require('axios');
const news_api_key = require('./.credentials.json').newsapi_org_key;

const NEWS_PROVIDER = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=';
const PATH_TO_BRIEF = 'data.articles[0].content';
const NUM_CHARS_TO_GRAB = 128;

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

exports.getLatestNewsBrief = async () => {
    const news = await axios.get(`${NEWS_PROVIDER}${news_api_key}`);
    const newsBrief = Object.byString(news, PATH_TO_BRIEF);
    const shortNewsBrief = newsBrief.substr(0, NUM_CHARS_TO_GRAB);
    const shortBriefWithoutLastWord = shortNewsBrief.substring(0, shortNewsBrief.lastIndexOf(' '));
    return shortBriefWithoutLastWord;
}


