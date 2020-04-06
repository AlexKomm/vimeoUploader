import axios from "axios";

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "/login",
        {
          email,
          password
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(response => resolve(response.data))
      .catch(error => {
        let message = "Uknown error occured. Please try again later.";

        if (error.response) {
          message = error.response.data.error;
        }

        reject(message);
      });
  });
};
