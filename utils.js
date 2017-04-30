'use strict';
const inquirer = require('inquirer');

var exports = module.exports = {};

exports.getUserCredentrials = function(cb) {
    var questions = [{
            name: 'walletname',
            type: 'input',
            message: 'Enter your NCC wallet name.',
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your wallet name';
                }
            }
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter your wallet password:',
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your wallet password';
                }
            }
        }
    ];

    inquirer.prompt(questions).then(function(answers) {
        cb(answers);
    });
};