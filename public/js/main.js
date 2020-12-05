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

//document.getElementById('select_classes').addEventListener('change', handleChangeManageScore, true);
//document.getElementById('select_classes_students').addEventListener('change', handleChangeListStudent);

$('#select_classes').on('change', function(e) {
	e.preventDefault();
	e.stopPropagation();
    window.location = `/teachers/manage_score/${e.currentTarget.value}`;
})

$('#select_classes_students').on('change', function (e) {
	e.preventDefault();
	e.stopPropagation();
	window.location = `/teachers/list_students/${e.currentTarget.value}`;
})
