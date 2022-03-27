
const onEnter = (callback: (event: React.KeyboardEvent) => void) => {

    return (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            callback(e);
        }
    }
};

export default onEnter;