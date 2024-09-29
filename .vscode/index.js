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
  let tknv = document.getElementById("tknv").value.trim();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let datepicker = document.getElementById("datepicker").value.trim();
  let luongCB = document.getElementById("luongCB").value.trim();
  let chucvu = document.getElementById("chucvu").value;
  let gioLam = document.getElementById("gioLam").value.trim();

  // Kiểm tra dữ liệu đầu vào
  if (
    !tknv ||
    !name ||
    !email ||
    !datepicker ||
    !luongCB ||
    !chucvu ||
    !gioLam
  ) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return null;
  }

  // Kiểm tra định dạng email
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(email)) {
    alert("Email không hợp lệ!");
    return null;
  }

  // Kiểm tra lương cơ bản và giờ làm
  if (luongCB < 1000000 || luongCB > 20000000) {
    alert("Lương cơ bản phải từ 1,000,000 đến 20,000,000.");
    return null;
  }

  if (gioLam < 80 || gioLam > 200) {
    alert("Số giờ làm phải từ 80 đến 200 giờ.");
    return null;
  }

  // Tính tổng lương dựa trên chức vụ
  let tongLuong = 0;
  if (chucvu === "Sếp") {
    tongLuong = luongCB * 3;
  } else if (chucvu === "Trưởng phòng") {
    tongLuong = luongCB * 2;
  } else if (chucvu === "Nhân viên") {
    tongLuong = luongCB;
  }

  // Trả về đối tượng nhân viên kèm tổng lương
  return {
    tknv,
    name,
    email,
    datepicker,
    luongCB,
    chucvu,
    gioLam,
    tongLuong,
  };
}

// Hàm render dữ liệu ra bảng
function renderDataNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    let { tknv, name, email, datepicker, luongCB, chucvu, gioLam, tongLuong } =
      nhanVien;
    // Xác định loại nhân viên dựa trên giờ làm
    let loaiNhanVien = "";
    if (gioLam >= 192) {
      loaiNhanVien = "Nhân viên xuất sắc";
    } else if (gioLam >= 176) {
      loaiNhanVien = "Nhân viên giỏi";
    } else if (gioLam >= 160) {
      loaiNhanVien = "Nhân viên khá";
    } else {
      loaiNhanVien = "Nhân viên trung bình";
    }
    content += `
        <tr>
            <td>${tknv}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${datepicker}</td>
            <td>${chucvu}</td>
            <td>${tongLuong}</td>
            <td>${loaiNhanVien}</td>

        </tr>
        `;
  }
  // Gán nội dung vào tbody thay vì form
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
