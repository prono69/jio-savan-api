const request = require('request');

module.exports = async(req, res) => {
    let id = req.query.id;
    var options = {
        'method': 'GET',
        'url': "https://www.jiosaavn.com/api.php?__call=content.getAlbumDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&albumid=" + id
    };
    request(options, function(error, response) {
        if (error) {
            res.json({ result: "false" });
        } else {
            var albumraw = (response.body);
            if ((albumraw.includes(`{"error":{"code":"INPUT_INVALID","msg":"Empty strings are not allowed."}}`)) == true) {
                res.json({ result: "false" });
            } else {
                var replacemediaurltxt = albumraw.replace(/media_preview_url/gi, 'media_url');
                var replacemediaurl = replacemediaurltxt.replace(/preview.saavncdn.com/gi, 'aac.saavncdn.com');
                var replaceqs = replacemediaurl.replace(/_96_p/gi, '_160');
                var imgq = replaceqs.replace(/150x150/gi, '500x500');
                var ampr = imgq.replace(/&amp;/gi, "&");
                var copr = ampr.replace(/&copy;/gi, "©");
                var result = JSON.parse(copr);
                res.json(result);
            };
        };
    });
}