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

	$('.btnDelStudent').click(function() {
		$('#btnCommitDelStudent').val($(this).val());
	});

	$('.btnDelTeacher').click(function() {
		$('#btnCommitDelTeacher').val($(this).val());
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