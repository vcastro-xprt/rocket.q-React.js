const API_BASE_URL = "http://localhost:3001/api";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Room related methods
  async createRoom(password) {
    return this.request("/rooms/create", {
      method: "POST",
      body: { password },
    });
  }

  async enterRoom(roomId, password) {
    return this.request("/rooms/enter", {
      method: "POST",
      body: { roomId, password },
    });
  }

  async getRoomDetails(roomId) {
    return this.request(`/rooms/${roomId}`);
  }

  async deleteRoom(roomId, password) {
    return this.request(`/rooms/${roomId}`, {
      method: "DELETE",
      body: { password },
    });
  }

  // Question related methods
  async createQuestion(text, roomId) {
    return this.request("/questions/create", {
      method: "POST",
      body: { text, roomId },
    });
  }

  async getQuestionsByRoom(roomId) {
    return this.request(`/questions/room/${roomId}`);
  }

  async markQuestionAsRead(questionId, password) {
    return this.request(`/questions/${questionId}/read`, {
      method: "PUT",
      body: { password },
    });
  }

  async deleteQuestion(questionId, password) {
    return this.request(`/questions/${questionId}`, {
      method: "DELETE",
      body: { password },
    });
  }

  async getQuestion(questionId) {
    return this.request(`/questions/${questionId}`);
  }
}

export default new ApiService();
