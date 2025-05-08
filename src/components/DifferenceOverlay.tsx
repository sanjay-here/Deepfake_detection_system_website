import React, { useEffect, useRef } from "react";
import cv from "@techstark/opencv-js";

interface DifferenceOverlayProps {
  originalImage: string;
  testImage: string;
}

const DifferenceOverlay: React.FC<DifferenceOverlayProps> = ({ originalImage, testImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const [img1, img2] = await Promise.all([
          loadImage(originalImage),
          loadImage(testImage)
        ]);

        if (!canvasRef.current) return;

        const img1Mat = cv.imread(img1);
        const img2Mat = cv.imread(img2);

        // Resize images to match dimensions
        const width = Math.min(img1Mat.cols, img2Mat.cols);
        const height = Math.min(img1Mat.rows, img2Mat.rows);
        
        const resized1 = new cv.Mat();
        const resized2 = new cv.Mat();
        const dsize = new cv.Size(width, height);
        
        cv.resize(img1Mat, resized1, dsize, 0, 0, cv.INTER_AREA);
        cv.resize(img2Mat, resized2, dsize, 0, 0, cv.INTER_AREA);

        // Calculate absolute difference
        const diff = new cv.Mat();
        cv.absdiff(resized1, resized2, diff);

        // Enhance the difference visualization
        const enhancedDiff = new cv.Mat();
        cv.convertScaleAbs(diff, enhancedDiff, 2, 0);
        cv.applyColorMap(enhancedDiff, enhancedDiff, cv.COLORMAP_JET);

        // Overlay on original image
        const overlay = new cv.Mat();
        cv.addWeighted(resized1, 0.7, enhancedDiff, 0.3, 0, overlay);

        // Display result
        cv.imshow(canvasRef.current, overlay);

        // Cleanup
        [img1Mat, img2Mat, resized1, resized2, diff, enhancedDiff, overlay].forEach(mat => mat.delete());
      } catch (error) {
        console.error('Error processing images:', error);
      }
    };

    if (originalImage && testImage) {
      loadImages();
    }
  }, [originalImage, testImage]);

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full object-contain rounded-lg shadow-lg"
    />
  );
};

export default DifferenceOverlay;