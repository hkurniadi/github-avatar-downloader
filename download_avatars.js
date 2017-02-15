var request = require('request');
var fs = require('fs');
require('dotenv').config();

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;
var OWNER = process.argv[2];
var NAME = process.argv[3];

var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + OWNER + '/' + NAME + '/contributors';

var requestOption = {
  url: requestURL,
  headers: {
    'User-Agent': 'GitHub Avatar Downloader - Student Project'
  }
};

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
};

function getRepoContributors(repoOwner, repoName, cb) {
  if (!repoOwner || !repoName) {
    console.log("Please provide repoOwner and repoName");
    return;
  }

  request(requestOption, function (err, response, body) {
    if (err) {
      throw err;
    }

    var contributors = JSON.parse(body);

    for (var eachLogin of contributors) {
      var loginName = eachLogin.login;
      var filePath = './avatars/' + loginName + '.jpg';
      cb(eachLogin.avatar_url, filePath);
    }
  });
}

getRepoContributors(OWNER, NAME, downloadImageByURL);




