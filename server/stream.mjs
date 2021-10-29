import { pipeline, Readable } from 'stream'
import { promisify } from 'util'
import { readFileSync, createWriteStream } from 'fs'

const pipelineAsync = promisify(pipeline)

const readableStream = Readable({
    read() {
        this.push(readFileSync('in.mp4'))
        this.push(null)
    }
})

await pipelineAsync(
    readableStream,
    createWriteStream('../web/out.mp4')
)

console.log('Finish')
