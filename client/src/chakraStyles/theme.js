import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import Button from './button.js';
import Input from './input.js';

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        // color: mode('#27292d','white')(props),
        // bg: mode('white','#27292d')(props),
        color: mode('gray.700', 'gray.200')(props),
        bg: mode('gray.100', '#27292d')(props),
      },

      // a: {
      //   _hover: {
      //     textDecoration: 'none',
      //   },
      //   _active: {
      //     borderBottom: '3px solid #FFAB24',
      //     color: '#FFAB24',
      //     fontWeight: 800,
      //   },
      // },
    }),
  },
  colors: {
    primary: '#FFAB24',
    secondary: 'white',
  },
  components: {
    Button,
    Input,
  },
});

export default theme;
