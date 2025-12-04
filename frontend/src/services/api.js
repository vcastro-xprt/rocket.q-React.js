const API_BASE_URL = "http://localhost:3001/api";

class ApiService {
  constructor() {
    this.token = localStorage.getItem("authToken") || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

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

  // Auth methods
  async signup(email, password) {
    const data = await this.request("/auth/signup", {
      method: "POST",
      body: { email, password },
    });
    this.setToken(data.token);
    return data;
  }

  async login(email, password) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    this.setToken(data.token);
    return data;
  }

  logout() {
    this.setToken(null);
  }
}

export default new ApiService();
