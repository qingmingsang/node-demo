
    var chai = require('chai');
    var expect = chai.expect;
    var My = require('../sqrt.js');

    describe("sqrt", function() {

      it("9的平方根应该等于3", function() {
        expect(My.sqrt(9)).to.equal(3);
      });

      it("参数为负值时应该报错", function() {
        expect(function(){ My.sqrt(-1); }).to.throw("负值没有平方根");
      });

    });
