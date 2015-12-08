define(["jquery", "underscore", "cookie"], function($, _, cookie) {
	"use strict";

	$(".overlay").height($(document).height());
	var config = {
		host: "http://" + window.location.host,
		options: {
			async		: 	false,
			dataType	: 	"json",
			type 		: 	"GET",
			cache		: 	false
		},
		address: {
			findCarsNumber		: 	"/",
			searchCars			: 	"/search/list/",
			carDetail			: 	"/usedcar/000000.html",
			contact				: 	"/clue/contact",
			appointment			: 	"/clue/appointment",
			compare 			: 	"/user/compare",
			collection 			: 	"/user/collect",
			shop				: 	"/shop/view",
			group				: 	"/shop/group"
		}
	}
	var common = {
		fetch: function(options) {
			var that = this;
			var options = $.extend(false, config.options, options);

			var $promise = $.ajax({
				cache: options.cache,
				type: options.type,
				async: options.async,
				url: config.host + options.address + ( (options.url === undefined || options.url === "" || options.type === "POST") ? "?is_ajax=1" : options.url + "&is_ajax=1"),
				dataType: options.dataType,
				data: options.data
			});

			if(window.__DEBUG) {
				$promise.done(function(data) {
					that.log(data);
				})
				.fail(function(data) {
					that.log(data);
				});
			}

			return $promise;
		},
		removeItem: function(str, item) {
			if(typeof str === "string" && str !== "") {
				var _index = str.indexOf(item);
				var res = "";

				if(_index === 0) {
					res = str.substring(2, str.length);
				}else if(_index > -1) {
					res = str.replace("," + item, "");
					return res;
				}

				return res;
			}else {
				return "";
			}
		},
		refreshStore: function() {
			var compareStr  = cookie.get("compare") || "";
			var collectStr  = cookie.get("collect") || "";
			var $compareEle = $(".head-fr a").eq(0);
			var $collectEle = $(".head-fr a").eq(1);

			if(compareStr.length === 0) {
				$compareEle.html("我的对比(0)");
			}else {
				$compareEle.html("我的对比(" + compareStr.split(",").length + ")");
			}

			if(collectStr.length === 0) {
				$collectEle.html("我的收藏(0)");
			}else {
				$collectEle.html("我的收藏(" + collectStr.split(",").length + ")");
			}
		},
		tips: function(text, time) {
			var time = time || 2500;

			$(".overlay").height($(document).height());
			$("#popupText span").html(text);
			$(".overlay, #popupText").fadeIn();

			var timer = setTimeout(function() {
				$(".overlay, #popupText").fadeOut();
			}, time);
		},
		moveToCart: function(startEle, endEle) {
			if(startEle && endEle) {
				var imgCopy = startEle.clone().css('opacity','0.7');

				imgCopy.css({
					'z-index'	: 	10,
					'display'	: 	'block',
					'position'	: 	'absolute',
					'top'		: 	startEle.offset().top +'px',
					'left'		: 	startEle.offset().left +'px',
					'width'		: 	startEle.width() +'px',
					'height'	: 	startEle.height() +'px'
				});
				$('body').append(imgCopy);

				imgCopy.stop(true, false).animate({
					top		: 	endEle.offset().top,
					left	: 	endEle.offset().left,
					width	: 	10,
					height	: 	10
				},{
					duration : 800,
					complete: function() {
						$(this).remove();
					}
				});

				this.refreshStore();
			}
		},
		log: function(msg) {
			// console.log(msg);
		}
	}

	return {
		common: common,
		config: config,
		log: common.log
	}
});
