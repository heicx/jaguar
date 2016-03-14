define(["jquery", "underscore", "backbone"], function ($, _, Backbone) {
	"use strict";

	var sortView = Backbone.View.extend({
		el: "#listSort",
		events: {
			"click li": "sort"
		},
		sort: function (evt) {
			var $curTarget = $(evt.currentTarget);

			$curTarget.addClass("active").siblings().removeClass("active");
			this.model.set({
				sort: $curTarget.find("a").attr("data-sort")
			});
		}
	});

	return sortView;
});
