import { extendTheme } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";
import {Button} from './button'

export const theme = extendTheme({
  config:{
    initialColorMode:'system',
    useSystemColorMode:true,
  },
  styles:{
    global: props => ({
      body: {
        color: mode('white','#27292d')(props),
        bg: mode('#27292d', 'white')(props),
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
    Button
  },
})