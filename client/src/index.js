import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {theme} from './components/css/styles/theme'




const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
    </ChakraProvider>
);
