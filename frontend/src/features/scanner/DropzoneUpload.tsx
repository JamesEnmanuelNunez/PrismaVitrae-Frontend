import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from '../../components/ui/Icon';

interface DropzoneUploadProps {
  onDrop: (files: File[]) => void;
}

export function DropzoneUpload({ onDrop }: DropzoneUploadProps) {
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="w-full bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-16 cursor-pointer hover:border-primary hover:bg-surface-container-low transition-all duration-200 group"
    >
      <input {...getInputProps()} />
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon name="upload_file" filled size={32} className="text-primary" />
      </div>
      <h3 className="font-headline-md text-[24px] leading-[32px] tracking-[-0.01em] text-on-surface text-center mb-2">
        Arrastre archivos aquí
      </h3>
      <p className="font-body-md text-[16px] leading-[24px] text-secondary text-center mb-4">
        o haga clic para seleccionar de su computadora
      </p>
      <div className="flex gap-2">
        <span className="px-2 py-1 bg-surface-container rounded font-code-sm text-[13px] leading-[18px] text-on-surface-variant">
          .PDF
        </span>
        <span className="px-2 py-1 bg-surface-container rounded font-code-sm text-[13px] leading-[18px] text-on-surface-variant">
          .PNG
        </span>
        <span className="px-2 py-1 bg-surface-container rounded font-code-sm text-[13px] leading-[18px] text-on-surface-variant">
          .JPG
        </span>
      </div>
    </div>
  );
}
