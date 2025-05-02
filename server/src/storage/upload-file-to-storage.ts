import { Upload } from '@aws-sdk/lib-storage'
import { Readable } from 'node:stream'
import { z } from 'zod'
import { env } from '../env.ts'
import { type Either, makeLeft, makeRight } from '../shared/either.ts'
import { AppError, AppErrorCode } from '../shared/errors.ts'
import { r2 } from './client.ts'

const uploadFileToStorageInput = z.object({
  folder: z.string(),
  fileName: z.string(),
  fileFormat: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>

export async function uploadFileToStorage(input: UploadFileToStorageInput): Promise<Either<AppError, { reportUrl: string }>> {
  const { contentStream, contentType, fileName, fileFormat, folder } =
    uploadFileToStorageInput.parse(input)

  const sanitizedFileName = fileName.replace(
    /[^a-zA-Z0-9]/g,
    ''
  )

  const pathToFile = `${folder}/${sanitizedFileName}.${fileFormat}`

  if (!env.CLOUDFLARE_BUCKET_NAME || !env.CLOUDFLARE_BUCKET_URL) {
    return makeLeft(new AppError(AppErrorCode.CLOUDFLARE_CONFIGURATION_NOT_SET))
  }

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

  return makeRight({
    reportUrl: new URL(pathToFile, env.CLOUDFLARE_BUCKET_URL).href,
  })
}
