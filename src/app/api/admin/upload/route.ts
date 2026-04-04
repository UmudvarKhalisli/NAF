import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { verifyAdminToken } from '@/lib/auth/admin-auth'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File
  const folder = (formData.get('folder') as string) || 'naf'
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const resourceType = file.type.startsWith('video/') ? 'video' : 'image'
  
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: `naf/${folder}`, resource_type: resourceType },
        (err, result) => err ? reject(err) : resolve(result)
      ).end(buffer)
    })
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}