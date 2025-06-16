import axios from "axios";


axios.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("loginToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


axios.interceptors.response.use(
    (response) => {
        // les codes de succès sont 200, 201, 202
        if (response.status === 200) {
            // alert("Success")
        }
        return response
    },
    (error) => {
        // les codes d'erreur sont 400, 401, 403, 404, 500
        console.log("response plz", error)
        if (error.response.status === 401) {
            console.log("Unauthorized")
            sessionStorage.removeItem("loginToken")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)