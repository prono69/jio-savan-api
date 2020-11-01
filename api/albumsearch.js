const request = require('request');

module.exports = async(req, res) => {
    let query = req.query.query;
    var options = {
        'method': 'GET',
        'url': "https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=" + query
    };
    request(options, function(error, response) {
        if (error) {
            res.json({ result: "false" });
        } else {
            var searchraw = (response.body);
            var imgq = searchraw.replace(/50x50/gi, "500x500");
            var ampr = imgq.replace(/&amp;/gi, "&");
            var result = JSON.parse(ampr);
            var check = result.albums;
            if (check === undefined) {
                res.json({ result: "false" });
            } else {
                var albumresult = result.albums.data;
                res.json(albumresult);
            };
        };
    });
}