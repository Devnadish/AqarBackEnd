class ApiError extends Error { 
    constructor(message,statusCode ) {
      super(message);
      this.statusCode = statusCode;
      this.statusCode = `${statusCode}`.startsWith(4) ? "fail" : "errr";
      this.isOperational = true;
    }
  }
  
  module.exports =   ApiError;
  