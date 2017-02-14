var request = require('request');
var fs = require('fs');

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

    var contributors = JSON.parse(body);

    // console.log("This is the URL Body:", contributors);
    for (var eachLogin of contributors) {
      var loginName = eachLogin.login;
      var filePath = './avatars/' + loginName + '.jpg';
      //console.log(filePath);
      cb(eachLogin.avatar_url, filePath);
      //console.log(eachLogin.avatar_url);
    }
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
};

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

//downloadImageByURL('https://avatars.githubusercontent.com/u/43004?v=3', './avatars/image.jpg')

getRepoContributors("jquery", "jquery", downloadImageByURL);




