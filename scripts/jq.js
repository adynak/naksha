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

	$(".filter-btn-select-all").click(function(){
		$(this).parent().siblings().children("input").prop('checked',true);
	});
	
	$(".filter-btn-select-none").click(function(){
		$(this).parent().siblings().children("input").prop('checked', false);
	});
	
	$("#filter-all-btn-select-all").click(function(){
		$(document).find("input").prop('checked', true);
	});
	
	$("#filter-all-btn-clear-all").click(function(){
		$(document).find("input").prop('checked', false);
	});
});