import React from "react";

function useDelay(fun, timeout=1000) {
    React.useEffect(() => {
        const timer = setTimeout(fun, timeout);

        return () => clearTimeout(timer)
    },[])
}


export default useDelay;