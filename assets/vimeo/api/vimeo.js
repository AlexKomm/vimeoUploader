import axios from "axios";

const API_ROOT = "https://api.vimeo.com";

export const createUpload = file => {
  const name = file.meta.username || file.meta.name;

  return axios.post(
    `${API_ROOT}/me/videos`,
    {
      upload: {
        approach: "tus",
        size: file.size
      },

      name: name.replace(/\.\w+$/, ""),
      description: file.meta.description,
      privacy: {
        view: "anybody"
      }
    },
    {
      headers: {
        authorization: `Bearer ${process.env['VIMEO_ACCESS_TOKEN']}`,
        "content-type": "application/json",
        accept: "application/vnd.vimeo.*+json;version=3.4"
      }
    }
  );
};
export const deleteVideo = id => {
  return axios.delete(`${API_ROOT}/videos/${id}`, {
    headers: {
      authorization: `Bearer ${process.env['VIMEO_ACCESS_TOKEN']}`
    }
  });
};
