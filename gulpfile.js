var gulp = require ('gulp'),
    uglify = require ('gulp-uglify'),
    fs = require ('fs'),
    parCss = require ('parcss'),
    chalk = require ('chalk'),
    inject = require ('gulp-inject');

gulp.task ('build', function () {

    var map = {};

    function read (content, callback) {

        parCss.parse (parCss.lex (content)).forEach (function (block) {
            if ( block.content ) {
                block.content.forEach (function (content) {
                    if ( content.property === 'content' ) {
                        var utf = content.valueTokens[0].source.replace (/"/g, '').replace (/\\/g, '');
                        block.selectors.forEach (function (selector) {
                            if ( selector.match (/:before$/) ) {
                                var sel = selector.replace (/\/\*([\s\S]*?)\*\//, '').replace (/:before$/, '').replace (/^\s+|\s+$/g, '').replace (/^\./, '');
                                map[sel] = utf;
                            }
                        });
                    }
                });
            }
        });
        if ( callback ) {
            callback ();
        }
    }

    fs.readFile (__dirname + '/node_modules/font-awesome/css/font-awesome.css', 'utf8', function (err, data) {
        if ( err ) return console.error (chalk.red (err));
        read (data, function () {
            fs.readFile (__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css', 'utf8', function (err, data) {
                var content = '',
                    regex = /\.glyphicon-(.*?):before(\s*?)\{([\s\S]*?)\}/gm,
                    matches = data.match (regex);
                matches.forEach (function (match) {
                    content += match;
                });
                read (content, function () {
                    fs.writeFile (__dirname + '/dist/map.json', JSON.stringify (map, null, 2).replace(/;$/,''), 'utf8', function () {
                        if ( err ) return console.error (chalk.red (err));

                        gulp.src ('index.js').
                            pipe (inject (gulp.src (["dist/map.js"], { read : false }), {
                            starttag  : '/* inject:map */var maps = [',
                            endtag    : ']',
                            transform : function (filepath, file, i, length) {
                                return fs.readFileSync (__dirname + filepath, 'utf8');
                            }

                        }))
                            .pipe (gulp.dest ("dist"));

                    });
                });
            });
        });
    });

});