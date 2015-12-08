define(["jquery", "underscore", "backbone", "app/config/base", "cookie", "text!app/templates/home-car-search.html"], function($, _, Backbone, base, cookie, carSearchTpl) {
	"use strict";

	var HomePageView = Backbone.View.extend({
		el: ".car-show-search",
		template: _.template(carSearchTpl),
		events: {
			"click .car-show>ul>li": "chooseCar",
			"change #province": "changeProvince",
			"change #city": "changeCity",
			"click #searchBtn": "searchCars",
			"mouseover .car-show>ul>li": "switchBanner",
			"mouseout .car-show>ul>li": "defaultBanner"
		},
		options: {
			address: base.config.address.findCarsNumber,
			url: ""
		},
		splitSign: function() {
			return this.options.url === "" ? "?" : "&";
		},
		chooseCar: function(evt) {
			var $curTarget = $(evt.currentTarget);
			
			// 获取当前选中的车ids
			if(!$curTarget.hasClass("off")) {
				var $cur_checkbox = $curTarget.find(".checkbox i");

				if($cur_checkbox.hasClass("checkbox-off")) {
					$cur_checkbox.removeClass().addClass("checkbox-on");
				}else {
					$cur_checkbox.removeClass().addClass("checkbox-off");
				}

				this.handleData();
			}else return;
		},
		findChoosenCars: function() {
			var i = 0, cars_id = "", cars_checked = $(".car-show .checkbox-off");

			for(; i<cars_checked.length; i++) {
				cars_id += cars_checked.eq(i).data("val") + ",";
			}

			if(cars_id) this.options.url += this.splitSign() + "cus_series_id=" + cars_id.substring(0, cars_id.length - 1);
		},
		changeProvince: function(evt) {
			var province_val = $("#province").find("option:selected").val();

			if(province_val !== "all") this.options.url += this.splitSign() + "province_py=" + province_val;
			if(evt) this.handleData("change");
		},
		changeCity: function(evt) {
			var province_val = $("#city").siblings("select").find("option:selected").val();
			var city_val = $("#city").find("option:selected").val();

			if(evt) {
				this.options.url += this.splitSign() + "province_py=" + province_val + "&city_py=" + city_val;
				this.handleData("change");
			}else {
				if(city_val !== "all") this.options.url += this.splitSign() + "city_py=" + city_val;
			}
		},
		switchBanner: function(evt) {
			var $curTarget = $(evt.currentTarget);

			$(".banner li").removeClass("active");
			$(".banner li").eq($curTarget.index()+1).css({opacity: 0.5}).stop(true, false).animate({opacity: 1}, {
				duration: 500,
				start: function() {
					$(this).addClass("active");
				}
			});
		},
		defaultBanner: function() {
			$(".banner li").removeClass("active");
			$(".banner li").eq(0).css({opacity: 0.5}).stop(true, false).animate({opacity: 1}, {
				duration: 500,
				start: function() {
					$(this).addClass("active");
				}
			});
		},
		handleData: function(type) {
			var that = this;

			if(!type) {
				that.changeProvince();
				that.changeCity();
			}

			that.findChoosenCars();

			$.when(base.common.fetch(that.options))
			.done(function(doneData) {
				doneData._url = window.__URL;
				if($("#province").find("option:selected").val() !== "all") doneData._targetEvt = "change";
				$(".car-show-search").html(that.template({doneData: doneData}));

				that.options.url = "";
			})
			.fail(function(failData) {
				throw new Error("Fetch data of cars number is failure on home page.");
			});
		},
		searchCars: function() {
			var province_py = $("#province-py").val() || "";
			var city_py = $("#city-py").val() || "";
			var series_ids = $("#series-ids").val() || "";

			cookie.set("province_py", province_py);
			cookie.set("city_py", city_py);
			cookie.set("series_ids", series_ids);

			$("#homeForm").submit();
		}
	});

	return HomePageView;
});