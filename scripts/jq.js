$(document).ready(function(){
	$("#vehicle_btn").click(function(){
		$("#splash_page").addClass("hidden");
		$("#main_page").removeClass("hidden");
		$("#vehicle_map_tab").addClass("active");
		$("#vehicles_map").addClass("active");
	});
	
	$("#employee_btn").click(function() {
		$("#splash_page").addClass("hidden");
		$("#main_page").removeClass("hidden");
		$("#employee_map_tab").addClass("active");
		$("#employees_map").addClass("active");
	});

});