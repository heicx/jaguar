define(["jquery", "underscore", "backbone", "app/config/base", "cookie", "app/models/searchOptionsModel", "text!app/templates/search-options.html", "app/views/searchListPageView", "slider"], function (
	$, _, Backbone, base, cookie, SearchOptionsModel, searchOptionsTpl, SearchListPageView) {
	"use strict";

	// Backbone.emulateJSON = true;
	var SearchOptionsView = Backbone.View.extend({
		el: ".car-list-search",
		model: new SearchOptionsModel,
		template: _.template(searchOptionsTpl),
		events: {
			"click .car-show>ul>li": "chooseCar",
			"change #province": "changeProvince",
			"change #city": "changeCity",
			"click .engine-box li": "chooseEngine",
			"click .color-box .color li": "chooseColor",
			"click .oil-speed li": "chooseMode"
		},
		options: {
			address: base.config.address.searchCars
		},
		layout: function () {
			var that = this;

			return {
				_init: function () {
					if ($(".car-list-search").css("display") === "none") {
						that.trigger("reset");
					}
					that.trigger("slide"); 		// 手动触发页面slider组件事件。
					that.trigger("resize");
				}
			}
		},
		initialize: function () {
			var that = this;

			this.on("resize", this.resetPageHeight);
			this.on("slide", this.resetSliderData);
			this.on("reset", this.resetSearchPage); // 当前页面hashchange出发时进行reset操作。
			this.listenTo(this.model, "change", this.render); // 监听搜索条件的变化。

			if (!this.searchListView) this.searchListView = new SearchListPageView;

			this.layout()._init();
		},
		resetPageHeight: function () {
			var sListHeight = $("#searchList").height() + 50;
			var optionsHeight = $(".car-list-search").height();
			var winWidth = $(window).width();

			if (winWidth < 1280) {
				if (sListHeight > optionsHeight) {
					$(".car-list-box").height(sListHeight);
				} else {
					$(".car-list-box").height(optionsHeight);
				}

			} else {
				$(".car-list-box").height((sListHeight < 640) ? 640 : sListHeight);
			}
		},
		chooseCar: function (evt) {
			var $curTarget = $(evt.currentTarget);
			var _index = $curTarget.index() + 1;

			// 如果车辆可选
			if (!$curTarget.hasClass("off")) {
				var $cur_checkbox = $curTarget.find(".checkbox i");

				if ($cur_checkbox.hasClass("checkbox-off")) {
					$cur_checkbox.removeClass().addClass("checkbox-on");
					this.model.set({
						"cus_series_id": base.common.removeItem(this.model.get("cus_series_id"), _index)
					});
				} else {
					$cur_checkbox.removeClass().addClass("checkbox-off");

					if (!this.model.get("cus_series_id")) {
						this.model.set({
							"cus_series_id": _index
						});
					} else {
						this.model.set({
							"cus_series_id": this.model.get("cus_series_id") + "," + _index
						});
					}
				}
			}
		},
		chooseEngine: function (evt) {
			var $curTarget = $(evt.currentTarget);
			var _index = $curTarget.index() + 1;

			// 如果排气量可选
			if (!$curTarget.hasClass("disabled")) {
				var $cur_checkbox = $curTarget.find("i");

				if ($cur_checkbox.hasClass("checkbox-off")) {
					$cur_checkbox.removeClass().addClass("checkbox-on");
					this.model.set("pql", "");
				} else {
					$cur_checkbox.removeClass().addClass("checkbox-off");
					this.model.set("pql", _index);
				}
			}
		},
		changeProvince: function (evt) {
			var $cur_val = $(evt.currentTarget).find("option:selected").val();

			if ($cur_val === "all") {
				cookie.set("province_py", "");
				cookie.set("city_py", "");
				this.model.set({
					"province_py": "",
					"city_py": ""
				});
			} else {
				cookie.set("province_py", $cur_val);
				cookie.set("city_py", "");
				this.model.set({
					"province_py": $cur_val,
					"city_py": ""
				});
			}
		},
		changeCity: function (evt) {
			var $cur_val = $(evt.currentTarget).find("option:selected").val();

			if ($cur_val === "all") {
				cookie.set("city_py", "");
				this.model.set("city_py", "");
			} else {
				cookie.set("city_py", $cur_val);
				this.model.set("city_py", $cur_val);
			}
		},
		chooseColor: function (evt) {
			var $curTarget = $(evt.currentTarget);

			if (!$curTarget.hasClass("off-b")) {
				if ($curTarget.hasClass("on-b")) {
					$curTarget.removeClass("on-b");
					this.model.set("color", "");
				} else {
					$curTarget.addClass("on-b");
					this.model.set("color", $curTarget.attr("data-index"));
				}
			}
		},
		chooseMode: function (evt) {
			var $curTarget = $(evt.currentTarget);
			var _index = $curTarget.attr("data-id");

			if (!$curTarget.hasClass("disabled")) {
				var $cur_checkbox = $curTarget.find("i");

				if ($cur_checkbox.hasClass("checkbox-off")) {
					$cur_checkbox.removeClass().addClass("checkbox-on");
					this.model.set("bsfs", "");
				} else {
					$cur_checkbox.removeClass().addClass("checkbox-off");
					this.model.set("bsfs", _index);
				}
			}
		},
		resetSliderData: function (resetData) {
			var that = this;

			$("#filter-price").slider({
				from: 0,
				to: 70,
				scale: [0, 10, 20, 30, 40, 50, 60, 70 + '+'],
				limits: false,
				step: 1,
				skin: "round_plastic",
				callback: function (value) {
					var price_arr = value.split(";");
					that.model.set({
						"prclw": price_arr[0],
						"prchg": price_arr[1] === "70" ? "0" : price_arr[1]
					});
				}
			});
			$("#filter-mileage").slider({
				from: 0,
				to: 10,
				scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				limits: false,
				step: 1,
				skin: "round_plastic",
				callback: function (value) {
					var mileage_arr = value.split(";");
					that.model.set({
						"mileage_start": mileage_arr[0],
						"mileage_end": mileage_arr[1] === "10" ? "0" : mileage_arr[1]
					});
				}
			});
			$("#filter-age").slider({
				from: 0,
				to: 5,
				scale: [0, 1, 2, 3, 4, 5],
				limits: false,
				step: 1,
				skin: "round_plastic",
				callback: function (value) {
					var age_arr = value.split(";");
					that.model.set({
						"chelinlw": age_arr[0],
						"chelinhg": age_arr[1] === "5" ? "0" : age_arr[1]
					});
				}
			});

			if (resetData) {
				// slider数据重置
				if (resetData.price) {
					var price_arr = resetData.price.nickName.split("_");
					$("#filter-price").slider("value", price_arr[0], (price_arr[1] === "0" ? "70" : price_arr[1]));
				}
				if (resetData.carage) {
					var carage_arr = resetData.carage.nickName.split("_");
					$("#filter-age").slider("value", carage_arr[0], (carage_arr[1] === "0" ? "5" : carage_arr[1]));
				}
				if (resetData.mileage) {
					var mileage_arr = resetData.mileage.nickName.split("_");
					$("#filter-mileage").slider("value", mileage_arr[0], (mileage_arr[1] === "0" ? "10" : mileage_arr[1]));
				}
			}
		},
		resetSearchPage: function () {
			var that = this;
			var winWidth = $(window).width();

			$(".content-title-operate").hide();
			$("#detailCont, #compareCont").hide().stop(true, false).animate({
				top: 600,
				opacity: 0
			});

			if (winWidth < 1280) {
				$(".detail-list").stop(true, false).animate({
					right: 0
				}, {
					start: function () {
						var $operate = $(".content-title-operate");

						$(".list-return-btn").fadeOut(); // 列表页的返回按钮
						$operate.find(".return-search").hide();
						$operate.find(".anew").show(); // 重新选择按钮
						$operate.find(".prev-next").hide();

						$operate.stop(true, false).animate({
							left: 0,
							opacity: 1
						}, {
							complete: function () {
								$(this).fadeIn(); // 导航栏部分
								$(".car-list-search").fadeIn(); // 搜索列表
							}
						});

						$(".title-sort").stop(true, false).animate({
							left: 590
						}, {
							start: function () {
								$(this).fadeIn();
							}
						});
						$(this).fadeIn(function () {
							that.trigger("resize");
						});
					}
				});
			} else {
				$(".detail-list, .title-sort").animate({
					"left": 880
				}, {
					start: function () {
						var $operate = $(".content-title-operate");

						$(".list-return-btn").fadeOut(); // 列表页的返回按钮
						$operate.find(".anew").show(); // 重新选择按钮
						$operate.find(".prev-next").hide();

						$operate.stop(true, false).animate({
							left: 0,
							opacity: 1
						}, {
							complete: function () {
								$(this).fadeIn(); // 导航栏部分
								$(".car-list-search").fadeIn(); // 搜索列表
							}
						});
					}
				});
			}
		},
		render: function () {
			var that = this;

			that.options.data = that.model.attributes;
			$.when(base.common.fetch(that.options))
				.done(function (doneData) {
					// 设置模板页面所需的pathUrl。
					doneData._url = window.__URL;
					// 模板页面中省级数据当前选项不为all时，填充市级数据。
					if ($("#province").find("option:selected").val() !== "all") doneData._targetEvt = "change";

					// 重新渲染搜索条件部分。
					that.$el.html(that.template({
						doneData: doneData
					}));

					// 重置slider，数据透传。
					that.trigger("slide", doneData.selected);

					// 清除脏数据，更新searchListPageView的数据模型。
					that.searchListView.model.set(that.dataClean(doneData.param), {silent: true});
					that.searchListView.handleData(doneData);
					that.trigger("resize");
				})
				.fail(function (failData) {
					throw new Error("Fetch data Error - SearchOptionsPageView with render.");
				});
		},
		dataClean: function (dirtyData) {
			var _filterParams = ["prclw", "prchg", "mileage_start", "mileage_end", "chelinlw", "chelinhg", "color", "bsfs", "extra_pql", "cus_series_id", "province_py", "city_py", "sort", "pageindex"];
			var cleanData = _.pick(dirtyData, _filterParams);

			cleanData["pql"] = cleanData.extra_pql || "";
			delete cleanData["extra_pql"];
			cleanData = _.extend(this.model.attributes, cleanData);

			return cleanData;
		}
	});

	$(function () {
		$(".anew").on("click", function () {
			window.location.reload();
		});
	});

	return SearchOptionsView;
});
