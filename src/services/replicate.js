import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REACT_APP_REPLICATE_API_TOKEN,
});

export const runLipSync = async (videoUrl, audioUrl) => {
  try {
    console.log("Running lip sync with:", { videoUrl, audioUrl });
    const output = await replicate.run(
      "tmappdev/lipsync:f21209234331014d7253fef53f5b44a5ae28a41cae14a3d67f5a872c503fe789",
      {
        input: {
          fps: 25,
          bbox_shift: 0,
          audio_input: audioUrl,
          video_input: videoUrl
        }
      }
    );
    return output;
  } catch (error) {
    console.error("Error running LipSync:", error);
    throw error;
  }
};

export const uploadFileToReplicate = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://api.replicate.com/v1/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REACT_APP_REPLICATE_API_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};