export class apiRes {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    constructor(statusCode: number, data: any, message = "sucsess") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300;
    }
}