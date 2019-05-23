/**
 * buffer中concat方法
 * by liushuai
 */

// 第一版
Buffer.concat = function(bufferArray) {
  let len = bufferArray.reduce((len, current) => (len + current.length), 0)
  let newBuffer = Buffer.alloc(len)
  let index = 0
  bufferArray.forEach((buffer) => {
    for(let i = 0; i < buffer.length; i++)
      newBuffer[index++] = buffer[i]
  })
  return newBuffer
}

// 第二版
Buffer.concat = function(bufferArray) {
  let index = 0
  let arr = []
  bufferArray.forEach(buffer => {
    for(let i = 0; i < buffer.length; i++) 
      arr[index++] = buffer[i]
  })
  return Buffer.from(arr)
}

let b1 = Buffer.from('珠')
let b2 = Buffer.from('峰')
let b3 = Buffer.concat([b1, b2])
console.log(b3.toString());

