export interface UploadedFile {
  key: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export class FileUploadService {
  private isAmplifyConfigured(): boolean {
    return !!(import.meta.env.VITE_AWS_S3_BUCKET && import.meta.env.VITE_AWS_IDENTITY_POOL_ID);
  }

  async uploadFile(file: File, orderId: string): Promise<UploadedFile> {
    try {
      // Generate a unique key for the file
      const timestamp = Date.now();
      const key = `orders/${orderId}/${timestamp}-${file.name}`;
      
      if (this.isAmplifyConfigured()) {
        // Use Amplify Storage when configured
        const { uploadData } = await import('aws-amplify/storage');
        const result = await uploadData({
          key,
          data: file,
          options: {
            accessLevel: 'guest',
            contentType: file.type,
          },
        }).result;

        return {
          key: result.key,
          name: file.name,
          size: file.size,
          type: file.type,
        };
      } else {
        // Fallback to local storage simulation for development
        return {
          key,
          name: file.name,
          size: file.size,
          type: file.type,
        };
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  async getFileUrl(key: string): Promise<string> {
    try {
      if (this.isAmplifyConfigured()) {
        const { getUrl } = await import('aws-amplify/storage');
        const result = await getUrl({
          key,
          options: {
            accessLevel: 'guest',
            expiresIn: 3600, // 1 hour
          },
        });
        return result.url.toString();
      } else {
        // Fallback for development
        return `#file-${key}`;
      }
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw new Error('Failed to get file URL');
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      if (this.isAmplifyConfigured()) {
        const { remove } = await import('aws-amplify/storage');
        await remove({
          key,
          options: {
            accessLevel: 'guest',
          },
        });
      }
      // In development mode, just log the deletion
      console.log('File would be deleted:', key);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const fileUploadService = new FileUploadService();