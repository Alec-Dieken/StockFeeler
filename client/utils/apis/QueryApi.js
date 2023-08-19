import axios from "axios";

const SERVER_BASE_URL = process.env.BASE_URL || "http://localhost:8080";

class QueryApi {
    constructor() {}

    static async selectNextQuery(userID, token) {
        
        const queryResponse = await axios.get(SERVER_BASE_URL + `/queries/random/${userID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        const query = queryResponse.data.query;

        return query;
    }
}

export default QueryApi;
