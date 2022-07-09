import { useState } from 'react';
import { Text } from '@chakra-ui/react';

function ReadMore({ text }) {
  const [readMore, setreadMore] = useState(false);
  const handleClick = () => {
    setreadMore(!readMore);
  };
  return (
    <>
      {readMore ? text : text.substring(0, 300)}
      {readMore ? <Text color="blue.500" onClick={handleClick}>...Read Less</Text>
        : <Text color="blue.500" onClick={handleClick}>...Read More</Text>}
    </>
  );
}

export default ReadMore;
