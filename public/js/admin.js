$(document).ready(function(){
	$('#mytable').DataTable();
});

function onlyNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
            return false;
        }
    return true;
}

$('#teacher-add-form').submit(function() {
	if($('#edtAddID').val().length != 8) {
		if ($('#id-birthday-add-error').prev().attr('id') != 'alert') {
			$('#id-birthday-add-error').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Mã giáo viên phải bao gồm 8 kí tự và bắt đầu bằng GV!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false;
	} 
	// Kiểm tra ngày tháng đã nhập hợp lệ không?
	current = new Date();
	birthday = new Date($('#edtAddBirthday').val());
	
	if (birthday >= current) {
		if ($('#id-birthday-add-error').prev().attr('id') != 'alert') {
			$('#id-birthday-add-error').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Ngày sinh không hợp lệ!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false
	};
	return true;
});

$('#teacher-edit-form').submit(function() {
	// Kiểm tra ngày tháng đã nhập hợp lệ không?
	current = new Date();
	birthday = new Date($('#edtBirthday').val());
	
	if (birthday >= current) {
		if ($('#id-birthday-edit-error').prev().attr('id') != 'alert') {
			$('#id-birthday-edit-error').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Ngày sinh không hợp lệ!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false
	};
	return true;
});

$('#student-add-form').submit(function() {
	if($('#edtAddID').val().length != 8) {
		if ($('#id-birthday-add-error').prev().attr('id') != 'alert') {
			$('#id-birthday-add-error').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Mã số sinh viên phải bao gồm 8 chữ số!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false;
	} 
	// Kiểm tra ngày tháng đã nhập hợp lệ không?
	current = new Date();
	birthday = new Date($('#edtAddBirthday').val());
	
	if (birthday >= current) {
		if ($('#id-birthday-add-error').prev().attr('id') != 'alert') {
			$('#id-birthday-add-error').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Ngày sinh không hợp lệ!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false
	};
	return true;
});

$('#student-edit-form').submit(function() {
	// Kiểm tra ngày tháng đã nhập hợp lệ không?
	current = new Date();
	birthday = new Date($('#edtBirthday').val());
	
	if (birthday >= current) {
		if ($('#id-birthday-edit-error').prev().attr('id') != 'alert') {
			$('#id-birthday-edit-error').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Ngày sinh không hợp lệ!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false
	};
	return true;
});

$('#class-add-form').submit(function () {
	// Kiểm tra mã lớp học có hợp lệ không?
	if ($('#edtAddID').val().length != 8) {
		if ($('#info-add-class-group').prev().attr('id') != 'alert') {
			$('#info-add-class-group').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Mã môn học phải gồm 8 kí tự và bắt đầu bằng LH!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false;
	}
	// Kiểm tra mã phòng học có hợp lệ không?
	if ($('#edtAddRoom').val().length != 4 || $('#edtAddRoom').val()[0] < "A" || $('#edtAddRoom').val()[0] > "Z" ) {
		if ($('#room-add-error').prev().attr('id') != 'alert') {
			$('#room-add-error').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Phòng học phải gồm 4 kí tự và bắt đầu bằng chữ cái hoa!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false;
	}
	// Tiết bắt đầu lớn hơn tiết kết thúc
	if ($('#edtAddStart').val() > $('#edtAddEnd').val()) {
		if ($('#duration-add-group').prev().attr('id') != 'alert') {
			$('#duration-add-group').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Tiết bắt đầu phải bé hơn tiết kết thúc!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false;
	}

	return true;
});

$('#class-edit-form').submit(function() {
	// Kiểm tra mã lớp học có hợp lệ không?
	if ($('#edtID').val().length != 8) {
		if ($('#info-class-group').prev().attr('id') != 'alert') {
			$('#info-class-group').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Mã môn học phải gồm 8 kí tự và bắt đầu bằng LH!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false;
	}
	// Kiểm tra mã phòng học có hợp lệ không?
	if ($('#edtRoom').val().length != 4 || $('#edtRoom').val()[0] < "A" || $('#edtRoom').val()[0] > "Z" ) {
		if ($('#room-edit-error').prev().attr('id') != 'alert') {
			$('#room-edit-error').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Phòng học phải gồm 4 kí tự và bắt đầu bằng chữ cái hoa!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false;
	}
	// Tiết bắt đầu lớn hơn tiết kết thúc
	if ($('#edtStart').val() > $('#edtEnd').val()) {
		if ($('#duration-group').prev().attr('id') != 'alert') {
			$('#duration-group').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Tiết bắt đầu phải bé hơn tiết kết thúc!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false;
	}

	return true;
});

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

$('.btnEditCourse').click(function() {
	$('#edtID').val($(this).data("courseid"));
	$('#edtName').val($(this).data("coursename"));
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

$('.btnDelCourse').click(function() {
	$('#btnCommitDelCourse').val($(this).data("id"));
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

$('#course-add-form').submit(function() {
	if ($('#edtAddID').val().length != 8.) {
		if ($('#edtAddID').prev().attr('id') != 'alert') {
			$('#edtAddID').before(`<div class="alert alert-danger alert-dismissible fade show" id="alert">
			   Mã học phần phải bao gồm 8 kí tự!
			  <button type="button" class="close" data-dismiss="alert">&times;</button></div>`);
		}
		return false;
	}
	return true;
});