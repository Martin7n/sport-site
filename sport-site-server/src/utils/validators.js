



export function minMaxLenValidator(min = 0, max) {
  return {
    validator: function (v) {
      if (typeof v !== 'string') return false;

      const isMinValid = v.length >= min;
      const isMaxValid = max !== undefined ? v.length <= max : true;

      return isMinValid && isMaxValid;
    },
    message: function (props) {
      if (max !== undefined) {
        return `Field '${props.path}' must be between ${min} and ${max} characters long, got '${props.value}'`;
      } else {
        return `Field '${props.path}' must be at least ${min} characters long, got '${props.value}'`;
      }
    }
  };
}



export function minMaxValidatorObj({min = 0, max = Infinity}) {
  return {
    validator: function (v) {
      return typeof v === 'string' && v.length >= min && v.length <= max;
    },
    message: props =>
      `Field '${props.path}' must be at least ${min}  and ${max} characters long, got '${props.value}'`
  };
};


function minLengthValidator(min) {
  return {
    validator: function (v) {
      return typeof v === 'string' && v.length >= min;
    },
    message: props => 
    `Field '${props.path}' must be at least ${min} characters long, got '${props.value}'`
    // message: props => `Must be at least ${min} characters long, got '${props.value}'`
  };
};



