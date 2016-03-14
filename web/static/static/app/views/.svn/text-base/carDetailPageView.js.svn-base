define(["jquery", "underscore", "backbone", "app/config/base", "cookie", "text!app/templates/car-detail.html"], function ($, _, Backbone, base, cookie, CarDetailTpl) {

	var carDetailView = Backbone.View.extend({
		el: "#detailCont",
		template: _.template(CarDetailTpl),
		options: {
			address: base.config.address.carDetail,
			type: "GET"
		},
		store: {},
		events: {
			"click .detail-same-car .glb-btn": "viewSameCarSource",
			"mouseenter #wechat": "shareToWechat",
			"mouseleave #wechat": "shareToWechat",
			"click #weibo": "shareToWeibo",
			"click #contactInfoBtn": "contactDealer",
			"click #prevImg": "prevImg",
			"click #nextImg": "nextImg",
			"click #prevFeature": "prevFeature",
			"click #nextFeature": "nextFeature",
			"click .list-img li": "chooseImg",
			"click #reserveBtn": "reserveCars",
			"click #detialTabs li": "switchTabs",
			"click #compareBtn": "compareCars",
			"click #collectionBtn": "collectCars",
			"mouseenter .carousel": "displayCarouselImgs",
			"mouseleave .carousel": "displayCarouselImgs"
		},
		initialize: function () {
			try {
				if (!this.map) this.map = BMap;
			} catch (e) {}

			this.on('catch', this.fetch, this);
			this.on("change", this.displayDetail, this);
			this.on("switch", this.switchCar, this);
		},
		fetch: function (id) {
			var that = this;

			that.options.address = that.options.address.replace(/\d+/g, id);
			$.when(base.common.fetch(that.options))
				.done(function (doneData) {
					doneData["compareIds"] = cookie.get("compare") || "";
					doneData["collectionIds"] = cookie.get("collect") || "";

					that.$el.html(that.template({
						doneData: doneData
					}));

					$(".prev-next").attr("data-carid", doneData.car_detail.car.id);

					if ($("#detailCont").css("display") !== "none" || $("#compareCont").css("display") !== "none") {
						that.trigger("switch");
					} else {
						that.trigger("change");
					}

					if ($("#detailDealer").length > 0 && that.map) that.loadMap();
					$(".car-list-box").height($("#detailCont").height());
					that.restWeibo();
				})
				.fail(function (data) {
					throw new Error("Error getting the cars data - carDetailView with fetch.");
				});
		},
		loadMap: function () {
			var coord_long = $("#detailDealer .map").attr("data-lon");
			var coord_lat = $("#detailDealer .map").attr("data-lat");
			var staticMap, point, marker = null;

			staticMap = new this.map.Map("static_map");
			point = new this.map.Point(coord_long, coord_lat);
			marker = new this.map.Marker(point);
			staticMap.centerAndZoom(point, 16);

			staticMap.addEventListener("tilesloaded", function () {
				staticMap.panTo(point);
				staticMap.addOverlay(marker);
				marker.setAnimation(BMAP_ANIMATION_BOUNCE);
			});
		},
		displayDetail: function () {
			var that = this;
			var winWidth = $(window).width();

			$(".content-title-operate, .content-title-operate .anew").fadeOut();
			if (winWidth < 1280) {
				$(".car-list-search, .detail-list, .title-sort").fadeOut(function () {
					$("#detailCont").stop(true, false).css({
						left: -1000
					}).animate({
						left: 0,
						top: 0,
						opacity: 1
					}, { // 渐出车详页
						start: function () {
							$(this).fadeIn(function() {
                                that.pageScroll();
                            });
						},
						complete: function () {
							$(".content-title-operate, .content-title-operate #returnIndexBtn, .prev-next").fadeIn();
						}
					});
				});
			} else {
				$(".car-list-search").fadeOut(function () {
					$(".detail-list, .title-sort").stop(true, false).animate({
						left: 0
					}, {
						start: function () {
							$(".list-return-btn").fadeIn(); // 列表页的返回按钮
							$("#detailCont").stop(true, false).css({
								left: 430
							}).animate({
								top: 0,
								opacity: 1
							}, { // 渐出车详页
								duration: 700,
								start: function () {
									$(this).fadeIn(function () {
										that.pageScroll();
									});
								}
							});

							// 渐出车详导航部分
							$(".content-title-operate").stop(true, false).animate({
								left: 400,
								opacity: 1
							}, {
								// 重新选择按钮，上下一辆车
								start: function () {
									that.checkPrevAndNextCars();
									$(this).find(".anew").hide();
									$(this).fadeIn();
								}
							});
						}
					});
				});
			}
		},
		checkPrevAndNextCars: function () {
			var $switch = $(".prev-next");
			var $item = $(".join-car-list .img[data-id='" + $switch.attr("data-carid") + "']").parent();

			$switch.find("a").show();

			if ($item.prev().length === 0 && $switch.attr("data-curpageno") === "1")
				$switch.find("a").eq(0).hide();

			if ($item.next().length === 0 && $switch.attr("data-curpageno") === $switch.attr("data-maxpageno"))
				$switch.find("a").eq(1).hide();

			$switch.show();
		},
		switchCar: function () {
			var that = this;

			$("#detailCont").hide().css({
				left: 1200,
				top: 0
			}).animate({
				left: 430,
				opacity: 1
			}, {
				duration: 500,
				start: function () {
					that.checkPrevAndNextCars();

					$("#compareCont").animate({
						top: 1200,
						opacity: 0
					}, {
						complete: function () {
							$(this).hide();
						}
					});
					$(this).show();

                    if($(window).width() >= 1280) {
                        $(".detail-list").css({"position": "absolute", "top": 0, "left": 0});
                    }
				},
				complete: function () {
					$("html, body").animate({scrollTop: 0});
				}
			});
		},
		viewSameCarSource: function (evt) {
			this.trigger("catch", $(evt.currentTarget).attr("data-id"));
		},
		shareToWechat: function (evt) {
			var $qr = $("#QRCode"),
				carId = "";

			if (evt.type !== "mouseenter") {
				$qr.hide();
			} else {
				carId = $(".focus-operation h2").attr("data-carid");
				$qr.find("img").attr("src", "/usedcar/qrcode?url=" + "http://m.jgused.jlrdealer.cn/usedcar/" + carId + ".html").parent().show();
			}
		},
		contactDealer: function () {
			var options = {};
			var $car = $(".detail-focus h2");
			var contactName = $("#contactName").val();
			var contactSex = $("input[name='contactSex']:checked").val();
			var contactPhone = $("#contactPhone").val();
			var contactRemark = $("#contactRemark").val();
			var formData = {
				"FormClue[wish_carid]": $car.attr("data-carid"),
				"FormClue[shopid]": $car.attr("data-shopid"),
				"FormClue[area_pid]": $car.attr("data-pid"),
				"FormClue[area_cid]": $car.attr("data-cid")
			};

			if (!contactName) {
				base.common.tips("请输入您的姓名");
				return false;
			} else if (!contactPhone) {
				base.common.tips("请输入您的手机号码");
				return false;
			}

			formData["FormClue[contact_sex]"] = contactSex;
			formData["FormClue[contact_name]"] = contactName;
			formData["FormClue[contact_phone]"] = contactPhone;
			formData["FormClue[remarks]"] = contactRemark;

			options["address"] = base.config.address.contact;
			options["type"] = "POST";
			options["data"] = formData;

			$.when(base.common.fetch(options))
				.done(function (doneData) {
					if (doneData.status === 1) {
						$("#popupSuccess h2").html("提交结果");

						$(".overlay").height($(document).height()).show();
						$("#popupSuccess").show();

						$("#contactName, #contactPhone, #contactRemark").val("");
					} else {
						base.common.tips("您输入的信息有误");
						return false;
					}
				})
				.fail(function (data) {
					throw new Error("Error in contactDealer.");
				});
		},
		prevFeature: function () {
			var that = this;
			var $li = $(".bright-box li");
			var total = $li.length;
			var curVal = $(".bright-box ul").css("margin-left");

			if (curVal === "0px") {
				curVal = -(total - 2) * 367;
			} else {
				curVal = Number(curVal.replace("px", "")) + 367;
			}

			$li.parent().stop(true, false).animate({
				"marginLeft": curVal + "px"
			}, 50);
		},
		nextFeature: function () {
			var $li = $(".bright-box li");
			var total = $li.length - 2;
			var curVal = $(".bright-box ul").css("margin-left").replace("px", "");
			var maxVal = total * 367;

			if (Math.abs(curVal) == maxVal) {
				curVal = 0;
			} else {
				curVal = Number(curVal) - 367;
			}

			$li.parent().animate({
				"marginLeft": curVal + "px"
			}, 50);
		},
		nextImg: function () {
			var $li = $(".list-img li");
			var total = $li.length;
			var index = $(".list-img .active").index() + 1;

			$li.removeClass("active");
			$li.eq(index).addClass("active");

			if (index >= 3) {
				if (index < total) {
					var marginVal = (index - 3) * 93;
					$li.parent().animate({
						"marginLeft": -marginVal + "px"
					});
				} else {
					$li.eq(0).addClass("active");
					$li.parent().animate({
						"marginLeft": 0
					});
				}
			}

			$(".carousel-img img").attr("src", $(".list-img li.active img").attr("src"));
		},
		prevImg: function () {
			var $li = $(".list-img li");
			var total = $li.length;
			var index = $(".list-img .active").index();
			var marginVal;

			$li.removeClass("active");
			if (index === 0) {
				marginVal = (total - 4) * 93;

				$li.eq(total - 1).addClass("active");
				$li.parent().animate({
					"marginLeft": -marginVal + "px"
				});
			} else if (index >= 3) {
				marginVal = (index - 3) * 93;

				$li.eq(index - 1).addClass("active");
				$li.parent().animate({
					"marginLeft": -marginVal + "px"
				});
			} else {
				$li.eq(index - 1).addClass("active");
			}

			$(".carousel-img img").attr("src", $(".list-img li.active img").attr("src"));
		},
		chooseImg: function (evt) {
			var $curTarget = $(evt.currentTarget);

			$curTarget.addClass("active").siblings().removeClass("active");
			$(".carousel-img img").attr("src", $(".list-img li.active").find("img").attr("src"));
		},
		reserveCars: function () {
			$("html, body").animate({
				"scrollTop": $("#detailDealer").offset().top
			}, 500);
		},
		restWeibo: function () {
			try {
				window._bd_share_main.init();
			} catch (e) {}
		},
		switchTabs: function (evt) {
			var that = this,
				timer = null;
			var $curTarget = $(evt.currentTarget);
			var $anchor = $("." + $curTarget.attr("data-anchor"));
			var topVal = $(".detail-info").offset().top;

			$(window).off("scroll");
			$("html, body").stop(true, false).animate({
				"scrollTop": $anchor.offset().top - 50
			}, {
				duration: 300,
				complete: function () {
					if ($(window).scrollTop() >= topVal) {
						$(".detail-tabs").addClass("detail-tabs-fixed");
					}

                    that.pageScroll();
				}
			});

			timer = setTimeout(function () {
				$curTarget.addClass("active").siblings().removeClass("active");
				clearTimeout(timer);
			}, 200);
		},
		pageScroll: function () {
			var oTopInfo = $(".detail-info").offset().top;
			var oTopParam = $(".detail-param").offset().top;
			var oTopConfig = $(".detail-config").offset().top;
			var oTopCommit = $(".commitment").offset().top;
			var oTopBright = !$(".detail-bright").offset() ? oTopCommit : $(".detail-bright").offset().top;
			var oTopSame = $(".detail-same-car").offset().top;
			var oTopDealer = $(".detail-dealer").offset().top;
			var isBright = oTopCommit === oTopBright ? false : true;
			var listFixedHeight = $(".detail-list").height() - $(window).height();
			var listLeftVal = $("#listSort").offset().left;

			$(window).scroll(function () {
				var scrollVal = $(this).scrollTop() + 130;
				var $tabs_li = $(".detail-tabs li"),
					i = 0;

				if (scrollVal >= oTopInfo) {
					if (!$("#detialTabs").hasClass("detail-tabs-fixed")) $("#detialTabs").addClass("detail-tabs-fixed");

					$(".detail-tabs li").removeClass("active");

					if (scrollVal >= oTopInfo && scrollVal < oTopParam) i = 0;
					else if (scrollVal >= oTopParam && scrollVal < oTopConfig) i = 1;
					else if (scrollVal >= oTopConfig && scrollVal < oTopBright) i = 2;
					else if (scrollVal >= oTopBright && scrollVal < oTopCommit) i = 3;
					else if (scrollVal >= oTopCommit && scrollVal < oTopSame) i = isBright ? 4 : 3;
					else if (scrollVal >= oTopSame && scrollVal < oTopDealer) i = isBright ? 5 : 4;
					else if (scrollVal >= oTopDealer) i = isBright ? 6 : 5;

					$tabs_li.eq(i).addClass("active");
				} else {
					$("#detialTabs").removeClass("detail-tabs-fixed");
				}

				if(Backbone.history.fragment.indexOf("detail") > -1 && listFixedHeight > 0) {
                    if($(window).width() >= 1280) {
                        if(scrollVal > listFixedHeight) {
                            $(".detail-list").css({"position": "fixed", "top": -listFixedHeight, "left": listLeftVal});
                        }else {
                            $(".detail-list").css({"position": "absolute", "top": 0, "left": 0});
                        }
                    }
				}else if(!(Backbone.history.fragment.indexOf("shop") > -1 || Backbone.history.fragment.indexOf("group") > -1)){
                    $(window).off("scroll");
                }
			});
		},
		compareCars: function (evt) {
			this.collection = this.vCloneSearchOptions.searchListView.comparePageView.collection;

			var that = this;
			var $curTarget = $(evt.currentTarget);
			var $info = $curTarget.parent().parent();
			var carId = $("#detailCont .focus-operation h2").attr("data-carid");
			var cancle = true;
			var startEle = $("#detailCont .carousel-img img");
			var $checkbox = $(".img[data-id='" + carId + "']").siblings(".txt")
			var endEle = $(".head-fr a").eq(0);
			var baseModel = {};

			var compareIds = cookie.get("compare") || "";

			baseModel["_id"] = carId;
			baseModel["img"] = startEle.attr("src");
			baseModel["title"] = $.trim($("#detailCont h2").text());
			baseModel["price"] = $.trim($("#detailCont .focus-operation .num").text());
			baseModel["time"] = $info.siblings(".km").attr("data-year") + "年";
			baseModel["km"] = $info.siblings(".km").attr("data-km");
			baseModel["color"] = $curTarget.attr("data-color");
			baseModel["bsfs"] = $curTarget.attr("data-bsfs");
			baseModel["area"] = $curTarget.attr("data-city");
			baseModel["features"] = $curTarget.attr("data-features");

			if ($curTarget.find("i").hasClass("checkbox-on")) {
				if (compareIds.split(",").length >= 4) {
					base.common.tips("目前最多只能添加4辆车");
					return false;
				} else {
					$curTarget.find("i").removeClass().addClass("checkbox-off");

					if (!compareIds) {
						cookie.set("compare", carId);
					} else {
						cookie.set("compare", compareIds + "," + carId);
					}

					$checkbox.find(".checkbox-on").removeClass().addClass("checkbox-off");
					that.collection.add(baseModel);
				}
			} else {
				if (compareIds) {
					var reg = new RegExp("\,+" + carId + "|" + carId + "\,+|" + carId, "g");
					cookie.set("compare", compareIds.replace(reg, ""));
				}

				cancle = false;
				$curTarget.find("i").removeClass().addClass("checkbox-on");
				$checkbox.find(".checkbox-off").removeClass().addClass("checkbox-on");
				that.collection.remove(that.collection.get(baseModel["_id"]));
			}

			if (cancle) base.common.moveToCart(startEle, endEle);
		},
		collectCars: function (evt) {
			var $curTarget = $(evt.currentTarget);
			var collectIds = cookie.get("collect") || "";
			var startEle = $("#detailCont .carousel-img img");
			var endEle = $(".head-fr a").eq(1);
			var carId = $curTarget.attr("data-carid");
			var $checkbox = $(".img[data-id='" + carId + "']").siblings(".txt");
			var cancle = true;

			if ($curTarget.hasClass("glb-btn-white")) {
				if (collectIds.split(",").length >= 8) {
					base.common.tips("目前最多只能收藏8辆车");
					return false;
				} else {
					if (!collectIds) {
						cookie.set("collect", carId);
					} else {
						cookie.set("collect", collectIds + "," + carId);
					}

					$curTarget.removeClass("glb-btn-white").addClass("glb-btn-red");
					$checkbox.find(".collect").removeClass("glb-btn-white").addClass("glb-btn-red");
				}
			} else {
				if (collectIds) {
					var reg = new RegExp("\,+" + carId + "|" + carId + "\,+|" + carId, "g");
					cookie.set("collect", collectIds.replace(reg, ""));
				}

				cancle = false;
				$curTarget.removeClass("glb-btn-red").addClass("glb-btn-white");
				$checkbox.find(".collect").removeClass("glb-btn-red").addClass("glb-btn-white");

				base.common.refreshStore();
			}

			if (cancle) base.common.moveToCart(startEle, endEle);
		},
		displayCarouselImgs: function (evt) {
			if (evt.type !== "mouseenter") {
				$(".carousel-list").stop(true, false).fadeOut();
			} else {
				$(".carousel-list").stop(true, false).fadeIn();
			}

            evt.stopPropagation();
		}
	});

	$(function () {
		window._bd_share_config = {
			common: {
				bdText: "",
				bdDesc: "",
				bdUrl: "",
				bdPic: "",
				onBeforeClick: function (cmd, config) {
					if (cmd === "tsina") {
						var _content = "给大家推荐一辆很不错的车，【" + $.trim($(".focus-operation h2").html()) + "】，只要" + $.trim($(".focus-operation .num").text()) + "，快来看看吧！";

						config.bdText = _content;
						config.bdDesc = _content;
						config.bdPic = $(".carousel-img img").attr("src");
						config.bdUrl = window.location.href;
					}
					return config;
				}
			},
			share: [{
				"bdSize": 16
			}]
		}
		with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement("script")).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
	})

	return carDetailView;
});
