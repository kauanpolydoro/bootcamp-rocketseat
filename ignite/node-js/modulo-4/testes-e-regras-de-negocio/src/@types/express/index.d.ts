declare namespace Express {
    export type Request = {
        user: {
            id: string;
        };
        files: any;
    };
}
