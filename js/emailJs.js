function sendMail(event) {
  if (event) event.preventDefault();

  const emailValue = document.getElementById("email").value;
  const messageValue = document.getElementById("message").value;

  // 1. Validación de campos vacíos
  if (!emailValue || !messageValue) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, completa todos los campos.",
      color: "#1e0c1b",
      confirmButtonColor: "#1e0c1b",
      confirmButtonText: "Aceptar",
      confirmButtonAriaLabel: "Aceptar",
    });
    return;
  }

  // 2. Validación de formato de email (Regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    Swal.fire({
      icon: "error",
      title: "Email no válido",
      text: "Por favor, introduce una dirección de correo electrónica real.",
      color: "#1e0c1b",
      confirmButtonColor: "#1e0c1b",
      confirmButtonText: "Aceptar",
      confirmButtonAriaLabel: "Aceptar",
    });
    return;
  }

  // Si pasa las validaciones, mostramos el cargando
  Swal.fire({
    title: "Enviando...",
    text: "Estamos procesando tu mensaje.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  let params = {
    email: emailValue,
    message: messageValue,
  };

  emailjs
    .send("service_uc5f4xn", "template_rl9un2i", params)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "¡Enviado!",
        text: "Tu mensaje se ha enviado correctamente.",
        timer: 3000,
        showConfirmButton: false,
      });
      document.getElementById("contact").reset();
    })
    .catch((error) => {
      console.error("Error de EmailJS:", error);
      Swal.fire({
        icon: "error",
        title: "Error de envío",
        text: "No pudimos conectar con el servidor. Inténtalo más tarde.",
      });
    });
}
