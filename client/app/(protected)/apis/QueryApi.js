import axios from "axios";

const serverBaseUrl = "https://stockfeeler.online:443";

class QueryApi {
    constructor() {}

    static async selectNextQuery(userID, token) {
        try {
            const queryResponse = await axios.get(serverBaseUrl + `/queries/random/${userID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            const query = queryResponse.data.query;

            return query;
        } catch(error) {
            console.error("Error fetching votes:", error);
            throw error;
        }
    }
}

export default QueryApi;
