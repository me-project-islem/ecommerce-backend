import { UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadImage(file: Express.Multer.File, folder?: string): Promise<UploadApiResponse>;
    deleteImage(publicId: string): Promise<void>;
}
