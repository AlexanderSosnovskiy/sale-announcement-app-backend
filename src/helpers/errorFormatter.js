let errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return {
    field: param,
    message: msg,
  }
}

export default errorFormatter
