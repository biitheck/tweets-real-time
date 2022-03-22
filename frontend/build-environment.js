var fs = require('fs');
var replace = require('replace-in-file');

var args = process.argv.slice(2) || [];

if (args.length > 0) {
    var GOOGLE_CLIENT_ID = args[0].split('=')[1];
    console.log(GOOGLE_CLIENT_ID);
    var baseFilePath = process.cwd() + '/.sample-environment.ts';
    var rootPath = process.cwd() + '/src/environments';
    var filePath = rootPath + '/environment.prod.ts';
    var filePath2 = rootPath + '/environment.ts';

    if (!fs.existsSync(rootPath)) {
        fs.mkdirSync(rootPath, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    if (fs.existsSync(filePath2)) {
        fs.unlinkSync(filePath2);
    }

    var data = fs.readFileSync(baseFilePath, 'utf8');

    fs.writeFile(filePath, data, function (err) {
        if (err) throw err;

        var options = {
            files: [filePath],
            from: /{{GOOGLE_CLIENT_ID}}/g,
            to: '340646440484-8bba6m4clj16o1jphsjq5igtr33nmnte.apps.googleusercontent.com',
        };

        replace.replaceInFileSync(options);

        fs.copyFileSync(filePath, filePath2);

        console.log('Environment file is created successfully.');
    });
}
