import axios from "axios";

export const getVideos = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/video")
      .then(response => resolve(response.data))
      .catch(reject);
  });
};

export const addVideo = (remoteId, name, description = '') => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/video", {
        "name": name,
        "description": description,
	      "provider": "vimeo",
	      "remote_id": remoteId
      })
      .then(response => resolve(response.data))
      .catch(reject);
  });
};

export const deleteVideo = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/video/${id}`)
      .then(response => resolve(response.data))
      .catch(reject);
  });
};
