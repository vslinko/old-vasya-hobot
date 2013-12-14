/**
 * Вяся Хобот
 *
 * Copyright (c) 2013 Vyacheslav Slinko
 * Licensed under the MIT License
 */


module.exports = function(vasya) {
    vasya.addHelp('список комманд', [
        'vasya help',
        'вася помощь',
        'вась, что умеешь?'
    ]);

    vasya.respond(/(?:help|помощь|(?:че|что) умеешь\??)/i, function(msg) {
        msg.reply(vasya.helpCommands().join('\n'));
    });
};
