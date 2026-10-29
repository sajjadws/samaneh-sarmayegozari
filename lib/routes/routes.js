export const routes = {
    homePage: "/",
    auth: {
        login: "/auth/login"
    },
    panel: {
        users: "/users",
        user: (id) => `/users/${id}`,
        projects: "/projects",
        myProjects: "/projects/my-projects",
        project: (id) => `/projects/${id}`,
        createProject: "/projects/create-project",
        projectsReview: "/projects/projects-review",
        categories: "/categories",
        category: (id) => `/categories/${id}`,
    }
}