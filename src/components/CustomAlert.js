import "../scss/components/custom-alert.scss";

export const CustomAlert = ({ isSuccess, text }) => {
  return (
    <div
      className={`col-12 text-center font-xsss fw-700 p-3 lh-32 text-uppercase rounded-lg ls-2  d-inline-block  mb-4 mr-1 custom-alert-styles ${
        isSuccess ? "alert-success text-success" : "alert-danger text-danger"
      }`}
    >
      <span>{text}</span>
    </div>
  );
};
