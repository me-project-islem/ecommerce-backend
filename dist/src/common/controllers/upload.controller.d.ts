import { UploadService } from '../services/upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    upload(file: Express.Multer.File): Promise<{
        url: string;
        public_id: string;
        raw: import("cloudinary").UploadApiResponse;
    }>;
}
