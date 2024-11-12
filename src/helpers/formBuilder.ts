import { z, ZodSchema } from "zod";

// Type guard to check if a value is a File
const isFile = (value: any): value is File => value instanceof File;

// Type guard to check if a value is a FileList
const isFileList = (value: any): value is FileList => value instanceof FileList;

// Generic formBuilder function that accepts payload and schema, handling files dynamically
export const formBuilder = <T extends ZodSchema<any>>(payload: z.infer<T>, schema: z.ZodObject<any>) => {
  const formData = new FormData();

  // Loop over each field in the schema shape and handle based on payload type
  for (const key of Object.keys(schema.shape)) {
    const value = payload[key as keyof z.infer<T>];

    if (isFileList(value)) {
      // Append the first file if it's a FileList
      formData.append(key, value[0]);
    } else if (isFile(value)) {
      // Append directly if it's a single File
      formData.append(key, value);
    } else if (value != null) {
      // For all other values, append as a string
      formData.append(key, String(value));
    }
  }

  return formData;
};
