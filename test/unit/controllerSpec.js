describe('ek.mobileFrame', function () {

  var scope, controller;

  beforeEach(module('ek.mobileFrame'));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('MobileFrameCtrl', {
      $scope: scope
    });
  }));

  describe('mobileFrameController', function () {

    it('should be defined', function () {
      expect(controller).toBeDefined();
    });

    it('should have a "toggleNav"-method', function () {
      expect(controller.toggleNav).toBeDefined();
    });

    it('should have a "onNavToggle"-method', function () {
      expect(controller.onNavToggle).toBeDefined();
    });

    it('"onNavToggle" passes a callback', function () {

      expect(controller.callback).toBeUndefined();
      controller.onNavToggle(function () {});
      expect(controller.callback).toBeDefined();
      expect(typeof controller.callback).toBe('function');

    });

    it('the callback gets called', function () {

      controller.onNavToggle(function () {});
      spyOn(controller, 'callback');
      controller.toggleNav();

      expect(controller.callback).toHaveBeenCalled();

    });

  });

});