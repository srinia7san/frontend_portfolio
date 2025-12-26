import { downloadResumeFile } from "../api/api.js";

const downloadResume = async () => {
  try {
    const response = await downloadResumeFile();

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Srinivasan_resume_Chennai.pdf");
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Resume download failed:", error);
    alert("Failed to download");
  }
};

export default downloadResume;
