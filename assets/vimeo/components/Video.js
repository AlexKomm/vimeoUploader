import React from "react";
import { Card, Box, Text, Button, Flex } from "rebass";
import { deleteVideo } from "../api/video";
import { deleteVideo as deleteOnVimeo } from "../api/vimeo";

const Embed = props => (
  <Box
    {...props}
    sx={{
      width: "100%",
      height: 0,
      paddingBottom: 900 / 16 + "%",
      position: "relative",
      overflow: "hidden",
      "& > iframe": {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        bottom: 0,
        left: 0,
        border: 0
      }
    }}
  />
);

const DeleteButton = ({ onDelete, video, ...props }) => {
  const handleDelete = video => {
    Promise.all([deleteOnVimeo(video.remote_id), deleteVideo(video.id)]).then(() => {
      onDelete(video.id);
    });
  };

  return (
    <Button variant="outline" {...props} onClick={() => handleDelete(video)}>
      Delete
    </Button>
  );
};

const Video = ({ onDelete, withDeleteButton, video, ...props }) => {
  return (
    <Box {...props} px={2} mb={3}>
      <Card
        width="100%"
        height="100%"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {video.oembed ? (
          <Embed dangerouslySetInnerHTML={{ __html: video.oembed.html }} />
        ) : (
          <Embed>
            <Text
              sx={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
                top: "50%",
                transform: "translateY(-50%)"
              }}
            >
              Video is being processed on Vimeo platform...
            </Text>
          </Embed>
        )}
        <Flex py={2} alignItems="center" mt="auto">
          <Box>
            <Text fontSize={5}>{video.name}</Text>
            {video.description && <Text fontSize={3}>{video.description}</Text>}
          </Box>
          <Box mx="auto" />
          {withDeleteButton && (
            <DeleteButton onDelete={onDelete} video={video} />
          )}
        </Flex>
      </Card>
    </Box>
  );
};

export default Video;
