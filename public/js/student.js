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
    Swal.fire({
      title: 'Đồng ý đăng ký?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đăng ký',
      cancelButtonText: 'Hủy'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await $(".enroll-cb:checked", $("#mytable").dataTable().fnGetNodes()).each(function () {
          $("#enroll-form").append(`<input type="hidden" name="classes" value="${$(this).data('idclass')}" />`);
        })
        $("#enroll-form").submit();
      }
    })
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
    confirmButtonText: 'Xóa!',
    cancelButtonText: 'Hủy'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await $("#unenroll-form").append(`<input type="hidden" name="classEnrolled" value="${$(this).data('idclass')}" />`);
      $("#unenroll-form").submit();
    }
  })
});
