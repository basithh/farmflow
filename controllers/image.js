exports.saveImageToDisk=(url, localPath)=>{var fullUrl = url;
    var file = fs.createWriteStream(localPath);
    var request = https.get(url, function(response) {
    response.pipe(file);
    });
    }