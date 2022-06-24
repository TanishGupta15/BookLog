export const Button={
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform:'none',
    borderRadius: '5px',
    _hover:{
      boxShadow:'md'
    },
  },
  variants: {
    solid: {
      backgroundColor:'primary',
      color: 'secondary',
      _hover:{
        backgroundColor:'#f39c12'
      },
    },
    outline: {
      backgroundColor:'transparent',
      border: '2px solid',
      borderColor: 'primary',
      color: 'primary',
      transition: 'all 200ms ease',
      _hover:{
        backgroundColor: 'primary',
        color: 'secondary',
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    // size: 'md',
    // variant: 'solid',
    colorScheme:'primary',
  },
}