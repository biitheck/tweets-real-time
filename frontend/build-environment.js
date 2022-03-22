var fs = require('fs');
var { exit } = require('process');
var replace = require('replace-in-file');

var args = process.argv.slice(2) || [];

if (args.length > 0) {
    var GOOGLE_CLIENT_ID = args[0].split('=')[1];

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
            to: GOOGLE_CLIENT_ID,
        };
        replace.replaceInFileSync(options);

        fs.copyFileSync(filePath, filePath2);

        console.log('Environment file is created successfully.');
    });
}
