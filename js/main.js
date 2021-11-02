var dsnv = new DanhSachNhanVien();
var validation = new Validation();
function getELE(id) {
  return document.getElementById(id);
}

function setLocalStorage(mangNV) {
  localStorage.setItem("DSNV", JSON.stringify(mangNV));
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV") != null) {
    dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
    hienThiTable(dsnv.mangNV);
  }
}
getLocalStorage()

function layThongTinNV() {
  var taikhoan = getELE("tknv").value;
  var hovaten = getELE("name").value;
  var email = getELE("email").value;
  var matkhau = getELE("password").value;
  var ngaylam = getELE("datepicker").value;
  var luong = getELE("luongCB").value;
  var chucvu = getELE("chucvu").value;
  var giolam = getELE("gioLam").value;

  //Kiểm tra validation rồi mới thêm NV mới
  var isValid = true;

  //Kiểm tra tài khoản
  isValid &= validation.checkEmpty(taikhoan, "Tài khoản không được để trống", "tbTKNV") && validation.checkID(taikhoan, "Tài khoản không được trùng", "tbTKNV", dsnv.mangNV);

  //Kiểm tra tên nhân viên
  isValid &= validation.checkEmpty(hovaten, "Họ tên không được để trống", "tbTen") && validation.checkName(hovaten, "Tên phải là kiểu chữ", "tbTen");

  //Kiểm tra email
  isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email không đúng định dạng", "tbEmail");

  //Kiểm mật khẩu
  isValid &= validation.checkEmpty(matkhau, "Mật khẩu không được để trống", "tbMatKhau") && validation.checkPass(matkhau, "Mật khẩu không hợp lệ", "tbMatKhau");

  //Kiểm tra ngày làm
  isValid &= validation.checkEmpty(ngaylam, "Ngày làm không được để trống", "tbNgay");

  //Kiểm tra định dạng lương CB
  isValid &= validation.checkEmpty(luong, "Lương CB không được để trống", "tbLuongCB") && validation.checkSalary(luong, "Lương CB không hợp lệ", "tbLuongCB");

  //Kiểm tra chọn chức vụ
  isValid &= validation.checkRole("chucvu", "Phải chọn chức vụ", "tbChucVu");

  //Kiểm tra định dạng giờ làm
  isValid &= validation.checkEmpty(giolam, "Giờ làm không được để trống", "tbGiolam") && validation.checkTime(giolam, "Giờ làm không đúng định dạng", "tbGiolam");

  if (isValid) {
    var nv = new NhanVien(taikhoan.trim(), hovaten, email, matkhau, ngaylam, Number(luong), chucvu, giolam);
    nv.TongLuong = nv.tinhTongLuong();
    nv.LoaiNV = nv.xepLoai();
    //Them NV
    dsnv.themNV(nv);
    //Hiện thị lên giao diện
    hienThiTable(dsnv.mangNV);
    //Lưu xuống local storage
    setLocalStorage(dsnv.mangNV);
  }
}

function hienThiTable(mangNV) {
  var content = "";
  for (var i = 0; i < mangNV.length; i++) {
    var trNV = `<tr>
    <td>${mangNV[i].TaiKhoan}</td>
    <td>${mangNV[i].HoVaTen}</td>
    <td>${mangNV[i].Email}</td>
    <td>${mangNV[i].NgayLam}</td>
    <td>${mangNV[i].ChucVu}</td>
    <td>${mangNV[i].TongLuong}</td>
    <td>${mangNV[i].LoaiNV}</td>
    <td>
      <button class="btn btn-danger" onclick ="xoaNV('${mangNV[i].TaiKhoan}')">Xóa</button>
      <button class="btn btn-info" onclick = "xemChiTiet('${mangNV[i].TaiKhoan}')" data-toggle="modal" data-target="#myModal">Xem</button>
    </td>
    </tr>`;
    content += trNV;
  }
  getELE("tableDanhSach").innerHTML = content;
}

//Xóa nhân viên
function xoaNV(taikhoan) {
  dsnv.xoaNhanVien(taikhoan);
  setLocalStorage(dsnv.mangNV);
  hienThiTable(dsnv.mangNV);
}

//Reset span thông báo
function resetSpan() {
  var x = document.querySelectorAll(".sp-thongbao");
  for (var i = 0; i < x.length; i++) {
    x[i].innerHTML = "";
    x[i].style.display = "none";
  }
}

//Reset form
function resetForm() {
  getELE("formQLNV").reset();
  //Clear span thông báo
  resetSpan();
  getELE("tknv").disabled = false;
  getELE("btnThemNV").disabled = false;
}

//Xem thông tin nhân viên
function xemChiTiet(taikhoan) {
  var nvTimDuoc = dsnv.layChiTiet(taikhoan);
  if (nvTimDuoc != undefined) {
    //Clear span thông báo
    resetSpan();
    getELE("tknv").disabled = true;
    getELE("btnThemNV").disabled = true;
    getELE("tknv").value = nvTimDuoc.TaiKhoan;
    getELE("name").value = nvTimDuoc.HoVaTen;
    getELE("email").value = nvTimDuoc.Email;
    getELE("password").value = nvTimDuoc.MatKhau;
    getELE("datepicker").value = nvTimDuoc.NgayLam;
    getELE("luongCB").value = nvTimDuoc.LuongCB;
    getELE("chucvu").value = nvTimDuoc.ChucVu;
    getELE("gioLam").value = nvTimDuoc.GioLam;
  }
  else {
    console.log("Không tìm thấy nhân viên hàm main");
  }
}

//Cập nhât thông tin nhân viên
function capNhatNV() {
  //Clear span thông báo
  resetSpan();
  var taikhoan = getELE("tknv").value;
  var hovaten = getELE("name").value;
  var email = getELE("email").value;
  var matkhau = getELE("password").value;
  var ngaylam = getELE("datepicker").value;
  var luong = getELE("luongCB").value;
  var chucvu = getELE("chucvu").value;
  var giolam = getELE("gioLam").value;

  var isValid = true;
  //Kiểm tra tài khoản
  //Nếu tài khoản không tồn tại thì không cập nhật
  isValid &= validation.checkEmpty(taikhoan, "Tài khoản không được để trống", "tbTKNV") && validation.checkID(taikhoan.toLowerCase(), "", "tbTKNV", dsnv.mangNV);

  if (!isValid) {
    var isValid = true;
    //Tài khoản tồn tài kiểm tra các trường còn lại
    //Kiểm tra tên nhân viên
    isValid &= validation.checkEmpty(hovaten, "Họ tên không được để trống", "tbTen") && validation.checkName(hovaten, "Tên phải là kiểu chữ", "tbTen");

    //Kiểm tra email
    isValid &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email không đúng định dạng", "tbEmail");

    //Kiểm mật khẩu
    isValid &= validation.checkEmpty(matkhau, "Mật khẩu không được để trống", "tbMatKhau") && validation.checkPass(matkhau, "Mật khẩu không hợp lệ", "tbMatKhau");

    //Kiểm tra ngày làm
    isValid &= validation.checkEmpty(ngaylam, "Ngày làm không được để trống", "tbNgay");

    //Kiểm tra định dạng lương CB
    isValid &= validation.checkEmpty(luong, "Lương CB không được để trống", "tbLuongCB") && validation.checkSalary(luong, "Lương CB không hợp lệ", "tbLuongCB");

    //Kiểm tra chọn chức vụ
    isValid &= validation.checkRole("chucvu", "Phải chọn chức vụ", "tbChucVu");

    //Kiểm tra định dạng giờ làm
    isValid &= validation.checkEmpty(giolam, "Giờ làm không được để trống", "tbGiolam") && validation.checkTime(giolam, "Giờ làm không đúng định dạng", "tbGiolam");
    if (isValid) {
      var nv = new NhanVien(taikhoan.trim(), hovaten, email, matkhau, ngaylam, Number(luong), chucvu, giolam);
      nv.TongLuong = nv.tinhTongLuong();
      nv.LoaiNV = nv.xepLoai();
      dsnv.capNhat(nv);
      setLocalStorage(dsnv.mangNV);
      hienThiTable(dsnv.mangNV);
    }

  }
  else {
    document.getElementById("tbTKNV").innerHTML = "Tài khoản không tồn tại";
    document.getElementById("tbTKNV").style.display = "block";
  }

}

//Search nhân viên theo xếp loại
getELE("searchName").onkeyup = function(){
  var tuKhoa = getELE("searchName").value;
  hienThiTable(dsnv.searchXL(tuKhoa));
}