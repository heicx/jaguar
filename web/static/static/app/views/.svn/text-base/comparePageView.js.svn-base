define(["jquery", "underscore", "backbone", "app/config/base", "cookie", "text!app/templates/compare-main.html"], function($, _, Backbone, base, cookie, CompareMainTpl) {
	"use strict";

	var CompareModel = Backbone.Model.extend({idAttribute: "_id"});
	var CompareCollection = Backbone.Collection.extend({
		model: CompareModel
	});

	var CompareView = Backbone.View.extend({
		collection: new CompareCollection,
		el: "#compareCont",
		template: _.template(CompareMainTpl),
		events: {
			"click .view-detail"	: 	"viewCarDetail",
			"click .compare-close"	: 	"removeCar"
		},
		initialize: function() {
			this.listenTo(this.collection, "add", this.render);
			this.listenTo(this.collection, "remove", this.render);
			this.on("resize",  this.resetPageHeight);
		},
		render: function() {
			if(!this.collection.highlights)
				this.collection.highlights = {"1":"加热座椅","2":"记忆座椅","3":"ABS","4":"导航","5":"桃木装饰","6":"涡轮增压","7":"多功能方向盘","8":"方向盘换挡拨片","9":"后排侧遮阳帘","10":"后排冰箱","11":"后排座椅加热","12":"底盘升降","13":"驾驶员安全气囊","14":"副驾驶安全气囊","15":"膝部气囊","16":"前排侧气囊","17":"后排侧气囊","18":"前排头部气囊","19":"后排头部气囊","20":"车载电视","21":"蓝牙车载电话","22":"大灯清洗装置","23":"后排独立空调","24":"定速巡航"};
			
			this.$el.html(this.template({compareData: this.collection}));
			if(Backbone.history.fragment.indexOf("compare") > -1)  this.trigger("resize");
			base.common.refreshStore();
		},
		resetPageHeight: function() {
			var searchListH  = $("#searchList").height()  + 50;
			var compareContH = $("#compareCont").height() + 50;
			var $listBox = $(".car-list-box");

			if(searchListH >= compareContH) {
				$listBox.height(searchListH);
			}else {
				$listBox.height(compareContH);
			}
			
			$("html, body").scrollTop(0);
		},
		viewCarDetail: function(evt) {
			var carId = $(evt.currentTarget).attr("data-id");
			if(!isNaN(carId) && carId > 0)  window.location.href = "/search/list/#detail/" + carId;
		},
		removeCar: function(evt) {
			var carId = $(evt.currentTarget).attr("data-id");
			var $checkbox = $(".img[data-id='" + carId + "']").siblings(".txt").find(".checkbox-off");
			var compareIds = cookie.get("compare") || "";

			if(!isNaN(carId) && carId > 0) {
				var reg = new RegExp("\,+" + carId + "|" + carId + "\,+|" + carId, "g");

				cookie.set("compare", compareIds.replace(reg, ""));
				if($checkbox.length > 0)  $checkbox.removeClass().addClass("checkbox-on");
				this.collection.remove(this.collection.get(carId));
			}
		}
	});

	return CompareView;
});