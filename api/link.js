const request = require('request');

module.exports = async(req, res) => {
    let query = req.query.query;
    var getsid = {
        'method': 'GET',
        'url': query
    };
    request(getsid, function(error, response) {
        if (error) {
            res.json({ result: "false" });
        } else {
            if (response.body.split('"song":{"type":"')[1] == undefined) {
                res.json({ result: "false" });
            } else {
                try {
                    var sid = response.body.split('"song":{"type":"')[1].split('","image":')[0].split('"')[8];
                } catch (err) {
                    var sid = response.body.split('"params":{"pid":"')[1].split('"')[0];
                }
                var options = {
                    'method': 'GET',
                    'url': "https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=" + sid
                };
                request(options, function(error, response) {
                    if (error) throw new Error(error);
                    var songraw = (response.body);
                    var replaceid = songraw.replace(sid, 'tuhin');
                    var replacemediaurltxt = replaceid.replace('media_preview_url', 'media_url');
                    var replacemediaurl = replacemediaurltxt.replace('preview.saavncdn.com', 'aac.saavncdn.com');
                    var replaceqs = replacemediaurl.replace('_96_p', '_160');
                    var imgq = replaceqs.replace('150x150', '500x500');
                    var ampr = imgq.replace(/&amp;/gi, "&");
                    var copr = ampr.replace(/&copy;/gi, "©");
                    var result = JSON.parse(copr);
                    var songresult = result.tuhin;
                    res.json(songresult);
                })
            };
        };
    });
}