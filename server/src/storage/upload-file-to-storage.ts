import { Upload } from '@aws-sdk/lib-storage'
import { Readable } from 'node:stream'
import { z } from 'zod'
import { env } from '../env.ts'
import { r2 } from './client.ts'

const uploadFileToStorageInput = z.object({
  folder: z.string(),
  fileName: z.string(),
  fileFormat: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { contentStream, contentType, fileName, fileFormat, folder } =
    uploadFileToStorageInput.parse(input)

  const sanitizedFileName = fileName.replace(
    /[^a-zA-Z0-9]/g,
    ''
  )

  const pathToFile = `${folder}/${sanitizedFileName}.${fileFormat}`

  const upload = new Upload({
    client: r2,
    params: {
      Key: pathToFile,
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  return {
    url: new URL(pathToFile, env.CLOUDFLARE_BUCKET_URL).href,
  }
}
