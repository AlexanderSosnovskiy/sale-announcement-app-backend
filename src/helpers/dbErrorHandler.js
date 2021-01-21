const getErrorMessage = err => {
  let message = 'Some problems on server. Please, repeat request later.'

  if (err.original && err.original.sqlMessage) {
    message = err.original.sqlMessage
  }

  return message
}

export default { getErrorMessage }
