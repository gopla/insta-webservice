module.exports = {
  setError: (code, message) => {
    return {
      isSuccess: false,
      statusCode: code,
      message: message,
    }
  },
}
