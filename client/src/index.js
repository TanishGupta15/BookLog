import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {theme} from './chakraStyles/theme.js'




const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
    </ChakraProvider>
);
