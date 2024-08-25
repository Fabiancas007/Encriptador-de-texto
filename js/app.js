var txt_area = document.querySelector(".form__input");
var img_muneco = document.querySelector(".result__img");
var result_container = document.querySelector(".result__container");
var result_title = document.querySelector(".result__title");
var result_text = document.querySelector(".result__text");
var btn_encrypt = document.getElementById("btn-encrypt");
var btn_decrypt = document.getElementById("btn-decrypt");
var btn_copy = document.getElementById("btn-copy");

const keys = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];
//Funcion para encriptar
function encryptText(msg) {
  let encrypted_msg = "";
  for (let i = 0; i < msg.length; i++) {
    let char = msg[i];
    let encrypted = char;
    for (let j = 0; j < keys.length; j++) {
      if (char === keys[j][0]) {
        encrypted = keys[j][1]; // Reemplaza la letra por su equivalente encriptado
        break; // Termina el bucle cuando se encuentra la correspondencia
      }
    }
    encrypted_msg += encrypted;
  }
  return encrypted_msg;
}

// function  para desencriptar
function decryptText(msg) {
  let decrypt_msg = msg;
  for (let i = 0; i < keys.length; i++) {
    let regex = new RegExp(keys[i][1], "g");
    decrypt_msg = decrypt_msg.replace(regex, keys[i][0]); // Reemplaza el texto encriptado por su equivalente original
  }
  return decrypt_msg; // Devuelve el mensaje desencriptado
}

//Ocultar elementos dinamicamente
txt_area.addEventListener("input", (e) => {
  img_muneco.style.display = "none";
  result_title.textContent = "Capturando Mensaje.";
  result_text.textContent = "";
});

//Función del botón encriptar
btn_encrypt.addEventListener("click", (e) => {
  e.preventDefault();
  let msg = txt_area.value.toLowerCase();
  let encrypted_msg = encryptText(msg);
  result_title.classList.add("hidden");
  result_text.textContent = encrypted_msg;
  result_text.style.textAlign = "start";
  btn_copy.classList.remove("hidden");
  result_container.style.height = "90%";
  result_container.style.display = 'flex';
  result_container.style.flexDirection = 'column';
  result_container.style.justifyContent = 'space-between';
});

btn_decrypt.addEventListener("click", (e) => {
  e.preventDefault();
  let msg = txt_area.value.toLowerCase();
  let decrypted_text = decryptText(msg);
  result_title.classList.add("hidden");
  result_text.textContent = decrypted_text;
  btn_copy.classList.remove("hidden");
});

btn_copy.addEventListener("click", () => {
  let copied_text = result_text.textContent;
  navigator.clipboard.writeText(copied_text).then(() => {
    img_muneco.style.display = "block";
    result_title.classList.remove("hidden")
    result_title.textContent = "El texto ha sido copiado";
    btn_copy.classList.add("hidden");
    result_text.textContent = "";
  });
});
