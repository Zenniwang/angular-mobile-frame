describe('ek.mobileFrame', function () {

  var $mobileFrame, $window;

  beforeEach(module('ek.mobileFrame', function ($mobileFrameProvider) {
    $mobileFrameProvider
      .setHeaderHeight(40)
      .setFooterHeight(30)
      .setNavWidth(200);
  }));

  beforeEach(inject(function (_$mobileFrame_, _$window_) {
    $mobileFrame = _$mobileFrame_;
    $window = _$window_;
  }));

  describe('mobileFrame-Directive with ng-view', function () {

    var elem, scope;

    beforeEach(inject(function ($rootScope, $compile) {

      elem = angular.element([
        '<mobile-frame class="custom-class">',
        ' <mobile-header>Hodor says: {{hodor}}</mobile-header>',
        ' <mobile-nav>A link: {{link}}</mobile-nav>',
        ' <mobile-content class="foo bar">',
        '   <div ng-view></div>',
        ' </mobile-content>',
        ' <mobile-footer>&copy; {{year}}</mobile-footer>',
        '</mobile-frame>'
      ].join(''));

      scope = $rootScope.$new();

      $compile(elem)(scope);

      scope.$digest();

      $window.innerHeight = 100;

    }));

    it('should have the correct configs', function () {
      expect($mobileFrame).toBeDefined();
      expect($mobileFrame.getHeaderHeight).toBeDefined();
      expect($mobileFrame.getFooterHeight).toBeDefined();
      expect($mobileFrame.getNavWidth).toBeDefined();
      expect($mobileFrame.getHeaderHeight()).toEqual(40);
      expect($mobileFrame.getFooterHeight()).toEqual(30);
      expect($mobileFrame.getNavWidth()).toEqual(200);
    });

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

      expect(headerInner[0].className).toEqual('mobile-header-inner');
      expect(headerInner.text()).toEqual('Hodor says: ');

      scope.$apply(function () {
        scope.hodor = 'Hodor!';
      });

      expect(headerInner.text()).toEqual('Hodor says: Hodor!');

    });

    it('should have the navigation', function () {

      var nav = $('.mobile-nav', elem),
          inner = nav.find('.mobile-nav-inner');

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
          inner = content.find('.mobile-content-inner'),
          evt;

      expect(content.length).toEqual(1);
      expect(inner.length).toEqual(1);
      expect(content.attr('role')).toEqual('main');
      expect(inner.css('height')).toEqual('30px');

      $window.innerHeight = 170;

      evt = document.createEvent('HTMLEvents');
      evt.initEvent('resize', true, true);
      $window.dispatchEvent(evt);

      expect(inner.css('height')).toEqual('100px');

    });

    it('should transclude the mobile-content', function () {

      var inner = $('.mobile-content-inner', elem);

      expect(inner.find('div').attr('ng-view')).toBeDefined();

    });

    it('should have the footer', function () {

      var footer = $('.mobile-footer', elem),
          inner = footer.find('.mobile-footer-inner');

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
          inner = content.find('.mobile-content-inner'),
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
