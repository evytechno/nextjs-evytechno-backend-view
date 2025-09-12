export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // includes "data:image/png;base64,...."
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });

export const convertToFormData = (obj: Record<string, object>): FormData => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value); // for file upload
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value)); // handle nested object
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
