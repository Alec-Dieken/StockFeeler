import axios from "axios";

const SERVER_BASE_URL = process.env.BASE_URL || "http://localhost:8080";

class UsersApi {
    constructor() {}

    static async getUsersForLeaderboard(token) {
        const usersResponse = await axios.get(SERVER_BASE_URL + `/users/leaderboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const users = usersResponse.data.users;

        return users;
    }

    static async getUserAccountInfo(id, token) {
        const userAccountInfoResponse = await axios.get(SERVER_BASE_URL + `/users/account/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const userAccountInfo = userAccountInfoResponse.data.info;

        return userAccountInfo;
    }

    static async updateAvatar(id, token, avatar) {
        const response = await axios.post(SERVER_BASE_URL + `/users/avatar/${id}`, {avatar}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.avatar;
    }

    static async deleteAccount(id, token) {
        const response = await axios.delete(SERVER_BASE_URL + `/users/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    }
    
}

export default UsersApi;
