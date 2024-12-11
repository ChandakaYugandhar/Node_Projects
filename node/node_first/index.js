const http=require("http");
const server=http.createServer((req,res)=>{
    console.log(req.url);
    res.end("hello world");
});
server.listen(4000,()=>{
    console.log("server is runnng on port 4000");
})