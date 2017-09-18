'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by 35824 on 2016/6/16.
 */

var Test = function () {
    function Test() {
        (0, _classCallCheck3.default)(this, Test);

        this.value = "";
    }

    (0, _createClass3.default)(Test, [{
        key: 'asyncFunc',
        value: function () {
            var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log('a async function.');

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function asyncFunc() {
                return ref.apply(this, arguments);
            }

            return asyncFunc;
        }()
    }, {
        key: 'normal',
        value: function normal() {
            console.log('a normal function');
        }
    }]);
    return Test;
}();

exports.default = Test;
//# sourceMappingURL=Test.js.map