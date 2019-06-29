"use strict";
exports.__esModule = true;
var alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
function getkey(text, key) {
    var newtext = text.toUpperCase().split('');
    var nkey = key.toUpperCase().split('');
    var newkey = [];
    while (newtext.length > newkey.length) {
        newkey.push(nkey[newkey.length % nkey.length]);
    }
    return newkey;
}
function encrypt(text, key) {
    var newkey = getkey(text, key);
    var newtext = text.toUpperCase().split('');
    return newtext.map(function (letter, index) {
        return alph[(alph.indexOf(newkey[index]) + alph.indexOf(letter)) % alph.length];
    }).toString().split(',').join('');
}
exports.encrypt = encrypt;
// just a quick recursive decryption, will be updated to actual decryption later
function decrypt(text, key) {
    for (var i = 0; i < 25; i++) {
        text = encrypt(text, key);
    }
    return text;
}
exports.decrypt = decrypt;
