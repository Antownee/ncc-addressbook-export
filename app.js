'use strict';
var NEM = require('./NEM.js');
var utils = require('./utils.js');
var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var path = require('path');

var nem = new NEM(null);

var walletName = null;

async.waterfall([
    //Get user input
    (cb) => {
        utils.getUserCredentrials((ans) => {
            var conf = {
                "addressBook": ans.walletname,
                "password": ans.password
            };
            return cb(null, conf);
        });
    },
    (conf, cb) => {
        //Fetch addresses
        nem.nccPost("/addressbook/open", conf,
            (err) => {
                if (err) {
                    return cb(err);
                }
            },
            (inf) => {
                if (inf.message === "ADDRESS_BOOK_DOES_NOT_EXIST" || inf.message === "ADDRESS_BOOK_PASSWORD_INCORRECT") {
                    return cb(new Error(inf.message));
                }
                walletName = inf.addressBook;
                var addressObjects = inf.accountLabels;
                var formattedAddresses = _.map(addressObjects, (add) => {
                    return {
                        label: add.privateLabel || add.publicLabel,
                        address: add.address
                    };
                });
                console.log("Successfully retrieved addresses..")
                return cb(null, formattedAddresses);
            }
        );
    },
    (fa, cb) => {
        //Base64 the formatted addresses
        var adb = base64Encode(JSON.stringify(fa));
        console.log("Encoded addresses..");
        return cb(null, adb);
    },
    (adb, cb) => {
        //Write to file. 
        //If it exists, overwrite?
        fs.writeFile(`./${walletName}.adb`, adb, (err) => {
            if (err) {
                return cb(err);
            }
            console.log(`Successfully written to file.. ${walletName}.adb`);
            return cb(null);
        });
    }
], (err) => {
    if (err) {
        //err.code || err.errno == "ECONNREFUSED"
        if (err.code === "ECONNREFUSED" || err.errno === "ECONNREFUSED") {
            console.log("Please make sure that your NCC instance is running prior to running this tool.");
            process.exit(1);
        } else if (err.message === "ADDRESS_BOOK_DOES_NOT_EXIST") {
            console.log("Invalid address book name.");
            process.exit(1);
        } else if (err.message === "ADDRESS_BOOK_PASSWORD_INCORRECT") {
            console.log("Invalid address book password.");
            process.exit(1);
        }
        throw err;
    }
    process.exit(1);
});



function base64Encode(addresses) {
    return new Buffer(addresses).toString('base64');
    //Error checking?
}