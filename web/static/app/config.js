window.__DEBUG = true;
window.__URL = "http://" + window.location.host + "/static/";

require.config({
	baseUrl	: __URL,
	paths	: {
		"jquery"			: 	"assets/libs/jquery/jquery.min",
		"underscore"		: 	"assets/libs/underscore/underscore-min",
		"text"				: 	"assets/libs/requirejs-text/text",
		"backbone"			: 	"assets/libs/backbone/backbone-min",
		"backbone_local"	: 	"assets/libs/backbone.localStorage/backbone.localStorage-min",
		"print"				: 	"assets/libs/jquery-plug-in/jquery.print",
		"slider"			: 	"assets/libs/jquery-plug-in/jquery.slider-min",
		"cookie"			: 	"assets/libs/jquery-plug-in/jquery.cookie-min",
		"lazyload"			: 	"assets/libs/jquery-plug-in/jquery.lazyload",

	},
	shim	: {
		"underscore"		: 	{exports: "_"},
		"backbone"			: 	{deps 	: ["underscore", "jquery"], exports: "Backbone"},
		"slider"			: 	{deps	: ["jquery"]},
		"print"				: 	{deps: ["jquery"]},
		"lazyload"			: 	{deps	: ["jquery"]}
	},
	urlArgs					: 	"v=" + (new Date()).getTime()
});

require(["app/app"]);

define(["jquery", "app/config/base"], function($, base) {
	$(function() {
		base.common.refreshStore();
	});

})
