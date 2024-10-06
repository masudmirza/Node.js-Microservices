export class CustomError extends Error {
    statusCode: number;
    code: string

    constructor(statusCode: number, code: string, ) {
        super();
        
        this.statusCode = statusCode;
        this.code = code;
    }
}
