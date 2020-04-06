import React from "react";
import Uppy from "@uppy/core";
import { DragDrop, ProgressBar, StatusBar } from "@uppy/react";
import Tus from "@uppy/tus";
import Vimeo from "../uppy/Vimeo";
import { Box } from "rebass";
import { Label, Input } from "@rebass/forms";
import { addVideo } from "../api/video";

import "@uppy/core/dist/style.css";

import "@uppy/drag-drop/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import "@uppy/status-bar/dist/style.css";

class UploadForm extends React.Component {
  state = {
    formData: {
      name: '',
      description: '',
    }
  };

  constructor(props) {
    super(props);

    this.uppy = Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["video/*"]
      }
    })
      .use(Tus)
      .use(Vimeo);

    this.uppy.on("upload-success", file => {
      const { username, description } = file.meta;
      const { id } = file.vimeo;

      const { onVideoUploaded } = this.props;

      addVideo(id, username, description).then(onVideoUploaded);
    });
  }

  updateFormData = (name, value) => {
    const formData = { ...this.state.formData, [name]: value };

    this.setState({ formData });

    this.uppy.setMeta({
      username: formData.name,
      description: formData.description
    });
  };

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    const { formData } = this.state;

    return (
      <Box as="form" py={3} minWidth="500px" maxWidth="100%">
        <Box mb={3}>
          <Label htmlFor="name">Name:</Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={e => this.updateFormData("name", e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <Label htmlFor="description">Description:</Label>
          <Input
            as="textarea"
            id="description"
            value={formData.description}
            onChange={e => this.updateFormData("description", e.target.value)}
          />
        </Box>
        <DragDrop uppy={this.uppy} />
        <Box my={2}>
          <ProgressBar uppy={this.uppy} />
          <StatusBar uppy={this.uppy} />
        </Box>
      </Box>
    );
  }
}

export default UploadForm;
