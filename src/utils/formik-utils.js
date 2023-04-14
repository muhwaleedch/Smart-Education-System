const FUNCTION_UTILS = {
  getFormikError: (formik, name) => {
    return formik.touched[name] && formik.errors[name] ? (
      <div
        style={{
          color: '#FF6565',
          display: 'flex',
          justifyContent: 'flex-start',
          padding: '.5em, .2em',
          fontSize: '.8em',
        }}>
        {formik.errors[name]}
      </div>
    ) : null;
  },
};

export default FUNCTION_UTILS;
