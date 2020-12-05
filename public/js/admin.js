$(document).ready(function(){
	$('#mytable').DataTable();
	$('.btnEditStudent').click(function() {
		$('#edtName').val($(this).data("name"));
		$('#edtID').val($(this).data("id"));
		$('#edtBirthday').val($(this).data("birthday"));
		$('#rdSex').val($(this).data("sex"));
	});

	$('.btnEditTeacher').click(function() {
		$('#edtName').val($(this).data("name"));
		$('#edtID').val($(this).data("id"));
		$('#edtBirthday').val($(this).data("birthday"));
		$('#rdSex').val($(this).data("sex"));
		$('#edtPhone').val($(this).data("phone"));
	});

	$('.btnEditClass').click(function() {
		$('#edtName').val($(this).data("class"));
		$('#edtID').val($(this).data("id"));
		$('#courseID').val($(this).data("courseid"));
		$('#teacherID').val($(this).data("teacherid"));
		$('#day').val($(this).data("day"));
		$('#edtRoom').val($(this).data("room"));
		$('#edtStart').val($(this).data("start"));
		$('#edtEnd').val($(this).data("end"));
		$('#edtFirstDay').val($(this).data("firstday"));
	});

	$('.btnDelStudent').click(function() {
		$('#btnCommitDelStudent').val($(this).val());
	});

	$('.btnDelTeacher').click(function() {
		$('#btnCommitDelTeacher').val($(this).val());
	});

	$('.btnDelClass').click(function() {
		$('#btnCommitDelClass').val($(this).data("id"));
	});

	$('.edtTeacherID').keyup(function() {
		if ($('.edtTeacherID').val().length < 2) {
			$('.edtTeacherID').val('GV');
		} else if ($('.edtTeacherID').val().length > 2) {
			teacherID = $('.edtTeacherID').val();
			teacherID = teacherID.substring(2);
			teacherID = teacherID.replace(/\D/g,'');
			$('.edtTeacherID').val('GV' + teacherID);
		}
	});

	$('.edtClassID').keyup(function() {
		if ($('.edtClassID').val().length < 2) {
			$('.edtClassID').val('LH');
		}
	});
});

function onlyNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
            return false;
        }
    return true;
}

function validateAddForm() {
	if($('#edtAddID').val().length < 4) return false;
	
	// Kiểm tra ngày tháng đã nhập hợp lệ không?
	current = new Date();
	birthday = new Date($('#edtAddBirthday').val());
	
	if (birthday >= current) return false;
	return true;
}

function validateEditForm() {
	// Kiểm tra ngày tháng đã nhập hợp lệ không?
	current = new Date();
	birthday = new Date($('#edtBirthday').val());

	if (birthday >= current) return false;
	return true;
}

function validateAddClassForm() {
	// Tiết bắt đầu lớn hơn tiết kết thúc
	if ($('#edtAddStart').val() > $('#edtAddEnd').val()) {
		return false;
	}

	return true;
}