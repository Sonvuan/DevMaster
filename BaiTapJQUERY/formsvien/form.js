let cart = [
    {id:1, studentId:"SV001", studentName:"Nguyễn Văn A", age:20, sex:"nam", birthDate:"2002-04-23", birthPlace:"HN", address:"25, Vũ Ngọc Phan"},
    {id:2, studentId:"SV002", studentName:"Nguyễn Văn B", age:21, sex:"nữ", birthDate:"2002-04-23", birthPlace:"Hải Dương", address:"20, Vũ Ngọc Phan"},
    {id:3, studentId:"SV003", studentName:"Nguyễn Văn C", age:22, sex:"nam", birthDate:"2002-04-23", birthPlace:"HN", address:"19, Vũ Ngọc Phan"},
    {id:4, studentId:"SV004", studentName:"Nguyễn Văn D", age:23, sex:"nữ", birthDate:"2002-04-23", birthPlace:"Hưng Yên", address:"10, Vũ Ngọc Phan"},
];

function renderCart() {
    let cartContainer = $("#cart-items");
    cartContainer.empty();

    let tableHtml = `
        <h2>Danh Dách Sinh Viên</h2>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Mã Sinh Viên</th>
                    <th>Họ Tên</th>
                    <th>Tuổi</th>
                    <th>Giới Tính</th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach((item, index) => {
        tableHtml += `
            <tr>
                <td>${item.id}</td>
                <td>${item.studentId}</td>
                <td>${item.studentName}</td>
                <td>${item.age}</td>
                <td>${item.sex}</td>
                <td>
                    <button class="btn btn-primary btn-view" data-index="${index}">Xem</button>
                    <button class="btn btn-warning btn-edit" data-index="${index}">Sửa</button>
                    <button class="btn btn-danger btn-delete" data-index="${index}">Xóa</button>
                </td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table>`;
    cartContainer.append(tableHtml);
}

// Khi trang tải xong thì hiển thị danh sách sinh viên
$(document).ready(function () {
    renderCart();

    // Xem và sửa thông tin sinh viên
    $(document).on("click", ".btn-view, .btn-edit", function () {
        let index = $(this).data("index");
        let student = cart[index];

        $("#studentIndex").val(index);
        $("#masv").val(student.studentId);
        $("#namesv").val(student.studentName);
        $("#agesv").val(student.age);
        $("#gioitinhsv").val(student.sex);
        $("#datesv").val(student.birthDate);
        $("#bornsv").val(student.birthPlace);
        $("#placesv").val(student.address);

        if ($(this).hasClass("btn-edit")) {
            $("#saveBtn").text("Cập Nhật");
        } else {
            $("#saveBtn").text("Lưu Thông Tin");
        }
    });

    // Cập nhật hoặc thêm sinh viên
    $("#saveBtn").click(function () {
        let index = $("#studentIndex").val();

        let studentData = {
            id: index !== "" ? cart[index].id : cart.length + 1, // Giữ nguyên ID nếu sửa
            studentId: $("#masv").val(),
            studentName: $("#namesv").val(),
            age: $("#agesv").val(),
            sex: $("#gioitinhsv").val(),
            birthDate: $("#datesv").val(),
            birthPlace: $("#bornsv").val(),
            address: $("#placesv").val()
        };

        if (index !== "") {
            // Cập nhật sinh viên trong mảng
            cart[index] = studentData;
        } else {
            // Thêm mới sinh viên
            cart.push(studentData);
        }

        renderCart();
        $("#student-form")[0].reset();
        $("#saveBtn").text("Lưu Thông Tin");
        $("#studentIndex").val("");
    });

    // Xóa sinh viên
    $(document).on("click", ".btn-delete", function () {
        let index = $(this).data("index");
        cart.splice(index, 1);
        renderCart();
    });
});
