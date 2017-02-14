var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'hkurniadi';
var GITHUB_TOKEN = '9977f2941d4680fa042001d1e922e0e0d4162c99';
var repoOwner = 'jquery';
var repoName = 'jquery';


var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
//console.log(requestURL);
var requestOption = {
  url: requestURL,
  headers: {
    'User-Agent': 'GitHub Avatar Downloader - Student Project'
  }
};

function getRepoContributors(repoOwner, repoName, cb) {
  request(requestOption, function (err, response, body) {
    if (err) {
      throw err;
    }
    //console.log("This is the URL Response Status Code:", response.statusCode);
    //console.log("This is the URL Response Headers:", response.headers);
    //console.log("This is the URL Body:", body);
    var contributors = JSON.parse(body);
    for (var eachLogin of contributors) {
      console.log(eachLogin.avatar_url);
    }
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});