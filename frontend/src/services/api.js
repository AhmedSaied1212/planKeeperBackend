const API_BASE = "/api";

export const apiClient = {
  async getPlans() {
    const response = await fetch(`${API_BASE}/plans`);
    if (!response.ok) throw new Error("Failed to fetch plans");
    return response.json();
  },

  async getPlan(id) {
    const response = await fetch(`${API_BASE}/plans/${id}`);
    if (!response.ok) throw new Error("Failed to fetch plan");
    return response.json();
  },

  async createPlan(plan) {
    const response = await fetch(`${API_BASE}/plans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create plan");
    }
    return response.json();
  },

  async deletePlan(id) {
    const response = await fetch(`${API_BASE}/plans/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete plan");
    return response.json();
  },

  async updatePlan(id, plan) {
    const response = await fetch(`${API_BASE}/plans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan),
    });
    if (!response.ok) throw new Error("Failed to update plan");
    return response.json();
  },
};
