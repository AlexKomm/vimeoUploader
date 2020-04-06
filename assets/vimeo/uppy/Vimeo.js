import { Plugin } from "@uppy/core";

import mapLimit from "promise-map-limit";
import { createUpload } from "../api/vimeo";

class Vimeo extends Plugin {
  name = "Vimeo";

  id = "Vimeo";

  type = "uploader";

  opts = Object.assign(
    {
      limit: 100
    },
    this.opts
  );

  prepareUpload = async fileIDs => {
    fileIDs.forEach(fileID => {
      this.uppy.emit("preprocess-progress", fileID, {
        mode: "indeterminate",
        message: "Creating videos..."
      });
    });

    await mapLimit(fileIDs, this.opts.limit, async fileID => {
      const file = this.uppy.getFile(fileID);

      const response = await createUpload(file);

      const { upload, link, uri } = response.data;

      this.uppy.setFileState(fileID, {
        uploadURL: link,
        vimeo: {
          link,
          id: uri.split('/').pop()
        },
        tus: Object.assign({}, file.tus, {
          uploadUrl: upload.upload_link
        }),
        remote: Object.assign({}, file.remote, {
          body: Object.assign({}, file.remote.body, {
            uploadUrl: upload.upload_link
          })
        })
      })

      this.uppy.emit('preprocess-complete', fileID)
    });
  };

  afterUpload = async (fileIDs) => {
    fileIDs.forEach((fileID) => {
      const file = this.uppy.getFile(fileID)
      const video = file.vimeo

      this.uppy.setFileState(fileID, {
        uploadURL: video.link
      })
    })
  };

  install() {
    this.uppy.addPreProcessor(this.prepareUpload);
    this.uppy.addPostProcessor(this.afterUpload);
  }

  uninstall() {
    this.uppy.removePreProcessor(this.prepareUpload);
    this.uppy.removePostProcessor(this.afterUpload);
  }
}

export default Vimeo;
