export const categories = [
  {
    id: 1,
    name: "Tours históricos",
    img: "assets/images/language.svg",
    description:
      "Explora la historia de tu destino con nuestros guías expertos en tours históricos.",
  },
  {
    id: 2,
    name: "Tours culturales",
    img: "assets/images/language.svg",
    description:
      "Descubre la cultura local con nuestros guías especializados en tours culturales.",
  },
  {
    id: 3,
    name: "Aventuras al aire libre",
    img: "assets/images/language.svg",
    description:
      "Vive la aventura con nuestros guías en actividades al aire libre y excursiones.",
  },
  {
    id: 4,
    name: "Gastronomía",
    img: "assets/images/language.svg",
    description:
      "Disfruta de la gastronomía local con nuestros guías conocedores de la cocina regional.",
  },
  {
    id: 5,
    name: "Tours de naturaleza",
    img: "assets/images/language.svg",
    description:
      "Conéctate con la naturaleza a través de nuestros tours guiados en entornos naturales.",
  },
  {
    id: 6,
    name: "Fotografía",
    img: "assets/images/language.svg",
    description:
      "Captura los mejores momentos con nuestros guías especializados en tours de fotografía.",
  },
  {
    id: 7,
    name: "Deportes",
    img: "assets/images/language.svg",
    description:
      "Participa en actividades deportivas con la guía de nuestros expertos.",
  },
  {
    id: 8,
    name: "Arte y arquitectura",
    img: "assets/images/language.svg",
    description:
      "Descubre el arte y la arquitectura de tu destino con nuestros guías especializados.",
  },
  {
    id: 9,
    name: "Compras",
    img: "assets/images/language.svg",
    description:
      "Encuentra las mejores tiendas y mercados locales con nuestros guías de compras.",
  },
  {
    id: 10,
    name: "Salud y bienestar",
    img: "assets/images/language.svg",
    description:
      "Relájate y rejuvenece con nuestros tours de salud y bienestar.",
  },
  {
    id: 11,
    name: "Idiomas",
    img: "assets/images/language.svg",
    description:
      "Mejora tus habilidades lingüísticas con la ayuda de nuestros guías bilingües.",
  },
  {
    id: 12,
    name: "Gastronomía local",
    img: "assets/images/language.svg",
    description:
      "Prueba la cocina local con la orientación de nuestros expertos en gastronomía.",
  },
  {
    id: 13,
    name: "Sostenibilidad",
    img: "assets/images/language.svg",
    description:
      "Descubre iniciativas sostenibles y ecológicas con nuestros guías comprometidos.",
  },
  {
    id: 14,
    name: "Tecnología",
    img: "assets/images/language.svg",
    description:
      "Explora la innovación tecnológica en tu destino con nuestros guías expertos.",
  },
];

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

export const isEmptyObject = (obj) => Object.keys(obj).length;

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
