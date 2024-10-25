import { useEffect } from "react";

export const useUpdateTimeInterval = (updateTimeCallback, interval = 10 * 60 * 1000) => {
    useEffect(() => {
        const intervalId = setInterval(updateTimeCallback, interval);
        return () => clearInterval(intervalId);
    }, [updateTimeCallback, interval]);
};