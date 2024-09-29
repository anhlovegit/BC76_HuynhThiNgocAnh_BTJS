let arrNhanVien = [];

// Bắt sự kiện click trên nút btnThemNV
document.getElementById("btnThemNV").onclick = function () {
    let nhanVien = getValueForm(); // Hàm này lấy dữ liệu từ form
    if (!nhanVien) {
        return; // Nếu không có dữ liệu hoặc dữ liệu không hợp lệ
    }

    arrNhanVien.push(nhanVien); // Thêm nhân viên mới vào mảng
    setLocalStorage("arrNhanVien", arrNhanVien); // Lưu mảng vào localStorage
    renderDataNhanVien(); // Hiển thị dữ liệu ra bảng
    document.getElementById("formQLNV").reset(); // Xóa nội dung form sau khi thêm
};

// Hàm lấy dữ liệu từ form
function getValueForm() {
    let tknv = document.getElementById("tknv").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let datepicker = document.getElementById("datepicker").value;
    let luongCB = document.getElementById("luongCB").value;
    let chucvu = document.getElementById("chucvu").value;
    let gioLam = document.getElementById("gioLam").value;

    // Kiểm tra dữ liệu đầu vào (nếu cần)
    if (!tknv || !name || !email || !datepicker || !luongCB || !chucvu || !gioLam) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return null;
    }

    // Trả về đối tượng nhân viên
    return {
        tknv,
        name,
        email,
        datepicker,
        luongCB,
        chucvu,
        gioLam
    };
}

// Hàm render dữ liệu ra bảng
function renderDataNhanVien(arr = arrNhanVien) {
    let content = "";
    for (let nhanVien of arr) {
        let { tknv, name, email, datepicker, luongCB, chucvu, gioLam } = nhanVien;
        content += `
        <tr>
            <td>${tknv}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${datepicker}</td>
            <td>${luongCB}</td>
            <td>${chucvu}</td>
            <td>${gioLam}</td>
        </tr>
        `;
    }
    document.getElementById("tableDanhSach").innerHTML = content;
}

// Lưu dữ liệu vào LocalStorage
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu từ LocalStorage
function getLocalStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Khi tải lại trang, lấy dữ liệu từ LocalStorage và render
window.onload = function () {
    let dataLocal = getLocalStorage("arrNhanVien");
    if (dataLocal) {
        arrNhanVien = dataLocal;
        renderDataNhanVien();
    }
};


// Hàm lấy thông tin nhân viên để sửa
function getInfoNhanVien(tknv) {
    let nhanVien = arrNhanVien.find(item => item.tknv === tknv);
    if (nhanVien) {
        let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
        for (let field of arrField) {
            field.value = nhanVien[field.id]; // Gán giá trị lên form
            if (field.id === "tknv") {
                field.readOnly = true; // Không cho sửa mã nhân viên
            }
        }
    }
}
