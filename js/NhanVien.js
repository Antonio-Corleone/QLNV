function NhanVien(taikhoan, hovaten, email, matkhau, ngaylam, luong, chucvu, giolam) {
  //Thuộc tính
  this.TaiKhoan = taikhoan;
  this.HoVaTen = hovaten;
  this.Email = email;
  this.MatKhau = matkhau;
  this.NgayLam = ngaylam;
  this.LuongCB = luong;
  this.ChucVu = chucvu;
  this.GioLam = giolam;
  this.TongLuong = 0;
  this.LoaiNV = "";

  //Phương thức
  //Tinh tong luong NV
  this.tinhTongLuong = function () {
    if (this.ChucVu == "Sếp") {
      this.TongLuong = this.LuongCB * 3;
    }
    else if (this.ChucVu == "Trưởng phòng") {
      this.TongLuong = this.LuongCB * 2;
    }
    else {
      this.TongLuong = this.LuongCB * 1;
    }
    return this.TongLuong;
  }

  //Xep loai NV
  this.xepLoai = function () {
    if (this.GioLam >= 192) {
      this.LoaiNV = "Xuất sắc";
    }
    else if (this.GioLam >= 176 && this.GioLam < 192) {
      this.LoaiNV = "Giỏi";
    }
    else if(this.GioLam >= 160 && this.GioLam < 176){
      this.LoaiNV = "Khá";
    }
    else {
      this.LoaiNV = "Trung Bình";
    }
    return this.LoaiNV;
  }
}