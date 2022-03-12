export interface TutorialModel {
    _id: string;
    title: string;
    creator:any;
    tags:string[];
    LikedBy:string[];
    DislikedBy:string[];
    file: string;
    file_type: string;
    thumbnail: string;
    UploadedAt: Date;
    description: string;
 }

