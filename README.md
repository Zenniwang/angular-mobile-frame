# Angular Mobile Frame

Angular Mobile Frame gives you a set of HTML-elements for building a typical mobile webiste — including top- and bottom-bar and an off-canvas-navigation-area.

### [View the Demo](http://herschel666.github.io/angular-mobile-frame/)

## Usage

To use Angular Mobile Frame include angular.js, dist/js/angular-mobile-frame-x.x.x.min.js and dist/css/angular-mobile-frame-x.x.x.css in your site. Then write the following in your JS-script:

	angular
		.module('myApp', ['ek.mobileFrame'])

		.config(['$mobileFrameProvider', function ($mobileFrameProvider) {
			$mobileFrameProvider
				.setHeaderHeight(50)
				.setFooterHeight(30)
				.setNavWidth(200);
		}]);

The `ek.mobileFrame` injects the component. Inside the `config`-method the height for top- and bottom-bar and the width of the off-canvas-navigation-area are set.

When this is done, you can use the Mobile-Frame-element-set inside your HTML:

	<mobile-frame>
		<mobile-header>
			<!-- top-bar-content goes here -->
		</mobile-header>
		<mobile-nav>
			<!-- off-canvas-nav-content goes here -->
		</mobile-nav>
		<mobile-content>
			<!-- main-content goes here -->
		</mobile-content>
		<mobile-footer>
			<!-- bottom-bar-content goes here -->
		</mobile-footer>
	</mobile-frame>

The rendered DOM looks like this …

	<section class="mobile-frame">
		<header class="mobile-header" role="banner">
			<button type="button" class="mobile-nav-toggle" id="mobile-nav-toggle">Toggle</button>
			<div class="mobile-header-inner">
				…
			</div>
		</header>
		<div class="mobile-nav">
			<div class="mobile-nav-inner">
				…
			</div>
		</div>
		<div class="mobile-content" role="main">
			<div class="mobile-content-inner">
				…
			</div>
		</div>
		<footer class="mobile-footer">
			<div class="mobile-footer-inner">
				…
			</div>
		</footer>
	</section>

Angular Mobile Frame takes care of setting the correct height to the top-bar, the bottom-bar and the content-area. Also it sets the width of the off-canvas-navigation-area and toggles it, when the button is tapped.

## Usage with `ng-view`

If you have routing and want angular to take care of displaying the content, just add the `ng-view`-attribute to the `mobile-content`-element. That's it!

## Scrolling inside the content-area.

In the component's CSS I added `-webkit-overflow-scrolling: touch`. That's rather nice but unfortunately it doesn't guarantee a correct scrolling behaviour on some mobile devices. If you want to ensure, that only the content area is scrolling and not the whole site, you have to include a custom solution like [iScroll](http://cubiq.org/iscroll-4).

In the moment I'm not planning to include custom scrolling into this component.

## Meta

Me in teh interwebs:

[@Herschel_R](http://twitter.com/Herschel_R)<br>
[EK-Blog](http://www.emanuel-kluge.de/)

Credits:

Built upon [angular-component-seed](https://github.com/PascalPrecht/angular-component-seed).

## License

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0\. You just DO WHAT THE FUCK YOU WANT TO.
