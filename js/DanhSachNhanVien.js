function DanhSachNhanVien() {
  //Thuộc tính
  this.mangNV = [];

  //Phương thức
  //Thêm nhân viên
  this.themNV = function (nv) {
    this.mangNV.push(nv);
  }

  //Tìm vị trí
  this.timViTri = function (taikhoan) {
    var viTri = -1;
    this.mangNV.map(
      function (nv, index) {
        if (nv.TaiKhoan == taikhoan) {
          viTri = index;
        }
      }
    );
    return viTri;
  }

  //Xóa Nhân viên
  this.xoaNhanVien = function (taikhoan) {
    var viTri = this.timViTri(taikhoan);
    if (viTri > -1) {
      this.mangNV.splice(viTri, 1);
    }
  }
  //Xem thông tin nhân viên
  this.layChiTiet = function (taikhoan) {
    var viTri = this.timViTri(taikhoan);
    if (viTri > -1) {
      return this.mangNV[viTri];
    }
    else {
      console.log("Không tìm thấy nhân viên");
    }
  }
  //Cập nhật thông tin nhân viên
  this.capNhat = function (nv) {
    var viTri = this.timViTri(nv.TaiKhoan);
    if (viTri > -1) {
      this.mangNV[viTri] = nv;
    }
    else {
      console.log("Không tìm thấy nhân viên")
    }
  }
  //Tìm nhân viên theo xếp loại
  this.searchXL = function (tuKhoa) {
    var mangXl = [];
    var xl = tuKhoa.trim().toLowerCase();
    this.mangNV.map(function(nv){
      var xepLoai = nv.LoaiNV.toLowerCase();
      if (xepLoai.indexOf(xl) > -1){
        mangXl.push(nv);
      }
    });
    return mangXl;
  }
}