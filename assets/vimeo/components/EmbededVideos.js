import React, { useEffect, useState } from "react";
import { Box, Button, Flex } from "rebass";
import { Label, Checkbox } from "@rebass/forms";
import { getVideos } from "../api/video";
import Video from "./Video";
import Modal from "./Modal";
import UploadForm from "./UploadForm";

const EmbededVideos = ({ userData }) => {
  const [videos, setVideos] = useState(null);

  const [isUploadFormShown, showUploadForm] = useState(false);

  const [layout, setLayout] = useState("grid");

  const isAuthorized = userData !== null && userData.id > 0;

  const onDelete = deletedID => {
    setVideos(videos.filter(video => video.id !== deletedID));
  };

  useEffect(() => {
    async function fetchVideos() {
      const videos = await getVideos();
      setVideos(videos);
    }

    fetchVideos();
  }, []);

  if (videos === null) {
    return null;
  }

  return (
    <>
    <Flex my={3} sx={{ textAlign: "center" }}>
        {isAuthorized && (
          <Button
            variant="primary"
            onClick={() => showUploadForm(!isUploadFormShown)}
          >
            Upload new video
          </Button>
        )}
        <Box mx="auto" />
        <Box>
          <Label alignItems="center">
            <Checkbox
              id="grid"
              name="grid"
              checked={layout === "grid"}
              onChange={e => {
                if (e.target.checked) {
                  setLayout("grid");
                } else {
                  setLayout("default");
                }
              }}
            />
            2 сolumns layout
          </Label>
        </Box>
      </Flex>
      <Flex flexWrap="wrap" alignItems="stretch">
        {videos.map(video => (
          <Video
            onDelete={onDelete}
            withDeleteButton={isAuthorized}
            width={layout === "grid" ? 1 / 2 : "100%"}
            key={video.id}
            video={video}
          />
        ))}
      </Flex>
      {isUploadFormShown && (
        <Modal>
          <UploadForm
            onVideoUploaded={video => {
              showUploadForm(false);
              setVideos([...videos, video]);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default EmbededVideos;
