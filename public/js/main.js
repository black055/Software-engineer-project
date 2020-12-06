(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);

$('.btnEditScore').click(function() {
	$('#edtLP').val($(this).data("lh"));
	$('#edtID').val($(this).data("id"));
	$('#edtHT').val($(this).data("name"));
	$('#edtDGK').val($(this).data("gk"));
	$('#edtDCK').val($(this).data("ck"));
	$('#edtDTK').val($(this).data("tk"));
});

$('#form_edit_score').submit(function() {
	if ($('#edtDGK').val() < 0 || $('#edtDCK').val() < 0 || $('#edtDTK').val() < 0) {
		if ($('#edtDGK').prev().attr('id') != 'alert') {
			$('#edtDGK').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
		 Điểm không hợp lệ, điểm số phải là số nguyên dương !
		<button type="button" class="close" data-dismiss="alert">&times;</button></div>`)
		}
		return false;
	};
	
});

$('#select_classes').on('change', function(e) {
	e.preventDefault();
	e.stopPropagation();
    window.location = `/teachers/manage_score/${e.currentTarget.value}`;
});

$('#select_classes_students').on('change', function (e) {
	e.preventDefault();
	e.stopPropagation();
	window.location = `/teachers/list_students/${e.currentTarget.value}`;
});

$('#statistic').on('change', function (e) {
	e.preventDefault();
	e.stopPropagation();
	window.location = `/teachers/statistic/${e.currentTarget.value}`;
})