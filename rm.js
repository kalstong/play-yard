const fs = require('node:fs');

const item = process.argv[2];
fs.rm(item, { force: true, recursive: true }, (err) => {
    if (err) process.exit(1);
    else process.exit(0);
});