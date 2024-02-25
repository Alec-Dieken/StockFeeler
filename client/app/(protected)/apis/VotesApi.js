import axios from "axios";

const serverBaseUrl = "https://stockfeeler.online:443";

class VotesApi {
    constructor() {}

    static async addVote(userID, queryID, prediction, token) {
        try {
            const voteResponse = await axios.post(
                serverBaseUrl + `/votes/`,
                { userID, queryID, prediction },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const vote = voteResponse.data.vote;
            const average = voteResponse.data.average;

            return { ...vote, average };
        } catch (error) {
            console.error("Error fetching votes:", error);
            throw error;
        }
    }

    static async getVotes(userID, token, page = 0, limit = 0) {
        try {
            const votesResponse = await axios.get(`${serverBaseUrl}/votes/${userID}`, {
                params: { page, limit },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return votesResponse.data.votes;
        } catch (error) {
            console.error("Error fetching votes:", error);
            throw error;
        }
    }
}

export default VotesApi;
