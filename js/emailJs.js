emailjs.init({
  publicKey: "IaBG5iHL97UxZ889U",
});

document.getElementById("contact").addEventListener("submit", sendMail);

const mailTexts =
  document.documentElement.lang === "en"
    ? {
        ok: "OK",
        emptyTitle: "Missing fields",
        emptyText: "Please fill in all the fields.",
        invalidTitle: "Invalid email",
        invalidText: "Please enter a valid email address.",
        sendingTitle: "Sending...",
        sendingText: "We are processing your message.",
        sentTitle: "Sent!",
        sentText: "Your message has been sent successfully.",
        errorTitle: "Sending failed",
        errorText: "We couldn't reach the server. Please try again later.",
      }
    : {
        ok: "Aceptar",
        emptyTitle: "Campos incompletos",
        emptyText: "Por favor, completa todos los campos.",
        invalidTitle: "Email no válido",
        invalidText:
          "Por favor, introduce una dirección de correo electrónica real.",
        sendingTitle: "Enviando...",
        sendingText: "Estamos procesando tu mensaje.",
        sentTitle: "¡Enviado!",
        sentText: "Tu mensaje se ha enviado correctamente.",
        errorTitle: "Error de envío",
        errorText: "No pudimos conectar con el servidor. Inténtalo más tarde.",
      };

function sendMail(event) {
  if (event) event.preventDefault();

  const emailValue = document.getElementById("email").value;
  const messageValue = document.getElementById("message").value;

  // 1. Validación de campos vacíos
  if (!emailValue || !messageValue) {
    Swal.fire({
      icon: "warning",
      title: mailTexts.emptyTitle,
      text: mailTexts.emptyText,
      color: "#1e0c1b",
      confirmButtonColor: "#1e0c1b",
      confirmButtonText: mailTexts.ok,
      confirmButtonAriaLabel: mailTexts.ok,
    });
    return;
  }

  // 2. Validación de formato de email (Regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    Swal.fire({
      icon: "error",
      title: mailTexts.invalidTitle,
      text: mailTexts.invalidText,
      color: "#1e0c1b",
      confirmButtonColor: "#1e0c1b",
      confirmButtonText: mailTexts.ok,
      confirmButtonAriaLabel: mailTexts.ok,
    });
    return;
  }

  // Si pasa las validaciones, mostramos el cargando
  Swal.fire({
    title: mailTexts.sendingTitle,
    text: mailTexts.sendingText,
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
        title: mailTexts.sentTitle,
        text: mailTexts.sentText,
        timer: 3000,
        showConfirmButton: false,
      });
      document.getElementById("contact").reset();
    })
    .catch((error) => {
      console.error("Error de EmailJS:", error);
      Swal.fire({
        icon: "error",
        title: mailTexts.errorTitle,
        text: mailTexts.errorText,
      });
    });
}
