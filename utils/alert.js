const Swal = require("sweetalert2");

function sendAlert(messages) {
  Swal.fire({
    title: "Oops",
    text: messages,
    icon: "error",
  });
}
function showSaveDialog() {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
module.exports = {
  sendAlert,
  showSaveDialog,
};
