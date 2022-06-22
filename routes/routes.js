const aws = require('aws-sdk');
const route = require("koa-router");
const fs = require("fs");
const { resolve } = require('path');
const { rejects } = require('assert');
const Router = new route();

Router.get("/test", async(ctx) => {
    console.log("test path /test");
    ctx.body = "respond from /test";
});
Router.post("/test", async(ctx) => {
    console.log("test path post /test");
    ctx.body = "respond from post /test";
});
Router.get("/getfilefroms3", async(ctx) => {
    ctx.status = 200
    var params = { Bucket: 'share-bucket-temp', Key: ctx.query.filename };
    data = await getFileFromS3(params)
        //console.log(data)
    ctx.set('ContentType', data.ContentType)
    console.log(params.Key)
    var filename = "attachment; filename=" + params.Key
    ctx.response.set("content-disposition", filename);
    //ctx.attachment = params.Key;
    ctx.body = data.Body
})
Router.get("/getfile", async(ctx) => {
    try {

        const filename = ctx.query.filename
        const data = fs.createReadStream('./asset/' + filename, { encoding: 'utf8' });
        var filename_cmd = "attachment; filename=" + filename
        ctx.response.set("content-disposition", filename_cmd);
        ctx.body = data
        ctx.status = 200
    } catch (e) {
        ctx.status = 404
        console.log(e.message)
    }
})

async function getFileFromS3(params) {
    return new Promise((resolve, reject) => {
        try {
            const s3 = new aws.S3({
                secretAccessKey: 'KKT41dZDZExYlX+uYpXQDP6YcKGkbnu/FIzjHZsA',
                accessKeyId: 'AKIAVBDQMBLDGKBKULZ7'
            });


            s3.getObject(params, function(err, data) {

                if (err != null) { console.log("Error GetObject:".err) }

                try {
                    // console.log("In promise ")
                    // console.log(data)
                    resolve(data)
                } catch (e) {
                    console.log("Error Log s3 get object pass secction:".e.message)
                }
            })
        } catch (e) {
            console.log("Error Log function getFileFromS3 :".e.message)
        }
    });

}
module.exports = Router;