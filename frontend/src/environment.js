let IS_PROD = true;
const server = IS_PROD ?
    "https://keepnote-backend-h4go.onrender.com" :
    "http://localhost:3000"
export default server;