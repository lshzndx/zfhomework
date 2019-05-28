/**
 * 带有缓存功能的静态服务器
 * by liushuai
 */
const http = require('http')
const path = require('path')
const fs = require('mz/fs')
const url = require('url')
const mime = require('mime')
const crypto = require('crypto')

const server = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'max-age=10')
  const {pathname} = url.parse(req.url)
  let realPath = path.join(__dirname, pathname)
  try{
    const stat = await fs.stat(realPath)
    const ifNoneMatch = req.headers['if-none-match']
    if (stat.isDirectory()) 
      realPath = path.join(realPath, 'index.html')
    const content = await fs.readFile(realPath)
    const sign = crypto.createHash('md5').update(content).digest('base64')
    if (sign === ifNoneMatch) {
      res.statusCode = 304
      return res.end()
    }
    res.setHeader('Etag', sign)
    res.setHeader('Content-Type', `${mime.getType(realPath)};charset='utf8'`)
    res.end(content)
  }catch(e) {
    res.statusCode = 404
    res.end('Not found')
  }
})

server.listen(3000)

