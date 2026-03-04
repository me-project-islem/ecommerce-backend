import { UploadApiResponse } from 'cloudinary';
export declare class UploadService {
    constructor();
    uploadImage(file: Express.Multer.File, folder?: string): Promise<UploadApiResponse>;
    deleteImage(publicId: string): Promise<void>;
}
