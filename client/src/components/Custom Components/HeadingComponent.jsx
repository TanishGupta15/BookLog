import { Text, Heading } from "@chakra-ui/react";

const HeadingComponent = ({HeadingText}) => {
  return (
    <Heading
      lineHeight={1.1}
      fontWeight={600}
      mb={10}
      fontSize={{ base: '4xl', md: '5xl' }}>

      <Text
        as={'span'}
        position={'relative'}
        _after={{
          content: "''",
          width: '95%',
          height: '7%',
          position: 'absolute',
          bottom: 1,
          right: -5,
          bg: '#ffab24',
          zIndex: -1,
          borderRadius: '5px'
        }} >
        {HeadingText}
      </Text>
    </Heading>
  )
}

export default HeadingComponent