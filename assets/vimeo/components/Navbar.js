import React from "react";
import { Flex, Text, Box, Link } from "rebass";

const Navbar = ({ userData, onLoginPressed }) => (
  <Flex
    sx={{ borderRadius: "default" }}
    px={2}
    py={2}
    color="white"
    bg="secondary"
    alignItems="center"
  >
    <Text p={2} fontWeight="bold">
      Vimeo Uploader
    </Text>
    <Box mx="auto" />
    {userData && userData.id ? (
      <Text color="text" variant="caps">
        {userData.email} (id: {userData.id})
      </Text>
    ) : (
      <Link
        variant="nav"
        href="#!"
        onClick={e => {
          e.preventDefault();
          onLoginPressed();
        }}
      >
        Login
      </Link>
    )}
  </Flex>
);

export default Navbar;
