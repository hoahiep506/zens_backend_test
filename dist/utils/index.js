"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneNumber = exports.isValidPhoneNumber = exports.getRandomCode = void 0;
const getRandomCode = () => {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};
exports.getRandomCode = getRandomCode;
const isValidPhoneNumber = (phoneNumber) => {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNumber);
};
exports.isValidPhoneNumber = isValidPhoneNumber;
const formatPhoneNumber = (phoneNumber) => {
    var _a;
    return (_a = phoneNumber.replace(/\s+|\+/g, '')) === null || _a === void 0 ? void 0 : _a.trim();
};
exports.formatPhoneNumber = formatPhoneNumber;
