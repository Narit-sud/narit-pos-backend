export class QueryResult<T> {
    success: boolean;
    message: string;
    data: T[];
    rowCount: number;

    constructor(
        success: boolean,
        message: string,
        data: T[],
        rowCount: number
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.rowCount = rowCount;
    }
}
