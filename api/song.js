const request = require('request');

module.exports = async(req, res) => {
    let id = req.query.id;
    var options = {
        'method': 'GET',
        'url': "https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=" + id
    };
    request(options, function(error, response) {
        if (error) {
            res.json({ result: "false" });
        } else {
            var songraw = (response.body);
            if ((songraw.includes("[]")) == true) {
                res.json({ result: "false" });
            } else {
                var replaceid = songraw.replace(id, 'tuhin');
                var replacemediaurltxt = replaceid.replace('media_preview_url', 'media_url');
                var replacemediaurl = replacemediaurltxt.replace('preview.saavncdn.com', 'aac.saavncdn.com');
                var replaceqs = replacemediaurl.replace('_96_p', '_160');
                var imgq = replaceqs.replace('150x150', '500x500');
                var ampr = imgq.replace(/&amp;/gi, "&");
                var copr = ampr.replace(/&copy;/gi, "©");
                var result = JSON.parse(copr);
                var songresult = result.tuhin;
                res.json(songresult);
            };
        };
    });
}