
const findReps = (query) => {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
        resolve({
            senator: {
                name: "Test Senator"
            },
            representative: {
                name: "Test Representative"
            }
        });}, 2000);
    });
};

export default { findReps };
