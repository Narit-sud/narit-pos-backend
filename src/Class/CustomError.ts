export class CustomError extends Error {
    code: number;
    error: string | undefined;

    constructor(msg: string, code: number, error?: string) {
        super(msg);
        this.code = code;
        this.name = CustomError.name;
        this.error = error;
    }
}
