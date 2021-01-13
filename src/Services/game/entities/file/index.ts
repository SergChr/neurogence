import { Skills } from '../hosts/localhost';

export enum FileExtensions {
  Blank = '',
  Txt = '.txt',
  Bin = '.bin',
  C = '.c',
  Email = '.eml',
}

const calcFileSize = (s: string): number => {
  return (encodeURI(s).split(/%..|./).length - 1) / 1024; // in KiB
}

interface CreationPayload extends Omit<File, 'size' | 'extension' | 'content' | 'isRead'> {
  content?: string;
  size?: number;
  extension?: FileExtensions;
  isRead?: boolean;
}

export class File {
  constructor(p: CreationPayload) {
    this.name = p.name;
    this.content = p.content || '';
    this.values = p.values;
    this.isRead = p.isRead || false;
    this.size = p.size || calcFileSize(p.content || '');
    this.extension = p.extension || FileExtensions.Blank;
    this.onRead = p.onRead;
  }

  name: string;
  content: string;
  values: Skills;
  isRead: boolean; // is the file already read?
  size: number; // (KiB)
  extension: FileExtensions;
  onRead?: Function;
}
