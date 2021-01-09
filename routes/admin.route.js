const express = require('express');
const studentsModule = require('../models/students.module');
const teachersModule = require('../models/teachers.module');
const classesModule = require('../models/classes.module');
const coursesModule = require('../models/courses.module');
const router = express.Router();

router.get('/', async (req, res) => {
    const data = await classesModule.getAll();
    const courses = await coursesModule.getAll();
    const teachers = await teachersModule.getAll();
    res.render('admin/classesManage', {
        listClasses: data,
        listCourses: courses,
        listTeachers: teachers,
    });
})

router.get('/studentsManage', async (req, res) => {
    const data = await studentsModule.getAll();
    const message = req.flash('message');
    if (typeof message === 'undefined')
        res.render('admin/studentsManage', {
            listStudents: data,
        });
    else res.render('admin/studentsManage', {
        listStudents: data,
        message: message
    });
})

router.post('/studentsManage/add', async (req, res) => {
    result = await studentsModule.addStudent(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Thêm học sinh thành công!',
            text: 'Đã thêm học sinh vào cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Thêm học sinh thất bại...',
            text: 'Mã số học sinh đã được sử dụng!'
        });
    }
    res.redirect('/admin/studentsManage');
})

router.post('/studentsManage/edit', async (req, res) => {
    result = await studentsModule.editStudent(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Cập nhật thông tin học sinh thành công!',
            text: 'Đã cập nhật thông tin học sinh vào cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Cập nhật thông tin học sinh thất bại...',
            text: 'Không tồn tại học sinh có mã số học sinh tương ứng!'
        });
    }
    res.redirect('/admin/studentsManage');
})

router.post('/studentsManage/delete', async (req, res) => {
    result = await studentsModule.delStudent(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Xóa học sinh thành công!',
            text: 'Đã xóa học sinh ra khỏi cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Xóa học sinh thất bại...',
            text: 'Không tồn tại học sinh có mã số học sinh tương ứng!'
        });
    }
    res.redirect('/admin/studentsManage');
})

router.get('/teachersManage', async (req, res) => {
    const data = await teachersModule.getAll();
    const message = req.flash('message');
    if (typeof message === 'undefined')
        res.render('admin/teachersManage', {
            listTeachers: data,
        });
    else res.render('admin/teachersManage', {
        listTeachers: data,
        message: message
    });
    
})

router.post('/teachersManage/add', async (req, res) => {
    result = await teachersModule.addTeacher(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Thêm giáo viên thành công!',
            text: 'Đã thêm giáo viên vào cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Thêm giáo viên thất bại...',
            text: 'Đã tồn tại giáo viên có mã số tương ứng!'
        });
    }
    res.redirect('/admin/teachersManage');
})

router.post('/teachersManage/edit', async (req, res) => {
    result = await teachersModule.editTeacher(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Cập nhật thông tin giáo viên thành công!',
            text: 'Đã cập nhật thông tin giáo viên vào cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Cập nhật thông tin giáo viên thất bại...',
            text: 'Không tồn tại giáo viên có mã số tương ứng!'
        });
    }
    res.redirect('/admin/teachersManage');
})

router.post('/teachersManage/delete', async (req, res) => {
    result = await teachersModule.delTeacher(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Xóa giáo viên thành công!',
            text: 'Đã xóa thông tin giáo viên ra khỏi cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Xóa giáo viên thất bại...',
            text: 'Không tồn tại giáo viên có mã số tương ứng!'
        });
    }
    res.redirect('/admin/teachersManage');
})

router.get('/classesManage', async (req, res) => {
    const data = await classesModule.getAll();
    const courses = await coursesModule.getAll();
    const teachers = await teachersModule.getAll();
    const message = req.flash('message');
    if (typeof message === 'undefined')
    res.render('admin/classesManage', {
        listClasses: data,
        listCourses: courses,
        listTeachers: teachers,
    });
    else res.render('admin/classesManage', {
        listClasses: data,
        listCourses: courses,
        listTeachers: teachers,
        message: message
    });
})

router.post('/classesManage/add', async (req, res) => {
    result = await classesModule.addClass(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Thêm lớp học thành công!',
            text: 'Đã thêm lớp học vào cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Thêm lớp học thất bại...',
            text: 'Đã tồn tại lớp học có mã lớp tương ứng!'
        });
    }
    res.redirect('/admin/classesManage');
})

router.post('/classesManage/edit', async (req, res) => {
    result = await classesModule.editClass(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Cập nhật thông tin lớp học thành công!',
            text: 'Đã cập nhật thông tin lớp học vào cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Cập nhật thông tin lớp học thất bại...',
            text: 'Không tồn tại lớp học có mã lớp tương ứng!'
        });
    }
    res.redirect('/admin/classesManage');
})

router.post('/classesManage/delete', async (req, res) => {
    result = await classesModule.deleteClass(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Xóa lớp học thành công!',
            text: 'Đã xóa thông tin lớp học ra khỏi cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Xóa lớp học thất bại...',
            text: 'Không tồn tại lớp học có mã lớp tương ứng!'
        });
    }
    res.redirect('/admin/classesManage');
})

router.get('/coursesManage', async (req, res) => {
    const courses = await coursesModule.getAll();
    const message = req.flash('message');
    if (typeof message === 'undefined')
        res.render('admin/coursesManage', {
            listCourses: courses,
        });
    else res.render('admin/coursesManage', {
        listCourses: courses,
        message: message
    });
    
})

router.post('/coursesManage/add', async (req, res) => {
    result = await coursesModule.addCourse(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Thêm học phần thành công!',
            text: 'Đã thêm học phần vào cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Thêm học phần thất bại...',
            text: 'Đã tồn tại học phần có mã học phần tương ứng!'
        });
    }
    res.redirect('/admin/coursesManage');
})

router.post('/coursesManage/delete', async (req, res) => {
    result = await coursesModule.deleteCourse(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Xóa học phần thành công!',
            text: 'Đã xóa thông tin học phần ra khỏi cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Xóa học phần thất bại...',
            text: 'Còn lớp học đang dạy học phần này hoặc không tồn tại học phần có mã học phần tương ứng!'
        });
    }
    res.redirect('/admin/coursesManage');
})

router.post('/coursesManage/edit', async (req, res) => {
    result = await coursesModule.editCourse(req.body);
    if (result == true) {
        req.flash('message', {
            icon: 'success',
            title: 'Cập nhật thông tin học phần thành công!',
            text: 'Đã cập nhật thông tin học phần vào cơ sở dữ liệu!'
        });
    } else {
        req.flash( 'message', {
            icon: 'error',
            title: 'Cập nhật thông tin học phần thất bại...',
            text: 'Không tồn tại học phần có mã học phần tương ứng!'
        });
    }
    res.redirect('/admin/coursesManage');
})

router.get('/statistic/student', async (req, res) => {
    const studentFailed = await studentsModule.adminGetStudentsFailed();
    const studentSuccess = await studentsModule.adminGetStudentsSuccess();
    const studentPro = await studentsModule.adminGetStudentsPro();

    res.render('admin/statistic', {
        failed: studentFailed.length,
        success: studentSuccess.length - studentPro.length,
        pro: studentPro.length,
    });
})

router.get('/statistic/student/gender', async (req, res) => {
    const male = await studentsModule.getMale();
    const female = await studentsModule.getFemale();
    console.log(male.length, female.length);
    res.render('admin/statistic_std_gender', {
        _male: male.length,
        _female: female.length,
    });
})

router.get('/statistic/teacher', async (req, res) => {
    const teacherMale = await teachersModule.adminGetteachersMale();
    const teacherFemale = await teachersModule.adminGetteachersFemale();
    const percentMale = (teacherMale.length / (teacherFemale.length + teacherMale.length)) * 100;
    const percentFemale = 100 - percentMale;
    res.render('admin/teacher_statistic', {
        _male: percentMale,
        _female: percentFemale,
    });
})

router.get('/statistic/class/pass', async (req, res) => {
    const classList = await classesModule.getAll();
    res.render('admin/class_statistic', {
        classList: classList
    });
})

router.get('/statistic/class/pass/:id', async (req, res) => {
    const itemSelected = req.params.id;
    const classList = await classesModule.getAll();
    const studentFailed = await studentsModule.getStudentsFailedByClass(itemSelected);
    const studentPassed = await studentsModule.getStudentsPassedByClass(itemSelected);
    if (studentPassed.length == 0 && studentFailed.length == 0) {
        res.render('admin/class_statistic', {
            classList: classList,
            itemSelected: itemSelected,
            emptyClass: 'true'
        });
    } else {
        res.render('admin/class_statistic', {
            classList: classList,
            itemSelected: itemSelected,
            passed: studentPassed.length,
            failed: studentFailed.length
        });
    }
})

router.get('/statistic/class/byDay/:id', async (req, res) => {
    /* 
    const classList = await classesModule.getClassesByDay(selectedDay);
    console.log(classList);
    console.log(selectedDay);
    res.render('admin/class_by_day', {
        classList: classList,
    });*/
    const selectedDay = req.params.id;
    const classList = await classesModule.getClassesByDay(selectedDay);
    console.log(classList);
    res.render('admin/class_by_day', {
        classList: classList,
        selectedDay: selectedDay
    });
})

module.exports = router;