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

  describe('mobileFrameDirective', function () {

    var elem, elem2, scope, scope2;

    beforeEach(inject(function ($rootScope, $compile) {

      elem = angular.element([
        '<mobile-frame class="custom-class">',
        ' <mobile-header>Hodor says: {{hodor}}</mobile-header>',
        ' <mobile-nav>A link: {{link}}</mobile-nav>',
        ' <mobile-content class="foobar" ng-view></mobile-content>',
        ' <mobile-footer>&copy; {{year}}</mobile-footer>',
        '</mobile-frame>'
      ].join(''));

      elem2 = angular.element([
        '<mobile-frame class="custom-class">',
        ' <mobile-header>Hodor says: {{hodor}}</mobile-header>',
        ' <mobile-nav>A link: {{link}}</mobile-nav>',
        ' <mobile-content class="hodor">',
        '   <h1>Foobar</h1>',
        ' </mobile-content>',
        ' <mobile-footer>&copy; {{year}}</mobile-footer>',
        '</mobile-frame>'
      ].join(''));

      scope = $rootScope.$new();
      scope2 = $rootScope.$new();

      $compile(elem)(scope);
      $compile(elem2)(scope2);

      scope.$digest();
      scope2.$digest();

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
          content2 = $('.mobile-content', elem2),
          inner2 = content2.find('.mobile-content-inner'),
          hl = inner2.find('h1'),
          evt;

      expect(content.length).toEqual(1);
      expect(content.attr('ng-view')).toBeUndefined();
      expect(inner.length).toEqual(1);
      expect(inner.attr('ng-view')).toBeDefined();
      expect(content[0].className).toContain('foobar');
      expect(content.attr('role')).toEqual('main');
      expect(content.css('height')).toEqual('30px');

      expect(content2.length).toEqual(1);
      expect(content2[0].className).toContain('hodor');
      expect(inner2.length).toEqual(1);
      expect(inner2.html()).toContain('<h1>Foobar</h1>');

      $window.innerHeight = 170;

      evt = document.createEvent('HTMLEvents');
      evt.initEvent('resize', true, true);
      $window.dispatchEvent(evt);

      expect(content.css('height')).toEqual('100px');

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
});