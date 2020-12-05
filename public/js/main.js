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

$(document).ready(function(){
	$('#mytable').DataTable();
	$('.btnEditStudent').click(function() {
		$('#edtName').val($(this).data("name"));
		$('#edtID').val($(this).data("id"));
		$('#edtBirthday').val($(this).data("birthday"));
		$('#rdSex').val($(this).data("sex"));
	});

	$('.btnDelStudent').click(function() {
		$('#btnCommitDelStudent').val($(this).val());
	});


	$('.btnEditScore').click(function() {
		$('#edtLP').val($(this).data("lh"));
		$('#edtID').val($(this).data("id"));
		$('#edtHT').val($(this).data("name"));
		$('#edtDGK').val($(this).data("gk"));
		$('#edtDCK').val($(this).data("ck"));
		$('#edtDTK').val($(this).data("tk"));
	})
});

document.getElementById('select_classes').addEventListener('change', handleChange, true);

function handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    window.location = `/teachers/manage_score/${e.currentTarget.value}`;
}
