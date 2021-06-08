import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = false }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Kauan Polydoro</Text>
          <Text color="gray.300" fontSize="small">
            kauan.polydoro@teste.com
            </Text>
        </Box>
      )}

      <Avatar size="md" name="Kauan Polydoro" src="https://github.com/kauanpolydoro.png" />
    </Flex>
  )
}