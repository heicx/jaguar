define(["jquery", "underscore", "backbone", "cookie", "app/views/homePageView", "app/views/searchOptionsPageView", "app/views/carDetailPageView"], function ($, _, Backbone, cookie, HomePageView,
	SearchOptionsPageView, CarDetailPageView) {
	"use strict";

	// add Route
	var WebRouter = Backbone.Router.extend({
		routes: {
			"": "homePage",
			"index": "searchPage",
			"compare": "carsCompare",
			"collection": "carsCollect",
			"shop": "shopPage",
			"group": "groupPage",
			"*path": "defaultRoute"
		},
		initialize: function () {
			this.route(/detail\/(\d+)/, "carDetail");
		},
		homePage: function () {
			this.vHome = new HomePageView;
		},
		searchPage: function () {
			if (!this.vSearchOptions) {
				this.vSearchOptions = new SearchOptionsPageView;
			} else {
				this.vSearchOptions.layout()._init();
			}
		},
		shopPage: function () {
			var that = this;

			if (!this.vSearchOptions)
				this.vSearchOptions = new SearchOptionsPageView;

			if (!this.vCarDetail)
				this.vCarDetail = new CarDetailPageView();

			this.vSearchOptions.searchListView.fetchShopData(function (id) {
				that.vCarDetail.vCloneSearchOptions = that.vSearchOptions;
				that.vCarDetail.trigger("catch", id);
			});
		},
		groupPage: function () {
			var that = this;

			if (!this.vSearchOptions)
				this.vSearchOptions = new SearchOptionsPageView;

			if (!this.vCarDetail)
				this.vCarDetail = new CarDetailPageView();

			this.vSearchOptions.searchListView.fetchGroupData(function (id) {
				that.vCarDetail.vCloneSearchOptions = that.vSearchOptions;
				that.vCarDetail.trigger("catch", id);
			});
		},
		carsCompare: function () {
			var winWidth = $(window).width();

			if (!this.vSearchOptions) {
				this.vSearchOptions = new SearchOptionsPageView;
			}

			$(".detail-list").css({position: "", top: "", left: 0});
			this.vSearchOptions.searchListView.comparePageView.trigger("resize"); // hashchange时重新resize高度，主要防车详页的referrer
			if ($(".car-list-search").css("display") === "none") {
				$("#detailCont").animate({
					left: 1200,
					opacity: 0
				}, {
					duration: 500,
					complete: function () {
						$(this).hide();
						$("#compareCont").stop(true, false).animate({
							left: 430,
							top: 0,
							opacity: 1
						}, {
							start: function () {
								$(this).show();
							}
						});
					}
				});
			} else {
				if (winWidth < 1280) {
					$(".content-title-operate, .content-title-operate .anew").fadeOut();
					$(".car-list-search, .detail-list, .title-sort").fadeOut(function () {
						$("#compareCont").stop(true, false).css({
							left: -1000
						}).animate({
							left: 0,
							top: 0,
							opacity: 1
						}, { // 渐出车详页
							start: function () {
								$(this).fadeIn();
							},
							complete: function () {
								$(".content-title-operate, .content-title-operate #returnIndexBtn").fadeIn();
							}
						});
					});
				} else {
					$(".content-title-operate").fadeOut();
					$(".car-list-search").fadeOut(function () {
						$(".detail-list, .title-sort").stop(true, false).animate({
							"left": 0
						}, {
							start: function () {
								$(".list-return-btn").fadeIn(); // 列表页的返回按钮
								$("#compareCont").animate({
									top: 0,
									opacity: 1
								}, { // 渐出车详页
									duration: 500,
									start: function () {
										$(this).show();
									}
								});

								$(".content-title-operate").stop(true, false).animate({
									left: 400,
									opacity: 1
								}, { // 渐出车详导航部分
									start: function () {
										$(this).find(".anew").hide(); // 重新选择按钮
										$(this).find(".prev-next").show();
										$(this).fadeIn();
									}
								});
							}
						});
					});
				}
			}
		},
		carsCollect: function () {
			var that = this;

			if (!this.vSearchOptions)
				this.vSearchOptions = new SearchOptionsPageView;

			if (!this.vCarDetail)
				this.vCarDetail = new CarDetailPageView();

			this.vSearchOptions.searchListView.fetchCollectionData(function (id) {
				that.vCarDetail.vCloneSearchOptions = that.vSearchOptions;
				that.vCarDetail.trigger("catch", id);
			});
		},
		carDetail: function (id) {
			if (!this.vSearchOptions)
				this.vSearchOptions = new SearchOptionsPageView;

			if (!this.vCarDetail)
				this.vCarDetail = new CarDetailPageView();

			this.vCarDetail.vCloneSearchOptions = this.vSearchOptions; // 克隆vSearchOptions副本，用于车详页的增加对比功能
			this.vCarDetail.trigger("catch", id);
		},
		defaultRoute: function () {
			window.location.href = "/";
		}
	});

	var router = new WebRouter();
	Backbone.history.start();

	Backbone.View.prototype.close = function () {
		this.remove();
		this.unbind();
		if (this.onClose) {
			this.onClose();
		}
	};

	$(function () {
		$(".close, #formConfirmBtn").on("click", function () {
			$("#popupSuccess, .overlay").hide();
		});

		$(".footer-main-series a").on("click", function () {
			if (!$(this).hasClass("off")) {
				cookie.set("series_ids", ($(this).parent().index() + 1));
				window.location.href = "/search/list/#index";
			}
		});

		$(".prev-next a").on("click", function () {
			var index = $(this).index();
			var $switch = $(this).parent();
			var carId = $switch.attr("data-carid");
			var $item = $(".join-car-list .img[data-id='" + carId + "']").parent();

			if (index === 0) {
				if ($item.prev().length === 0) {
					$switch.attr("data-type", "prev");

					if ($switch.attr("data-curpageno") != 1 && $switch.attr("data-curpageno") !== $switch.attr("data-maxpageno")) {
						router.vSearchOptions.searchListView.model.set({
							pageindex: Number($switch.attr("data-curpageno")) - 1
						});

						router.vCarDetail.trigger("catch", $(".prev-next").attr("data-carid"));
					} else {
						window.location.href = "/search/list/#detail/" + carId;
					}
				} else {
					var prevId = $item.prev().find(".img").attr("data-id");
					window.location.href = "/search/list/#detail/" + prevId;
				}
			} else {
				if ($item.next().length === 0) {
					$switch.attr("data-type", "next");

					if ($switch.attr("data-curpageno") !== $switch.attr("data-maxpageno")) {
						router.vSearchOptions.searchListView.model.set({
							pageindex: Number($switch.attr("data-curpageno")) + 1
						});

						router.vCarDetail.trigger("catch", $(".prev-next").attr("data-carid"));
					} else {
						window.location.href = "/search/list/#detail/" + carId;
					}
				} else {
					var nextId = $item.next().find(".img").attr("data-id");
					window.location.href = "/search/list/#detail/" + nextId;
				}
			}
		});

		$(window).on("resize", function () {
			var __ua = navigator.userAgent.toLowerCase();

			if (!__ua.match(/msie ([\d.]+)/)) {
				window.location.reload();
			}
		});
	});

});
