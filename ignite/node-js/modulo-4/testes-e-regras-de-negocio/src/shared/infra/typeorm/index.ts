import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
    const deaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(deaultOptions, {
            host,
        })
    );
};
