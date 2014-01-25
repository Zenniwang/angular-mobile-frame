(function (angular, undefined) {

	var _directive_ = 'directive';

	var defaults = {
		headerHeight: 44,
		footerHeight: 32,
		navWidth: 240
	};

	// @todo: Commenting all this crap!

	angular

		.module('ek.mobileFrame', ['ng'])

		.controller('MobileFrameCtrl', ['$window', function ($window) {

			var that = this;

			angular.extend(this, defaults);

			this.toggleNav = function toggleNav() {
				that.callback.call();
			};

			this.onNavToggle = function onNavToggle(callback) {
				that.callback = callback;
			};

			this.contentHeight = function contentHeight() {
				return $window.innerHeight - (this.headerHeight + this.footerHeight);
			};

		}])

		[_directive_]('mobileFrame', ['$location', function ($location) {

			var navVisible = false,
				navWidth,
				$elem;

			function handleNav() {

				var val = navVisible ? 0 : navWidth;

				if ( arguments.length && !navVisible ) {
					return;
				}

				$elem.css({
					'-webkit-transform': 'translate3d(' + val + 'px, 0, 0)',
					'-moz-transform': 'translate3d(' + val + 'px, 0, 0)',
					'transform': 'translate3d(' + val + 'px, 0, 0)'
				});
				navVisible = !navVisible;

			}

			return {
				restrict: 'E',
				transclude: true,
				scope: true,
				replace: true,
				controller: 'MobileFrameCtrl',
				template: '<section class="mobile-frame" ng-transclude></section>',
				link: function link($scope, _$elem_, $attrs, mobileFrameCtrl) {

					navWidth = mobileFrameCtrl.navWidth;
					$elem = _$elem_.css({
						paddingLeft: navWidth + 'px',
						left: -navWidth + 'px'
					});
					mobileFrameCtrl.onNavToggle(handleNav);

					$scope.location = $location;
					$scope.$watch('location.path()', handleNav);

				}
			};
		}])

		[_directive_]('mobileHeader', function () {
			return {
				restrict: 'E',
				require: '^mobileFrame',
				transclude: true,
				replace: true,
				priority: 200,
				template: [
					'<header class="mobile-header" role="banner">',
					'	<button type="button" class="mobile-nav-toggle" id="mobile-nav-toggle">Toggle</button>',
					'	<div class="mobile-header-inner" ng-transclude></div>',
					'</header>'
				].join(''),
				link: function link($scope, $elem, $attrs, mobileFrameCtrl) {
					if ( $attrs.height !== undefined ) {
						mobileFrameCtrl.headerHeight = parseInt($attrs.height, 10);
					}
					$elem.css('height', mobileFrameCtrl.headerHeight + 'px');
					angular.element(
						document.getElementById('mobile-nav-toggle')
					).on('click', mobileFrameCtrl.toggleNav);
				}
			};
		})

		[_directive_]('mobileNav', function () {
			return {
				restrict: 'E',
				require: '^mobileFrame',
				transclude: true,
				replace: true,
				priority: 200,
				template: [
					'<div class="mobile-nav">',
					'	<div class="mobile-nav-inner" ng-transclude></div>',
					'</div>'
				].join(''),
				link: function link($scope, $elem, $attrs, mobileFrameCtrl) {
					if ( $attrs.width !== undefined ) {
						mobileFrameCtrl.navWidth = parseInt($attrs.width, 10);
					}
					$elem.css('width', mobileFrameCtrl.navWidth + 'px');
				}
			};
		})

		[_directive_]('mobileContent', ['$window', function ($window) {

			function setHeight($elem) {
				var that = this;
				requestAnimationFrame(function () {
					$elem.css('height', that.contentHeight() + 'px');
				});
			}

			return {
				restrict: 'E',
				require: '^mobileFrame',
				transclude: true,
				replace: true,
				priority: 100,
				scope: true,
				template: [
					'<div class="mobile-content" role="main">',
					'	<div class="mobile-content-inner" ng-transclude></div>',
					'</div>'
				].join(''),
				link: function link($scope, $elem, $attrs, mobileFrameCtrl) {
					angular.element($window).on('resize', setHeight.bind(mobileFrameCtrl, $elem));

					// little hacky, but `footerHeight` doesn't want to appear in time … o.O
					$scope.$watch('mobileFrameCtrl.headererHeight', setHeight.bind(mobileFrameCtrl, $elem));
					$scope.$watch('mobileFrameCtrl.footerHeight', setHeight.bind(mobileFrameCtrl, $elem));
				}
			};
		}])

		[_directive_]('mobileFooter', function () {
			return {
				restrict: 'E',
				require: '^mobileFrame',
				transclude: true,
				replace: true,
				priority: 200,
				template: [
					'<footer class="mobile-footer">',
					'	<div class="mobile-footer-inner" ng-transclude></div>',
					'</footer>'
				].join(''),
				link: function link($scope, $elem, $attrs, mobileFrameCtrl) {
					if ( $attrs.height !== undefined ) {
						mobileFrameCtrl.footerHeight = parseInt($attrs.height, 10);
					}
					$elem.css('height', mobileFrameCtrl.footerHeight + 'px');
				}
			};
		});

})(angular);