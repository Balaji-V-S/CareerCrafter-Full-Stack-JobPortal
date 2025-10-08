const jobSeekerApi = {
  getProfile: async (token) => {
    return {
      id: 1,
      name: "John Doe",
      skills: ["React", "Spring Boot"],
      education: ["B.E. ECE"],
      workExperience: ["Intern at Hexaware"],
      resume: null,
    };
  },
  updateProfile: async (data, token) => {
    return { success: true };
  },
};

export default jobSeekerApi;
