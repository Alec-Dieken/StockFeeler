import axios from "axios";

const SERVER_BASE_URL = process.env.BASE_URL || "http://localhost:8080";

class VotesApi {
    constructor() {}

    static async addVote(userID, queryID, prediction, token) {
        const voteResponse = await axios.post(
            SERVER_BASE_URL + `/votes`,
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
    }

    static async getVotes(userID, token) {
        const votesResponse = await axios.get(SERVER_BASE_URL + `/votes/${userID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    
        const votes = votesResponse.data.votes;
    
        return votes;
    }
    
}

export default VotesApi;
