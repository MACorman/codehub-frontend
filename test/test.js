// const myModule = require('../src/language.js');
// let createLanguage = myModule.createLanguage;
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


  it('should return a span that contains a language name', function() {
    // console.log(createLanguage({name: "Ruby", id: 3})) 
    // let element = "span"
    // assert.equal(obj.tagName, element)
    
  })
})

describe('getLanguage', function() {
  it('should fetch the languages from the API and render them', function() {
    console.log(getLanguage())
  })
})