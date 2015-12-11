define(["jquery", "underscore", "backbone", "app/config/base", "cookie", "app/models/searchOptionsModel", "app/views/carsSortPageView", "app/views/comparePageView",
	"text!app/templates/search-list.html", "print"
], function ($, _, Backbone, base, cookie, SearchOptionsModel, CarsSortPageView, ComparePageView, SearchListTpl) {
	"use strict";

	var SearchListView = Backbone.View.extend({
		el: ".detail-list",
		model: new SearchOptionsModel,
		template: _.template(SearchListTpl),
		options: {
			address: base.config.address.searchCars
		},
		events: {
			"click .page a": "switchListPage",
			"click .join-car-list li": "joinCarDetail",
			"click .list-return-btn": "returnSearchPage",
			"click .comparison, .collect": "addRecord",
			"click #listCompareBtn": "compareCars",
			"click .print": "printListPage"
		},
		initialize: function () {
			this.compareIds = cookie.get("compare") || "";

			this.on("resize", this.resetPageHeight);
			this.listenTo(this.model, "change", this.render);
			this.carsSortPageView = new CarsSortPageView({
				model: this.model
			});

			if (!this.comparePageView) {
				this.comparePageView = new ComparePageView();
			}

			if (this.compareIds !== "")
				this.fetchCompareData(this.compareIds);
		},
		resetPageHeight: function () {
			var sListHeight = $("#searchList").height() + 50;
			var optionsHeight = $(".car-list-search").height();
			var detailHeight = $("#detailCont").height() || 0;
			var winWidth = $(window).width();

			if (winWidth < 1280) {
				if (sListHeight > optionsHeight) {
					$(".car-list-box").height(sListHeight);
				} else {
					$(".car-list-box").height(optionsHeight);
				}
			} else {
				if (Backbone.history.fragment !== "index") {
					$(".car-list-box").height((sListHeight > detailHeight) ? sListHeight : detailHeight);
				} else {
					$(".car-list-box").height((sListHeight < 640) ? 640 : sListHeight);
				}
			}
		},
		printListPage: function() {
			$(".detail-list").printThis({
		          debug: false,
				  importStyle: false,
		          importCSS: true,
				  printDelay: 200,
				  removeInline: true,
				  printContainer: true,
				  loadCSS: "/static/assets/css/print.css"
		    });
		},
		switchListPage: function (evt) {
			var curText = $(evt.currentTarget).text();
			var pageNo = Number($(".page").eq(0).find(".active").html());

			if (curText === "<") {
				pageNo -= 1;
			} else if (curText === ">") {
				pageNo += 1;
			} else {
				pageNo = curText;
			}

			this.model.set("pageindex", pageNo);
		},
		joinCarDetail: function (evt) {
			var carId = $(evt.currentTarget).find(".img").attr("data-id");
			if (!isNaN(carId) && carId > 0) window.location.href = "/search/list/#detail/" + carId;
		},
		returnSearchPage: function () {
			window.location.href = "/search/list/#index";
		},
		compareCars: function () {
			window.location.href = "/search/list/#compare";
		},
		addRecord: function (evt) {
			var that = this;
			var $curTarget = $(evt.currentTarget);
			var $info = $curTarget.parent();
			var $container = $curTarget.parent().parent().siblings(".img");
			var carId = $container.attr("data-id");
			var cancle = true;
			var startEle = $container.find("img");
			var index = $curTarget.hasClass("comparison") ? 0 : 1;
			var endEle = $(".head-fr a").eq(index);
			var baseModel = {};

			evt.stopPropagation();

			if (index === 0) {
				var compareIds = cookie.get("compare") || "";

				baseModel["_id"] = $container.attr("data-id");
				baseModel["img"] = startEle.attr("src");
				baseModel["title"] = $info.siblings(".title-price").find("h4").html();
				baseModel["price"] = $info.siblings(".title-price").find(".price").html();
				baseModel["time"] = $info.siblings(".year").attr("data-year") + "年";
				baseModel["km"] = $info.siblings(".year").attr("data-km");
				baseModel["color"] = $container.attr("data-color");
				baseModel["bsfs"] = $container.attr("data-bsfs");
				baseModel["area"] = $container.attr("data-city");
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

						$("#compareBtn[data-carid='" + carId + "']").find(".checkbox-on").removeClass().addClass("checkbox-off");
						that.comparePageView.collection.add(baseModel);
					}
				} else {
					if (compareIds) {
						var reg = new RegExp("\,+" + carId + "|" + carId + "\,+|" + carId, "g");
						cookie.set("compare", compareIds.replace(reg, ""));
					}

					cancle = false;
					$curTarget.find("i").removeClass().addClass("checkbox-on");
					$("#compareBtn[data-carid='" + carId + "']").find(".checkbox-off").removeClass().addClass("checkbox-on");
					that.comparePageView.collection.remove(that.comparePageView.collection.get(baseModel["_id"]));
				}
			} else if (index === 1) {
				var collectIds = cookie.get("collect") || "";

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
						$("#collectionBtn[data-carid='" + carId + "']").removeClass("glb-btn-white").addClass("glb-btn-red");
					}
				} else {
					if (collectIds) {
						var reg = new RegExp("\,+" + carId + "|" + carId + "\,+|" + carId, "g");
						cookie.set("collect", collectIds.replace(reg, ""));
					}
					cancle = false;
					$curTarget.removeClass("glb-btn-red").addClass("glb-btn-white");
					$("#collectionBtn[data-carid='" + carId + "']").removeClass("glb-btn-red").addClass("glb-btn-white");
				}

				base.common.refreshStore();
			}

			if (cancle) base.common.moveToCart(startEle, endEle);
		},
		fetchCompareData: function (ids) {
			var that = this;
			var options = {};
			options["address"] = base.config.address.compare;
			options["data"] = {
				"ids": ids
			};

			$.when(base.common.fetch(options))
				.done(function (models) {
					if (models) that.comparePageView.collection.add(models);
				})
				.fail(function () {
					throw new Error("fetchCompareData Error.");
				});
		},
		fetchCollectionData: function (callback) {
			var that = this;
			var collectionIds = cookie.get("collect") || "";
			var options = {};
			options["address"] = base.config.address.collection;
			options["data"] = {
				"ids": collectionIds
			};

			if (collectionIds !== "") {
				$.when(base.common.fetch(options))
					.done(function (listData) {
						if (Backbone.history.fragment.indexOf("index") < 0) listData.curPage = "detail";

						listData["compareIds"] = cookie.get("compare") || "";
						listData["collectionIds"] = cookie.get("collect") || "";

						that.$el.html(that.template({
							listData: listData
						}));

						that.comparePageView.trigger("resize");
						callback(collectionIds.split(",")[0]);
					})
					.fail(function () {
						throw new Error("fetchCollectionData Error - SearchListView");
					});
			}
		},
		fetchShopData: function (callback) {
			var that = this;
			var shopid = $(".focus-operation h2").attr("data-shopid");
			var options = {};
			options["address"] = base.config.address.shop;
			options["data"] = {
				"id": shopid
			};

			if (shopid !== "") {
				$.when(base.common.fetch(options))
					.done(function (listData) {
						if (Backbone.history.fragment.indexOf("index") < 0) listData.curPage = "detail";

						listData["compareIds"] = cookie.get("compare") || "";
						listData["collectionIds"] = cookie.get("collect") || "";

						that.$el.html(that.template({
							listData: listData
						}));

						that.model.clear({
							silent: true
						});

						that.model.set({
							shop_id: shopid,
							sort: 1,
							pageindex: 1
						}, {
							silent: true
						});

						that.comparePageView.trigger("resize");

						// 触发进入车详页
						callback(listData.lists[0] ? listData.lists[0].carid : "");
					})
					.fail(function () {
						throw new Error("fetchCollectionData Error - SearchListView");
					});
			}
		},
		fetchGroupData: function (callback) {
			var that = this;
			var groupid = $(".focus-operation h2").attr("data-groupid");
			var options = {};
			options["address"] = base.config.address.group;
			options["data"] = {
				"id": groupid
			};

			if (groupid !== "") {
				$.when(base.common.fetch(options))
					.done(function (listData) {
						if (Backbone.history.fragment.indexOf("index") < 0) listData.curPage = "detail";

						listData["compareIds"] = cookie.get("compare") || "";
						listData["collectionIds"] = cookie.get("collect") || "";

						that.$el.html(that.template({
							listData: listData
						}));

						that.model.clear({
							silent: true
						});

						that.model.set({
							group_id: groupid,
							sort: 1,
							pageindex: 1
						}, {
							silent: true
						});

						that.comparePageView.trigger("resize");
						callback(listData.lists[0] ? listData.lists[0].carid : "");
					})
					.fail(function () {
						throw new Error("fetchCollectionData Error - SearchListView");
					});
			}
		},
		handleData: function (data) {
			// type 表示上下车辆按钮切换时的按钮点击事件状态
			var type = $(".prev-next").attr("data-type") === "prev" ? true : false;

			if (Backbone.history.fragment.indexOf("index") < 0) data.curPage = "detail";

			data["compareIds"] = cookie.get("compare") || "";
			data["collectionIds"] = cookie.get("collect") || "";

			this.$el.html(this.template({
				listData: data
			}));
			this.trigger("resize");

			$(".prev-next").attr({"data-curpageno": data.page.pagenow, "data-maxpageno": data.page.totalpage, "data-carid": data.lists.length !== 0 ? data.lists[(type ? data.lists.length-1 : 0)].carid : ''});
			$(".prev-next a").show();

			if (Backbone.history.fragment.indexOf("compare") > -1) this.comparePageView.trigger("resize");
		},
		render: function () {
			var that = this;

			that.options.data = that.model.attributes;

			$.when(base.common.fetch(that.options))
				.done(function (doneData) {
					that.handleData(doneData);
				})
				.fail(function () {
					throw new Error("render Page Error - SearchListView");
				});
		}
	});

	return SearchListView;
});
