import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUpload } from './dto/upload-image.input';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(private readonly dbServie: PrismaService) {}

  async uploadImg(file: FileUpload, userId: string) {
    try {
      return new Promise((resolve, reject) => {
        const dirPath = join(__dirname, '../../uploads');
        file
          .createReadStream()
          .pipe(fs.createWriteStream(`${dirPath}/${file.filename}`))
          .on('finish', async () => {
            console.log('IMAGE_CREATED_IN_DIRECTORY');
            await this.dbServie.user.update({
              where: {
                id: userId,
              },
              data: {
                image: `${dirPath}/${file.filename}`,
              },
            });
            resolve(true);
          })
          .on('error', (error) => {
            console.log('IMAGE_UPLOAD_ERROR', error);
            reject(false);
          });
      });
    } catch (err) {}
  }

  findAll() {
    return '';
  }

  async getProfile(id: string) {
    try {
      const user = await this.dbServie.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (err) {
      throw new HttpException(
        {
          message: err.message || 'Failed to get user profile',
          devMessage: err,
        },
        400,
      );
    }
  }
}
