import { NextResponse } from 'next/server';
import cloudinary from '@/libs/cloudinary';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = new formidable.IncomingForm({ keepExtensions: true });

  return new Promise((resolve) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error al procesar el archivo", err);
        return resolve(NextResponse.json({ error: "Error al procesar el archivo" }, { status: 500 }));
      }

      try {
        const file = files.file[0];
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "profile_pictures",
        });

        return resolve(NextResponse.json({ url: result.secure_url }, { status: 200 }));
      } catch (uploadErr) {
        console.error("Error al subir la imagen", uploadErr);
        return resolve(NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 }));
      }
    });
  });
}
