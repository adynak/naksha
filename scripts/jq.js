$(document).ready(function(){
	$("#vehicle_btn").click(function(){
		$("#splash_page").addClass("hidden");
		$("#main_page").removeClass("hidden");
		$("#vehicle_map_tab").addClass("active");
		$("#vehicles_map").addClass("active");
	});
	
	$("#vehicle_btn").on("tap",function(){
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
	
	$("#employee_btn").on("tap", function() {
		$("#splash_page").addClass("hidden");
		$("#main_page").removeClass("hidden");
		$("#employee_map_tab").addClass("active");
		$("#employees_map").addClass("active");
	});

	$(".filter-btn-select-all").click(function(){
		//$(this).parent().siblings().children("input").attr('checked', true);
	});
	
	$(".filter-btn-clear-all").click(function(){
		//$(this).parent().siblings().children("input").attr('checked', false);
	});
	
	$("#filter-all-btn-select-all").click(function(){
		//$(document).find("input").attr('checked', true);
	});
	
	$("#filter-all-btn-clear-all").click(function(){
		//$(document).find("input").attr('checked', false);
	});
});