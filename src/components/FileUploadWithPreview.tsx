import React, { useEffect, useState } from "react";
import { FormHelperText, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
interface FileUploadWithPreviewProps {
  onFileChange: (file?: File) => void;
  error?: string;
  field?: string;
  src?: string;
}

function FileUploadWithPreview({
  onFileChange,
  error,
  field,
  src
}: FileUploadWithPreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
      
        const blobURL = URL.createObjectURL(file);
        setPreview(blobURL);
        onFileChange(file); // Pass file to parent component (Controller)
      } else {
        onFileChange(undefined);
      }
  };

  useEffect(() => {
    if (src) {
      setPreview(src)
    }
  }, [src])

  return (
    <div>
      {preview && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", maxWidth: "300px", height: "150px" }}
          />
        </div>
      )}

      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
      >
        {field ? field : "File Upload"}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Button>

      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
}

export default FileUploadWithPreview;
