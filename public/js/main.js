(function ($) {
  "use strict";

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });
})(jQuery);

$(document).ready(function () {
  $("#mytable").DataTable();
  $(".btnEditStudent").click(function () {
    $("#edtName").val($(this).data("name"));
    $("#edtID").val($(this).data("id"));
    $("#edtBirthday").val($(this).data("birthday"));
    $("#rdSex").val($(this).data("sex"));
  });

  $(".btnDelStudent").click(function () {
    $("#btnCommitDelStudent").val($(this).val());
  });

  $(".btnEditScore").click(function () {
    $("#edtLP").val($(this).data("lh"));
    $("#edtID").val($(this).data("id"));
    $("#edtHT").val($(this).data("name"));
    $("#edtDGK").val($(this).data("gk"));
    $("#edtDCK").val($(this).data("ck"));
    $("#edtDTK").val($(this).data("tk"));
  });
});

//document.getElementById('select_classes').addEventListener('change', handleChangeManageScore, true);
//document.getElementById('select_classes_students').addEventListener('change', handleChangeListStudent);

$("#select_classes").on("change", function (e) {
  e.preventDefault();
  e.stopPropagation();
  window.location = `/teachers/manage_score/${e.currentTarget.value}`;
});

$("#select_classes_students").on("change", function (e) {
  e.preventDefault();
  e.stopPropagation();
  window.location = `/teachers/list_students/${e.currentTarget.value}`;
});

$(".enroll-cb").click(function () {
  let $box = $(this);
  let myTable = $("#mytable").dataTable();
  if ($box.is(":checked")) {
    let group = ".enroll-cb[name='" + $box.attr("name") + "']";
    $(group, myTable.fnGetNodes()).prop("checked", false);
    $box.prop("checked", true);
    $(group, myTable.fnGetNodes()).hide();
    $box.show();
  } else {
    $box.prop("checked", false);
    let group = ".enroll-cb[name='" + $box.attr("name") + "']";
    $(group, myTable.fnGetNodes()).show();
  }
});

$("#btn-enroll").click(async function () {
	await $(".enroll-cb:checked", $("#mytable").dataTable().fnGetNodes()).each(function() {
		$("#enroll-form").append(`<input type="hidden" name="classes" value="${$(this).data('idclass')}" />`);
	})
  $("#enroll-form").submit();
});

$('.btn-unenroll').click(async function () {
  await $("#unenroll-form").append(`<input type="hidden" name="classEnrolled" value="${$(this).data('idclass')}" />`);
  $("#unenroll-form").submit();
});