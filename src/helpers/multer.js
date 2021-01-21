import multer from 'multer'

let storage = multer.memoryStorage()
let readFileBuffer = multer({ storage })

export default readFileBuffer
