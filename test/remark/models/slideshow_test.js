var Slideshow = require('../../../src/remark/models/slideshow').Slideshow
  , Slide = require('../../../src/remark/models/slide').Slide
  ;

describe('Slideshow', function () {
  describe('slides', function () {
    it('should be created', function () {
      var slideshow = new Slideshow('a\n---\nb'); 

      slideshow.slides.should.have.length(2);
    });
  });

  describe('name mapping', function () {
    it('should map named slide', function () {
      var slideshow = new Slideshow('name: a\n---\nno name\n---\nname: b');

      slideshow.slides.names.should.have.keys(['a', 'b']);
    });
  });

  describe('templates', function () {
    it('should have properties inherited by referenced slide', function () {
      var slideshow = new Slideshow('name: a\na\n---\ntemplate: a\nb');

      slideshow.slides[1].source.should.equal('\na\nb');
    });

    it('should have source inherited by referenced slide', function () {
      var slideshow = new Slideshow('name: a\na\n---\ntemplate: a\nb');

      slideshow.slides[1].source.should.equal('\na\nb');
    });
  });

  describe('layout slides', function () {
    it('should be default template for subsequent slides', function () {
      var slideshow = new Slideshow('layout: true\na\n---\nb'); 

      slideshow.slides[0].source.should.equal('\nab');
    });

    it('should not be default template for subsequent layout slide', function () {
      var slideshow = new Slideshow('layout: true\na\n---\nlayout: true\nb\n---\nc'); 

      slideshow.slides[0].source.should.equal('\nbc');
    });

    it('should be omitted from list of slides', function () {
      var slideshow = new Slideshow('name: a\nlayout: true\n---\nname: b'); 

      slideshow.slides.should.have.length(1);
    });

    it('should still be mapped if named', function () {
      var slideshow = new Slideshow('name: a\nlayout: true'); 

      slideshow.slides.names.should.have.keys(['a']);
    });
  });
});
