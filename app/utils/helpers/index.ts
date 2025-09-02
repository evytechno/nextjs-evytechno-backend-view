export const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // includes "data:image/png;base64,...."
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
      });
