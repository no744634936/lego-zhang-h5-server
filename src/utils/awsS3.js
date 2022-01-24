/**
 * @description 操作 AWS s3 的一些方法
 * @author zhang
 *-------------------
 * npm install aws-sdk --save
 */
const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')
// 现在prd跟prd_dev用的是同一个s3,正式开发的时候两个环境下的s3应该分开
const { awsS3Conf } = require('../config/index')

AWS.config.update({
    accessKeyId: awsS3Conf.accessKeyId,
    secretAccessKey: awsS3Conf.secretAccessKey,
    region: awsS3Conf.region,
})

const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
const BucketName = 'lego-test-bucket'

// 上传文件的方法
const uploadFile = async (storePath, filePath) => {
    // 必须用同步方法，因为下面的代码必须要用到fileContent
    const fileContent = fs.readFileSync(filePath)

    // 上传的如果是大文件的话就要用fs.createReadStream 来做了
    // const fileContent = fs.createReadStream(filePath)

    const bucketParams = {
        Bucket: BucketName, // 例如: lego-test-bucket/
        Key: storePath, // 文件存放的路径，lego-test-bucket 下的 h5-assets-zhang/style.xxx.js
        Body: fileContent,
    }

    try {
        // 以后可以查找一下是否可以用stream 来上传，阿里云oss有stream的上传方式
        const result = await s3.upload(bucketParams).promise()
        return result.Location // s3上面的文件的url
    } catch (err) {
        console.error('AWS s3 上传错误', err)
        // todo 发送邮件报警
        throw new Error('AWS s3 上传错误')
    }
}

module.exports = {
    uploadFile,
}
