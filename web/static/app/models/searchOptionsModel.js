define(["underscore", "backbone", "cookie"], function (_, Backbone, cookie) {
	"use strict";

	var SearchOptionsModel = Backbone.Model.extend({
		defaults: function () {
			return {
				prclw: "0",
				prchg: "0",
				mileage_start: "0",
				mileage_end: "0",
				chelinlw: "0",
				chelinhg: "0",
				color: "",
				shop_id: "",
				group_id: "",
				bsfs: "",
				pql: "",
				cus_series_id: cookie.get("series_ids") ? cookie.get("series_ids") : "",
				province_py: cookie.get("province_py") ? cookie.get("province_py") : "",
				city_py: cookie.get("city_py") ? cookie.get("city_py") : "",
				sort: "",
				pageindex: 1
			}
		}
	});

	return SearchOptionsModel;
});
