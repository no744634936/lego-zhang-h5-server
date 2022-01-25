/**
 * @description 静态资源上传到 AWS s3 上去
 * @author zhang
 *-------------------
 * npm install fs-extra --save
 */

const path = require('path')
const fse = require('fs-extra')
const { uploadFile } = require('../src/utils/awsS3')

const publicPath = path.resolve(__dirname, '..', 'src', 'public')
const uploadPath = 'h5-assets'

async function main() {
    // 获取 src/public 下的所有文件
    const publicFiles = fse.readdirSync(publicPath)
    const files = publicFiles.filter(f => f !== 'favicon.ico') // 不上传 favicon.ico

    // 挨个上传
    const res = await Promise.all(
        files.map(fileName => {
            const filePath = path.join(publicPath, fileName)
            const storePath = `${uploadPath}/${fileName}` // 例如 h5-assets/style.xxx.css
            return uploadFile(storePath, filePath)
        })
    )
    console.log('assets upload oss 上传成功', res)

    // 打印结果是这个样子的
    // assets upload oss 上传成功 [
    //     'https://lego-test-bucket.s3.ap-northeast-1.amazonaws.com/h5-assets/main.9d9222c4.js',
    //     'https://lego-test-bucket.s3.ap-northeast-1.amazonaws.com/h5-assets/style.287a5dc0.css'
    // ]
}

main()
