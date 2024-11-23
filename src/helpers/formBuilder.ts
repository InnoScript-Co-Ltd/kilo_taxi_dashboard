import { z, ZodSchema, ZodObject } from "zod";
// Type guard to check if a value is a File
const isFile = (value: any): value is File => value instanceof File;

// Type guard to check if a value is a FileList
const isFileList = (value: any): value is FileList => value instanceof FileList;

// Generic formBuilder function that accepts payload and schema, handling files dynamically
// Adjusted formBuilder function
export const formBuilder = <T extends ZodSchema<any>>(
  payload: z.infer<T>,
  schema: ZodObject<any>
): FormData => {
  const formData = new FormData();

  // Iterate through the schema's shape keys
  for (const key of Object.keys(schema.shape)) {
    const value :any = payload[key as keyof z.infer<T>];

    if (isFileList(value)) {
      formData.append(key, value[0]); // Handle FileList
    } else if (isFile(value)) {
      formData.append(key, value); // Handle single File
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString()); // Convert Date to ISO string
    } else if (value != null) {
      formData.append(key, value); // Append other types as string
    }
  }

  return formData;
};
