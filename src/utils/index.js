export const categories = [
  {
    id: 1,
    name: "Tour individual",
    img: "assets/images/language.svg",
    description: "Explora la historia de tu destino con un guía solo para vos.",
  },
  {
    id: 2,
    name: "Tour grupal",
    img: "assets/images/language.svg",
    description:
      "Descubre tu destino con un grupo y un guía que los acompañará en todo momento.",
  },
  {
    id: 3,
    name: "Traducciones",
    img: "assets/images/language.svg",
    description:
      "No te preocupes por un idioma que no conoces! Un guía capacitado estará con vos para traducirte cada detalle",
  },
];

export const USER_ROL = {
  UNDEFINED: "undefined",
  GUIDE: "guide",
  TOURIST: "tourist",
};

export const FETCH_STATUS = {
  LOADING: "loading",
  IDLE: "idle",
  FAILED: "failed",
  SUCCEEDED: "succeeded",
};
export const BREAKPOIN_SMALL = 1024;

export const commentsStatus = {
  PENDING: "rending",
  RECEIVED: "received",
  CANCELLED: "cancelled",
};

export const isEmptyObject = (obj) => !Object.keys(obj).length;

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
