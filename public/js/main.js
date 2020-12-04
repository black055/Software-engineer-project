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
});