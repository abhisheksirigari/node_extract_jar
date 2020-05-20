const StreamZip = require('node-stream-zip');
var mkdir = require('mkdirp');

const zip = new StreamZip({
    file: 'some.jar',
    storeEntries: true,
    skipEntryNameValidation: false
});
const extractToDirectory = './extracted';

zip.on('ready', () => {
    console.log('Entries read: ' + zip.entriesCount);
    for (const entry of Object.values(zip.entries())) {
        const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
        // console.log(`Entry =  ${entry.name}: ${desc}`);
        if (entry.name.indexOf('views') !== -1 && entry.name.indexOf('.json') !== -1) {
            console.log(`File entry file : ` + entry.name);
            
            // Read a file in memory
            // let zipDotTxtContents = zip.entryDataSync('views/dashboard.json').toString('utf8');
            // console.log("The content of views/json is: " + zipDotTxtContents);

            setTimeout(function(efile) {
                mkdir.sync(extractToDirectory);
                zip.extract(efile, extractToDirectory, err => {
                    console.log(err ? 'Extract error ' + efile.split('/')[1] : 'Extracted ' + efile.split('/')[1]);
                    zip.close();
                });
            }, 1000, entry.name);
        }
    }
});
