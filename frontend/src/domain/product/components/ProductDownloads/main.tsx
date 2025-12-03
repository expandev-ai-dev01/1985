import { FileIcon, DownloadIcon } from 'lucide-react';
import { Button } from '@/core/components/button';
import type { DownloadableFile } from '../../types';

interface ProductDownloadsProps {
  files: DownloadableFile[];
}

export function ProductDownloads({ files }: ProductDownloadsProps) {
  if (!files.length) return null;

  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold">Downloads</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file, index) => (
          <div
            key={index}
            className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-primary/10 size-10 flex shrink-0 items-center justify-center rounded-lg">
                <FileIcon className="text-primary size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.fileName}</p>
                <p className="text-muted-foreground text-xs">
                  {file.fileType} • {file.fileSize}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild className="shrink-0">
              <a href={file.fileUrl} download target="_blank" rel="noopener noreferrer">
                <DownloadIcon className="size-4" />
                <span className="sr-only">Download {file.fileName}</span>
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
