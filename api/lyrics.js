const request = require('request');

module.exports = async(req, res) => {
    let id = req.query.id;
    var options = {
        'method': 'GET',
        'url': "https://www.jiosaavn.com/api.php?__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker%3D0&lyrics_id=" + id
    };
    request(options, function(error, response) {
        if (error) {
            res.json({ result: "false" });
        } else {
            var lyricsraw = (response.body);
            var result = JSON.parse(lyricsraw);
            var lyricsresult = result.lyrics;
            if (lyricsresult === undefined) {
                res.json({ result: "false" });
            } else {
                var quoter = lyricsresult.replace(/"/gi, "'");
                res.json({ lyrics: quoter });
            };
        };
    });
}