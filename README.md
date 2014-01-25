Angular Mobile Frame
===============

Angular Mobile Frame gives you a set of HTML-elements for building a typical mobile webiste — including top- and bottom-bar and an off-canvas-navigation-area.

### [View the Demo](http://herschel666.github.io/angular-mobile-frame/)

## Usage

To use Angular Mobile Frame include the styles and the script into your page:

	…
	<head>
		<link href="./dist/css/angular-mobile-frame-x.x.x.min.css" rel="stylesheet">
	</head>
	<body>
		…
		<script src=".dist/js/angular-mobile-frame-x.x.x.min.js"></script>
	</body>

After that require `ek.mobileFrame` as a dependency for your app:

	angular.module('myMindblowingApp', ['ek.mobileFrame']});


When this is done, you can use the Mobile-Frame-element-set inside your HTML:

	<mobile-frame>
		<mobile-header height="40">
			<!-- top-bar-content goes here -->
		</mobile-header>
		<mobile-nav width="220">
			<!-- off-canvas-nav-content goes here -->
		</mobile-nav>
		<mobile-content>
			<!-- main-content goes here -->
		</mobile-content>
		<mobile-footer height="40">
			<!-- bottom-bar-content goes here -->
		</mobile-footer>
	</mobile-frame>

The rendered DOM looks like this …

	<section class="mobile-frame">
		<header class="mobile-header" role="banner" style="height: 40px">
			<button type="button" class="mobile-nav__toggle" id="mobile-nav-toggle">Toggle</button>
			<div class="mobile-header__inner">
				…
			</div>
		</header>
		<div class="mobile-nav" style="width: 220px">
			<div class="mobile-nav__inner">
				…
			</div>
		</div>
		<div class="mobile-content" role="main">
			<div class="mobile-content__inner">
				…
			</div>
		</div>
		<footer class="mobile-footer" style="height: 40px">
			<div class="mobile-footer__inner">
				…
			</div>
		</footer>
	</section>

Angular Mobile Frame takes care of setting the correct height to the top-bar, the bottom-bar and the content-area. Also it sets the width of the off-canvas-navigation-area and toggles it, when the button is tapped.

If you don't declare dimensions in the template, Angular Mobile Frame defaults to the following values:

	headerHeight: 48,
	footerHeight: 32,
	navWidth: 240

## Usage with `ng-view`

If you have routing and want angular to take care of displaying the content, just add the `ng-view`-attribute to an element inside the `<mobile-content>`-element. That's it!

## Scrolling inside the content-area.

In the component's CSS I added `-webkit-overflow-scrolling: touch`. That's rather nice but unfortunately it doesn't guarantee a correct scrolling behaviour on some mobile devices. If you want to ensure, that only the content area is scrolling and not the whole site, you have to include a custom solution like [iScroll](http://cubiq.org/iscroll-4).

In the moment I'm not planning to include custom scrolling into this component.

##Changelog

- 0.0.1rc2
	- Updated Angular to v1.2.10
	- Put dimension-declaration into the template; there is no `$mobileFrame`-object anymore!
	- Integrated `requestAnimationFrame` for setting the content-height
	- Switched CSS-classnames to BEM-convention
	- Added code-comments
- 0.0.1rc1
	- The first release

## Meta

Me in teh interwebs:

[@Herschel_R](http://twitter.com/Herschel_R)<br>
[EK-Blog](http://www.emanuel-kluge.de/)

Credits:

Built upon [angular-component-seed](https://github.com/PascalPrecht/angular-component-seed).

## License

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
Version 2, December 2004

Copyright (C) 2014 Emanuel Kluge

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0\. You just DO WHAT THE FUCK YOU WANT TO.
