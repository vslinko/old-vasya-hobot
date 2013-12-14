/**
 * Вяся Хобот
 *
 * Copyright (c) 2013 Vyacheslav Slinko
 * Licensed under the MIT License
 */


var fs = require('fs-extra');


module.exports = function(vasya) {
    vasya.config.defaults({
        brain: {
            enabled: true,
            file: 'brain.json'
        }
    });

    if (!vasya.config.get('brain:enabled')) {
        return;
    }

    var previousData,
        brainFile = vasya.config.get('brain:file');

    if (fs.existsSync(brainFile)) {
        previousData = fs.readFileSync(brainFile).toString();
        vasya.brain.mergeData(JSON.parse(previousData));
    }

    vasya.brain.on('save', function(data) {
        data = JSON.stringify(data, null, 2);

        if (data !== previousData) {
            fs.outputFile(brainFile, data, function(err) {
                if (err) {
                    return vasya.logger.error(err);
                }

                previousData = data;
            });
        }
    });
};
