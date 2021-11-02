function Validation() {
  //Phương thức

  //Kiểm tra rỗng
  this.checkEmpty = function (value, message, spanID) {
    if (value.trim() != "") {
      //Hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //Không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  }

  //Kiểm tra định dạng tên nhân viên
  this.checkName = function (value, message, spanID) {
    var pattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
    var reg = new RegExp(pattern);
    if (reg.test(value)) {
      //Hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //Không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  }

  //Kiểm tra định dạng email
  this.checkEmail = function (value, message, spanID) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(pattern)) {
      //Hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //Không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  }

  //Kiểm tra định dạng pass
  this.checkPass = function (value, message, spanID) {
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
    if (value.match(pattern)) {
      //Hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //Không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  }

  //Kiểm tra chọn chức vụ
  this.checkRole = function (selectID, message, spanID) {
    if (document.getElementById(selectID).selectedIndex != 0) {
      //Hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //Không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  }

  //Kiểm tra định dạng lương
  this.checkSalary = function (value, message, spanID) {
    var pattern = /^(\d{7,8}(\.\d{0})?)$/;
    if (value.match(pattern) && value <= 20000000) {
      //Hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //Không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  }

  //Kiểm tra định dạng giờ làm
  this.checkTime = function (value, message, spanID) {
    var pattern = /^(\d{2,3}(\.\d{1,2})?)$/;
    if (value.match(pattern) && 80 <= value && value <= 200) {
      //Hợp lệ
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style.display = "none";
      return true;
    }
    //Không hợp lệ
    document.getElementById(spanID).innerHTML = message;
    document.getElementById(spanID).style.display = "block";
    return false;
  }

  this.checkID = function (value, message, spanID, mangNV) {
    var isExist = false;
    isExist = mangNV.some(function (nv) {
      return value == nv.TaiKhoan.toLowerCase();
    });
    if (isExist) {
      //Không hợp lệ
      document.getElementById(spanID).innerHTML = message;
      document.getElementById(spanID).style.display = "block";
      return false;
    }
    //Hợp lệ
    document.getElementById(spanID).innerHTML = "";
    document.getElementById(spanID).style.display = "none";
    return true;
  }
}