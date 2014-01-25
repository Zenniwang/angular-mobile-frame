describe('ek.mobileFrame', function () {

  var $window;

  beforeEach(module('ek.mobileFrame'));

  beforeEach(inject(function (_$window_) {
    $window = _$window_;
  }));

  describe('mobileFrame-Directive with ng-view', function () {

    var elem, scope;

    beforeEach(inject(function ($rootScope, $compile) {

      elem = angular.element([
        '<mobile-frame class="custom-class">',
        ' <mobile-header height="40">Hodor says: {{hodor}}</mobile-header>',
        ' <mobile-nav width="200">A link: {{link}}</mobile-nav>',
        ' <mobile-content class="foo bar">',
        '   <div ng-view></div>',
        ' </mobile-content>',
        ' <mobile-footer height="30">&copy; {{year}}</mobile-footer>',
        '</mobile-frame>'
      ].join(''));

      scope = $rootScope.$new();

      $compile(elem)(scope);

      scope.$digest();

      $window.innerHeight = 100;

      requestAnimationFrame = function (cb) { cb(); };

    }));

    it('should have the outer frame', function () {
      expect(elem[0].tagName.toLowerCase()).toEqual('section');
      expect(elem[0].className).toContain('mobile-frame');
      expect(elem[0].className).toContain('custom-class');
    });

    it('should have the header.', function () {

      var header = elem.find('header'),
          headerInner = header.find('div');

      expect(header.length).toEqual(1);
      expect(header[0].className).toContain('mobile-header');
      expect(header.attr('role')).toEqual('banner');
      expect(header.css('height')).toEqual('40px');

      expect(headerInner[0].className).toEqual('mobile-header__inner');
      expect(headerInner.text()).toEqual('Hodor says: ');

      scope.$apply(function () {
        scope.hodor = 'Hodor!';
      });

      expect(headerInner.text()).toEqual('Hodor says: Hodor!');

    });

    it('should have the navigation', function () {

      var nav = $('.mobile-nav', elem),
          inner = nav.find('.mobile-nav__inner');

      expect(nav.length).toEqual(1);
      expect(nav.css('width')).toEqual('200px');
      expect(inner.text()).toEqual('A link: ');

      scope.$apply(function () {
        scope.link = 'Foobar';
      });

      expect(inner.text()).toEqual('A link: Foobar');

    });

    it('should have the content', function () {

      var content = $('.mobile-content', elem),
          inner = content.find('.mobile-content__inner'),
          evt;

      expect(content.length).toEqual(1);
      expect(inner.length).toEqual(1);
      expect(content.attr('role')).toEqual('main');
      expect(content.css('height')).toEqual('30px');

      $window.innerHeight = 170;

      evt = document.createEvent('HTMLEvents');
      evt.initEvent('resize', true, true);
      $window.dispatchEvent(evt);

      expect(content.css('height')).toEqual('100px');

    });

    it('should transclude the mobile-content', function () {

      var inner = $('.mobile-content__inner', elem);

      expect(inner.find('div').attr('ng-view')).toBeDefined();

    });

    it('should have the footer', function () {

      var footer = $('.mobile-footer', elem),
          inner = footer.find('.mobile-footer__inner');

      expect(footer.length).toEqual(1);
      expect(footer.css('height')).toEqual('30px');
      expect(inner.text()).toEqual('© ');

      scope.$apply(function () {
        scope.year = '2013';
      });

      expect(inner.text()).toEqual('© 2013');

    });

  });

  describe('mobileFrame-Directive with "static" content', function () {

    var elem, scope;

    beforeEach(inject(function ($rootScope, $compile) {

      elem = angular.element([
        '<mobile-frame>',
        ' <mobile-header></mobile-header>',
        ' <mobile-nav></mobile-nav>',
        ' <mobile-content class="foo bar">',
        '   <h1>Foobar - {{hodor}}</h1>',
        ' </mobile-content>',
        ' <mobile-footer></mobile-footer>',
        '</mobile-frame>'
      ].join(''));

      scope = $rootScope.$new();

      $compile(elem)(scope);

      scope.$digest();

    }));

    it('should have the content', function () {

      var content = $('.mobile-content', elem),
          inner = content.find('.mobile-content__inner'),
          headline = inner.find('h1');

      expect(content.length).toEqual(1);
      expect(content.attr('role')).toEqual('main');
      expect(content.attr('class')).toContain('foo bar');
      expect(inner.length).toEqual(1);
      expect(headline.length).toEqual(1);
      expect(headline.text()).toEqual('Foobar - ');

      scope.$apply(function () {
        scope.hodor = 'Hodor';
      });

      expect(headline.text()).toEqual('Foobar - Hodor');

    });

  });

});
