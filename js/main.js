const generateBtn = document.getElementById("generate-qr");
const downloadBtn = document.getElementById("download-qr");
const qrCode = document.getElementById("qr-code");
const textBox = document.getElementById("text");
const qrSizeInput = document.getElementById("qr-size");


function showAlert(alertTitle, alertIcon) {
     swal.fire({
          position: 'top',
          icon: alertIcon,
          title: alertTitle,
          showConfirmButton: false,
     })
}

function generateQr(text, qrCode, size) {
     var qrCode = new QRCode(qrCode, {
          text: text,
          width: size,
          height: size,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
     });
}

const downloadQr = function (e) {

     if (qrCode.innerHTML == "") {
          showAlert("Generate QR code first", "error");
     }
     else {
          const qrImage = qrCode.querySelector("img");
          const url = qrImage.src;
          downloadBtn.href = url;
     }
}

const onSubmit = function (e) {


     e.preventDefault();
     qrCode.innerHTML = "";

     const text = textBox.value;
     const size = qrSizeInput.value;

     if (text == "") {
          showAlert('Encrypting text is required', 'warning');
     }
     else {
          const spinner = document.getElementById("spinner");
          spinner.classList.remove("visually-hidden");

          setTimeout(
               function () {
                    spinner.classList.add("visually-hidden");
                    generateQr(text, qrCode, size);
                    qrCode.classList.remove("visually-hidden");
               },
               2000);
     }
};

generateBtn.addEventListener('click', onSubmit);
downloadBtn.addEventListener('click', downloadQr)
