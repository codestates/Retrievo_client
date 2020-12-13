"use strict";
exports.__esModule = true;
exports.BasicDetail = void 0;
var react_1 = require("react");
var Form_1 = require("../../../components/Form");
var initialValues = {};
var validationSchema = {};
var onSubmit = {};
exports.BasicDetail = function () {
    return react_1["default"].createElement(Form_1["default"], { initialValues: true, validationSchema: true, onSubmit: true });
};
exports["default"] = exports.BasicDetail;
