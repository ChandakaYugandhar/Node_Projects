const fs = require('fs');
// let data=fs.readFileSync('./example.txt','utf-8',);
// console.log(data);
// let data=fs.readFile('./example.txt','utf-8',(err,data)=>{
//     console.log(err);
//     console.log(data)
// })
// fs.writeFileSync('./example.txt','Hi this is nodejs file system');
// let data=fs.readFile('./example.txt','utf-8',(err,data)=>{
//     console.log(data);
// })
// fs.appendFile('./example.txt','\tThis is node.js file system',(err)=>{
//     console.log(err);
// })

//******************************************************************************* */


const http=require('http');
const url=require('url');

http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,PATCH,DELETE,OPTIONS")

 // handling options preflight request which comes before post,put and delete automically 
    if(req.method=="OPTIONS")
    {
        res.end();
    }
    let parsedUrl=url.parse(req.url,true);
    // console.log(parsedUrl);
    // console.log(req.method);
    // res.end("Hello Welcome");
    // if(req.url==="/product" && req.method=="GET")
    // {
    //     res.end("Getting Products Data");
    // }
    // else if(req.url==='/product' && req.method == 'POST'){
    //     res.end("Product Created Successfully");

    // }
    // else if(req.url==='/product' && req.method=='PUT'){
    //     res.end("Product Updated Successfully");
    // }
    // else if(req.url==='/product' && req.method == 'DELETE'){
    //     res.end("Product Deleted Successfully");
    // }
    let products=fs.readFileSync('./products.json','utf-8')
    if(parsedUrl.pathname=='/products' && req.method=='GET' && parsedUrl.query.id==undefined)
    {
        res.end(products);
    }
    else if(parsedUrl.pathname=='/products' && req.method=='GET' && parsedUrl.query.id!=undefined)
    {
        let productsArray=JSON.parse(products);
        let product=productsArray.find((prod)=>{
            return prod.id==parsedUrl.query.id

        })
        if(product!=undefined){
            res.end(JSON.stringify(product));
        }
        else{
            res.end(JSON.stringify({'message':'Product not found'}));
        }
    }
 //Creating New Porduct

    else if(parsedUrl.pathname=='/products' && req.method=='POST'){
        let product="";
        req.on("data",(chunk)=>{
            product+=chunk;

        })
        req.on("end",()=>{
            let productsArray=JSON.parse(products);
            let newPorduct=JSON.parse(product);
            productsArray.push(newPorduct);
            fs.writeFile("./products.json",JSON.stringify(productsArray),(err)=>{
                if(err==null){
                    res.end(JSON.stringify({'Message':'New Product Created Scuccfully'}))
    
                }
                else{
                    res.end(JSON.stringify({'Message':'Some Problem'}))
                }
            })
        })
    }

 //Update the product based on the id

 else if(req.method=="PUT" && parsedUrl.pathname=="/products")
    {
        res.end("Product Updated");
    
        let product="";

        req.on("data",(chunk)=>{
            product+=chunk;
        })

        req.on("end",()=>{

            let productsArray=JSON.parse(products);
            let productOBJ = JSON.parse(product);

            let index = productsArray.findIndex((product)=>{
                return product.id==parsedUrl.query.id;
            })
                productsArray[index]=productOBJ;

                fs.writeFile("./products.json",JSON.stringify(productsArray),(err)=>{
                    if(err==null)
                    {
                        res.end(JSON.stringify({"message":"Product successfully updated"}))
                    }
                    else 
                    {
                        res.end(JSON.stringify({"message":"Some problem"}))
                    }
                })


        })

    }

//Delete Product based on id

else if(req.method=='DELETE' && parsedUrl.pathname=='/products'){
    let productsArray=JSON.parse(products);
    let index=productsArray.findIndex((prod)=>{
        return prod.id==parsedUrl.query.id
    })
    if(index!==-1){
        productsArray.splice(index,1);
        fs.writeFile('./products.json',JSON.stringify(productsArray),(err)=>{
            if(err==null){
                res.end(JSON.stringify({"Message":"Poduct Deleted Successfully"}))
            }
            else{
                res.end(JSON.stringify({"Message":"Product Not Deleted"}))
            }
        })
    }
    else{
        res.end(JSON.stringify({"Message":"Product Id not Found"}))
    
    }
}
    
}).listen(8000)