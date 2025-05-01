import React from 'react';

// Taken from the “Custom Hooks” exercise:
// https://courses.joshwcomeau.com/joy-of-react/03-hooks/06.01-custom-hook-exercises

function useToggle(initialValue = false) {
  if (typeof initialValue !== 'boolean') {
    console.warn('Invalid type for useToggle');
  }
  
  const [value, setValue] = React.useState(
    initialValue
  );

  const toggleValue = React.useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  return [value, toggleValue, setValue];
}

export default useToggle;