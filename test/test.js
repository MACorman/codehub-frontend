// var assert = require('assert');
// let path = require('path')
// let createLanguage = path.resolve(__filename, "../src/index.js")
// let index = require('src/index.js')
const myModule = require('../src/language.js');
let createLanguage = myModule.createLanguage;
var chai = require('chai')
let {assert, expect} = chai

// function createLanguage () {
//   return "hello"
// }

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('createLanguage', function() {
  it('should be a function', function() {
    expect(createLanguage).to.be.a('function')
  })



  // it('should return a span element that contains a language name', function() {
  //   expect(createLanguage({name: "Ruby", id: 3}), 
    
  //   )
  // })
})