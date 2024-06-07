export const categories = [
  {
    id: 1,
    name: "Desarrollo web",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 2,
    name: "Programación",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 3,
    name: "Marketing",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 4,
    name: "Diseño",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 5,
    name: "Ciencia de datos",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 6,
    name: "Fotografía",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 7,
    name: "Finanzas",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 8,
    name: "Arte",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 9,
    name: "Negocio",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 10,
    name: "Salud",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 11,
    name: "Idioma",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 12,
    name: "Cocina",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 13,
    name: "Ambiente",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
  },
  {
    id: 14,
    name: "Desarrollo Móvil",
    img: "assets/images/language.svg",
    description:
      "Domina el arte de la programación con nuestros cursos especializados.",
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
