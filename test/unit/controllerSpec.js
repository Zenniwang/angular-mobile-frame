describe('ek.mobileFrame', function () {

  var scope, controller;

  beforeEach(module('ek.mobileFrame'));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('MobileFrameCtrl', {
      $scope: scope,
      $window: {
        innerHeight: 200
      }
    });
  }));

  describe('mobileFrameController', function () {

    it('should be defined', function () {
      expect(controller).toBeDefined();
      expect(controller.navVisible).toBeDefined();
      expect(controller.navAnimating).toBeDefined();
      expect(controller.toggleNav).toBeDefined();
    });

    it('should have default dimension values', function () {
      expect(controller.headerHeight).toBe(48);
      expect(controller.footerHeight).toBe(32);
      expect(controller.navWidth).toBe(240);
    });

    it('should compute the correct content-height', function () {
      expect(controller.contentHeight()).toBe(120);
    });

  });

});