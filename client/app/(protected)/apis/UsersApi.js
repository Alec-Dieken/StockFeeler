import axios from "axios";

const serverBaseUrl = "https://stockfeeler.online:443";

class UsersApi {
    constructor() {}

    static async getUsersForLeaderboard(token) {
        const usersResponse = await axios.get(serverBaseUrl + `/users/leaderboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const users = usersResponse.data.users;

        return users;
    }

    static async getUserAccountInfo(id, token) {
        const userAccountInfoResponse = await axios.get(serverBaseUrl + `/users/account/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const userAccountInfo = userAccountInfoResponse.data.info;

        return userAccountInfo;
    }

    static async getAvatar(id, token) {
        const response = await axios.get(serverBaseUrl + `/users/avatar/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.avatar;
    }

    static async updateAvatar(id, token, avatar) {
        const response = await axios.post(serverBaseUrl + `/users/avatar/${id}`, {avatar}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.avatar;
    }

    static async deleteAccount(id, token) {
        const response = await axios.delete(serverBaseUrl + `/users/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    }
    
}

export default UsersApi;
