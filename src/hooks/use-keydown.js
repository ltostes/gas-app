import React from "react";

function useKeyDown(key, callback) {

    React.useEffect(() => {
        function handleKeyDown(event) {
          if (event.code === key) {
            callback(); // Or the effect you want
          }
        }
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
}

export default useKeyDown;