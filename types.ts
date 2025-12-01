export enum TranscriptionStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface TranscriptionResult {
  text: string;
  fileName: string;
  timestamp: Date;
}

export interface FileData {
  file: File;
  base64: string;
  mimeType: string;
}
