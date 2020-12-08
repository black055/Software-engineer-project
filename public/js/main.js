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
  $("#mytable").DataTable({
    "language": {
      "decimal": "",
      "emptyTable": "Không có dữ liệu",
      "info": "Đang hiển thị _START_ đến _END_ của _TOTAL_ dòng",
      "infoEmpty": "Đang hiển thị 0 đến 0 của 0 dòng",
      "infoFiltered": "(đã lọc từ _MAX_ dòng dữ liệu)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Hiện _MENU_ dòng",
      "loadingRecords": "Loading...",
      "processing": "Processing...",
      "search": "Tìm kiếm:",
      "zeroRecords": "Không tìm thấy kết quả trùng khớp",
      "paginate": {
        "first": "Đầu",
        "last": "Cuối",
        "next": "Sau",
        "previous": "Trước"
      },
      "aria": {
        "sortAscending": ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
      }
    },
  });
});

// Edit Student score
$(".btnEditStudent").click(function () {
  $("#edtName").val($(this).data("name"));
  $("#edtID").val($(this).data("id"));
  $("#edtBirthday").val($(this).data("birthday"));
  $("#rdSex").val($(this).data("sex"));
});

$(".btnDelStudent").click(function () {
  $("#btnCommitDelStudent").val($(this).val());
});

$('.btnEditScore').click(function () {
  $('#edtLP').val($(this).data("lh"));
  $('#edtID').val($(this).data("id"));
  $('#edtHT').val($(this).data("name"));
  $('#edtDGK').val($(this).data("gk"));
  $('#edtDCK').val($(this).data("ck"));
  $('#edtDTK').val($(this).data("tk"));
});

$('#form_edit_score').submit(function () {
  if ($('#edtDGK').val() < 0 || $('#edtDCK').val() < 0 || $('#edtDTK').val() < 0 ||
    $('#edtDGK').val() > 10 || $('#edtDCK').val() > 10 || $('#edtDTK').val() > 10 ||
    $('#edtDGK').val().length == 0 || $('#edtDCK').val().length == 0 || $('#edtDTK').val().length == 0) {
    if ($('#edtDGK').prev().attr('id') != 'alert') {
      $('#edtDGK').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
		 Điểm số có giá trị từ 0 đến 10
		<button type="button" class="close" data-dismiss="alert">&times;</button></div>`)
    }
    return false;
  };

});

$('#select_classes').on('change', function (e) {
  e.preventDefault();
  e.stopPropagation();
  window.location = `/teachers/manage_score/${e.currentTarget.value}`;
});

// List students
$('#select_classes_students').on('change', function (e) {
  e.preventDefault();
  e.stopPropagation();
  window.location = `/teachers/list_students/${e.currentTarget.value}`;
});


// Statistics
$('#statistic').on('change', function (e) {
  e.preventDefault();
  e.stopPropagation();
  window.location = `/teachers/statistic/${e.currentTarget.value}`;
});

$('#admin_statistic').on('change', function (e) {
  e.preventDefault();
  e.stopPropagation();
  window.location = `/admin/statistic/${e.currentTarget.value}`;
})


// Student enroll and unenroll
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
  if ($(".enroll-cb:checked", $("#mytable").dataTable().fnGetNodes()).length) {
    await $(".enroll-cb:checked", $("#mytable").dataTable().fnGetNodes()).each(function () {
      $("#enroll-form").append(`<input type="hidden" name="classes" value="${$(this).data('idclass')}" />`);
    })
    $("#enroll-form").submit();
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: 'Bạn chưa chọn học phần đăng ký',
    })
  }
});

$('.btn-unenroll').click(function () {
  Swal.fire({
    title: 'Bạn có chắc không?',
    text: "Bạn không thể hoàn lại học phần đã hủy!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await $("#unenroll-form").append(`<input type="hidden" name="classEnrolled" value="${$(this).data('idclass')}" />`);
      $("#unenroll-form").submit();
    }
  })
});


// Edit information teachers
let name, gender, bthday, sdt;
$('#updateInfo').hide();
$('#canleEdit').hide();

$('#editInfo').click(function () {
  $(this).prop('disabled', true);
  $('#updateInfo').show();
  $('#canleEdit').show();

  $('#name').prop('readOnly', false);
  $('#bthday').prop('readOnly', false);
  $('#sdt').prop('readOnly', false);
  $('#gender').prop('disabled', false);

  name = $('#name').val();
  gender = $('#gender').val();
  bthday = $('#bthday').val();
  sdt = $('#sdt').val();
});

$('#canleEdit').click(function () {
  $(this).hide();
  $('#updateInfo').hide();
  $('#editInfo').prop('disabled', false);

  $('#name').prop('readOnly', true);
  $('#bthday').prop('readOnly', true);
  $('#sdt').prop('readOnly', true);
  $('#gender').prop('disabled', true);

  $('#name').val(name);
  $('#gender').val(gender);
  $('#bthday').val(bthday);
  $('#sdt').val(sdt);

  $('#name').removeClass('is-invalid');
  $('#sdt').removeClass('is-invalid');
});

$('#name').keyup(function () {
  if (!$(this).val()) {
    $(this).addClass('is-invalid');
    $('#divName').append(`<div class="invalid-feedback">Tên chưa hợp lệ.</div>`);
    $('#updateInfo').prop('disabled', true);
  } else {
    $(this).removeClass('is-invalid');
    $('#updateInfo').prop('disabled', false);
  }
});

$('#sdt').keyup(function () {
  if (!$(this).val()) {
    $(this).addClass('is-invalid');
    $('#divSDT').append(`<div class="invalid-feedback">Số điện thoại không hợp lệ</div>`);
    $('#updateInfo').prop('disabled', true);
  } else {
    $(this).removeClass('is-invalid');
    $('#updateInfo').prop('disabled', false);
  }
});


$('#oldPass').blur(function () {
  if (!$(this).val() || $(this).val().length < 8) {
    if ($('#divOldPass').children().length < 3) {
      $(this).addClass('is-invalid');
      $('#divOldPass').append(`<div class="invalid-feedback">Mật khẩu phải có ít nhất 8 ký tự.</div>`);
    }
  } else {
    $(this).removeClass('is-invalid');
  }
});

$('#newPass').blur(function () {
  if (!$(this).val() || $(this).val().length < 8) {
    if ($('#divNewPass').children().length < 3) {
      $(this).addClass('is-invalid');
      $('#divNewPass').append(`<div class="invalid-feedback">Mật khẩu phải có ít nhất 8 ký tự.</div>`);
    }
  } else {
    $(this).removeClass('is-invalid');
  }
});

$('#newPassAgain').blur(function () {
  if (!$(this).val() || $(this).val().length < 8) {
    if ($('#divNewPassAgain').children().length < 3) {
      $(this).addClass('is-invalid');
      $('#divNewPassAgain').append(`<div class="invalid-feedback">Mật khẩu phải có ít nhất 8 ký tự.</div>`);
    }
  } else {
    $(this).removeClass('is-invalid');
  }
});

$('#form_update_pass').submit(function () {
  if (!$('#oldPass').val() || $('#oldPass').val().length < 8) {
    if ($('#divOldPass').children().length == 3) {
      $('#divOldPass').children().last().remove();
    }

    if ($('#divOldPass').children().length < 3) {
      $('#oldPass').addClass('is-invalid');
      $('#divOldPass').append(`<div class="invalid-feedback">Mật khẩu phải có ít nhất 8 ký tự.</div>`);
    };
    return false;
  }

  if (!$('#newPass').val() || $('#newPass').val().length < 8) {
    if ($('#divNewPass').children().length == 3) {
      $('#divNewPass').children().last().remove();
    }

    if ($('#divNewPass').children().length < 3) {
      $('#newPass').addClass('is-invalid');
      $('#divNewPass').append(`<div class="invalid-feedback">Mật khẩu phải có ít nhất 8 ký tự.</div>`);
    }
    return false;
  }

  if (!$('#newPassAgain').val() || $('#newPassAgain').val().length < 8) {
    if ($('#divNewPassAgain').children().length == 3) {
      $('#divNewPassAgain').children().last().remove();
    }

    if ($('#divNewPassAgain').children().length < 3) {
      $('#newPassAgain').addClass('is-invalid');
      $('#divNewPassAgain').append(`<div class="invalid-feedback">Mật khẩu phải có ít nhất 8 ký tự.</div>`);
    }
    return false;
  }

  if ($('#newPass').val() != $('#newPassAgain').val()) {
    if ($('#divNewPassAgain').children().length == 3) {
      $('#divNewPassAgain').children().last().remove();
    }
    if ($('#divNewPassAgain').children().length < 3) {
      $('#newPassAgain').addClass('is-invalid');
      $('#divNewPassAgain').append(`<div class="invalid-feedback">Không trùng khớp với mật khẩu mới đã nhập.</div>`);
    }
    return false;
  }
});
