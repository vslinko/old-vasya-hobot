/**
 * Вяся Хобот
 *
 * Copyright (c) 2013 Vyacheslav Slinko
 * Licensed under the MIT License
 */


var hubot = require('hubot');
var nconf = require('nconf');
var path = require('path');
var util = require('util');


var Vasya = function() {
    this.env = process.env.NODE_ENV || 'development';
    this.production = this.env === 'production';
    this.config = nconf;
    this.commandsHelp = [];
    this.helpers = {};

    var adaptersPath = path.join(__dirname, '..', 'node_modules', 'hubot', 'src', 'adapters');
    var enableHttpd = false;
    var adapter = this.production ? 'skype' : 'shell';
    var name = 'Вася';

    hubot.Robot.call(this, adaptersPath, adapter, enableHttpd, name);
};


util.inherits(Vasya, hubot.Robot);


Vasya.prototype.respond = function(regex, callback) {
    var re = regex.toString().split('/').slice(1, -1).join('/');
    var names = ['vasya', 'v', 'вася', 'вась'].join('|');

    var newRegex = new RegExp('^(?:' + names + '),?\\s+' + re, 'i');

    this.listeners.push(new hubot.TextListener(this, newRegex, callback));
};


Vasya.prototype.parseHelp = function() {
    // disable hubot help format
};


Vasya.prototype.addHelp = function(help, commands) {
    var commandsHelp = commands.map(function(command) {
        return {
            command: command,
            help: help
        };
    });

    this.commandsHelp = this.commandsHelp.concat(commandsHelp);
};


Vasya.prototype.helpCommands = function() {
    var maxLength = 0;

    this.commandsHelp.forEach(function(commandHelp) {
        if (commandHelp.command.length > maxLength) {
            maxLength = commandHelp.command.length;
        }
    });

    return this.commandsHelp.map(function(commandHelp) {
        return [
            commandHelp.command,
            (new Array(maxLength - commandHelp.command.length).join(' ')),
            commandHelp.help
        ].join(' ');
    });
};


Vasya.prototype.run = function() {
    this.config.file(path.join(__dirname, '..', 'vasya.json'));

    this.load(path.join(__dirname, '..', 'helpers'));

    this.adapter.on('connected', function() {
        this.load(path.join(__dirname, '..', 'scripts'));
    }.bind(this));

    hubot.Robot.prototype.run.call(this);
};


module.exports = Vasya;
