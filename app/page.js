'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 1280;
    canvas.height = 720;

    let frame = 0;
    const totalFrames = 300; // 10 seconds at 30fps
    const speech = "Tired of searching for the perfect gift? We have the ideal solution for you.";

    // Phoneme timing for lip sync (approximate timing in frames)
    const lipSyncData = [
      { start: 30, end: 35, shape: 'T' },
      { start: 35, end: 42, shape: 'AI' },
      { start: 42, end: 48, shape: 'ER' },
      { start: 48, end: 52, shape: 'D' },
      { start: 55, end: 60, shape: 'O' },
      { start: 60, end: 64, shape: 'F' },
      { start: 68, end: 75, shape: 'ER' },
      { start: 75, end: 80, shape: 'CH' },
      { start: 80, end: 86, shape: 'ING' },
      { start: 90, end: 96, shape: 'F' },
      { start: 96, end: 100, shape: 'O' },
      { start: 100, end: 104, shape: 'R' },
      { start: 108, end: 112, shape: 'TH' },
      { start: 112, end: 116, shape: 'E' },
      { start: 120, end: 126, shape: 'ER' },
      { start: 126, end: 132, shape: 'F' },
      { start: 132, end: 138, shape: 'EH' },
      { start: 138, end: 142, shape: 'K' },
      { start: 142, end: 146, shape: 'T' },
      { start: 150, end: 158, shape: 'IH' },
      { start: 158, end: 162, shape: 'F' },
      { start: 162, end: 166, shape: 'T' },
      { start: 175, end: 182, shape: 'W' },
      { start: 182, end: 186, shape: 'EE' },
      { start: 190, end: 196, shape: 'H' },
      { start: 196, end: 202, shape: 'AH' },
      { start: 202, end: 206, shape: 'V' },
      { start: 210, end: 214, shape: 'TH' },
      { start: 214, end: 218, shape: 'E' },
      { start: 222, end: 230, shape: 'AI' },
      { start: 230, end: 238, shape: 'D' },
      { start: 238, end: 244, shape: 'EE' },
      { start: 244, end: 250, shape: 'L' },
      { start: 254, end: 262, shape: 'O' },
      { start: 262, end: 270, shape: 'L' },
      { start: 270, end: 278, shape: 'OO' },
      { start: 278, end: 286, shape: 'SH' },
      { start: 286, end: 292, shape: 'N' },
      { start: 295, end: 300, shape: 'closed' },
    ];

    function getMouthShape(frame) {
      for (let phoneme of lipSyncData) {
        if (frame >= phoneme.start && frame <= phoneme.end) {
          return phoneme.shape;
        }
      }
      return 'closed';
    }

    function drawCharacter(ctx, progress, mouthShape) {
      // Clear canvas
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate position (walking towards camera effect - scaling up)
      const scale = 0.4 + (progress * 0.6); // Scale from 0.4 to 1.0
      const yOffset = 100 - (progress * 50); // Move up slightly
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + yOffset;

      // Apply transformation
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);

      // Excited animation - slight bounce
      const bounce = Math.sin(progress * Math.PI * 8) * 5;
      ctx.translate(0, bounce);

      // Body
      ctx.fillStyle = '#FF69B4';
      ctx.beginPath();
      ctx.ellipse(0, 80, 60, 90, 0, 0, Math.PI * 2);
      ctx.fill();

      // Arms (excited pose - slightly raised)
      const armWave = Math.sin(progress * Math.PI * 6) * 10;

      // Left arm
      ctx.strokeStyle = '#FFB6C1';
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(-50, 50);
      ctx.lineTo(-90 + armWave, 80);
      ctx.stroke();

      // Right arm
      ctx.beginPath();
      ctx.moveTo(50, 50);
      ctx.lineTo(90 - armWave, 80);
      ctx.stroke();

      // Head
      ctx.fillStyle = '#FFD4A3';
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.arc(0, -20, 85, Math.PI, Math.PI * 2);
      ctx.fill();

      // Hair bangs
      ctx.beginPath();
      ctx.ellipse(-30, -40, 25, 35, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(30, -40, 25, 35, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Eyes (excited wide eyes)
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(-25, -10, 18, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(25, -10, 18, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pupils
      ctx.fillStyle = '#4A90E2';
      ctx.beginPath();
      ctx.arc(-25, -10, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(25, -10, 10, 0, Math.PI * 2);
      ctx.fill();

      // Eye highlights
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-22, -14, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(28, -14, 4, 0, Math.PI * 2);
      ctx.fill();

      // Eyebrows (excited expression)
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-45, -35);
      ctx.lineTo(-10, -30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(45, -35);
      ctx.lineTo(10, -30);
      ctx.stroke();

      // Nose
      ctx.strokeStyle = '#D2A679';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(-5, 20);
      ctx.stroke();

      // Mouth with lip sync
      ctx.fillStyle = '#FF6B8A';
      ctx.strokeStyle = '#D4506B';
      ctx.lineWidth = 2;

      if (mouthShape === 'closed' || mouthShape === 'rest') {
        // Closed/rest mouth - smile
        ctx.beginPath();
        ctx.arc(0, 35, 25, 0.2, Math.PI - 0.2);
        ctx.stroke();
      } else if (mouthShape === 'O' || mouthShape === 'OO') {
        // O sound - round mouth
        ctx.beginPath();
        ctx.ellipse(0, 40, 12, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (mouthShape === 'AI' || mouthShape === 'AH') {
        // AI/AH sound - wide open mouth
        ctx.beginPath();
        ctx.ellipse(0, 40, 20, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (mouthShape === 'EE' || mouthShape === 'E') {
        // EE/E sound - wide smile
        ctx.beginPath();
        ctx.ellipse(0, 40, 25, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (mouthShape === 'F' || mouthShape === 'V') {
        // F/V sound - bottom lip tucked
        ctx.beginPath();
        ctx.moveTo(-15, 35);
        ctx.lineTo(15, 35);
        ctx.stroke();
        ctx.fillRect(-12, 38, 24, 6);
      } else if (mouthShape === 'M' || mouthShape === 'P' || mouthShape === 'B') {
        // M/P/B sound - lips together
        ctx.fillStyle = '#FF6B8A';
        ctx.fillRect(-18, 38, 36, 6);
      } else if (mouthShape === 'TH') {
        // TH sound - tongue visible
        ctx.beginPath();
        ctx.ellipse(0, 40, 18, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Tongue
        ctx.fillStyle = '#FFB6C1';
        ctx.fillRect(-3, 40, 6, 8);
      } else if (mouthShape === 'W' || mouthShape === 'OO') {
        // W sound - pursed lips
        ctx.beginPath();
        ctx.ellipse(0, 40, 10, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (mouthShape === 'L' || mouthShape === 'N') {
        // L/N sound - tongue at roof
        ctx.beginPath();
        ctx.ellipse(0, 42, 15, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (mouthShape === 'R' || mouthShape === 'ER') {
        // R/ER sound - rounded
        ctx.beginPath();
        ctx.ellipse(0, 40, 14, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (mouthShape === 'S' || mouthShape === 'SH' || mouthShape === 'CH') {
        // S/SH/CH sound - narrow opening
        ctx.beginPath();
        ctx.ellipse(0, 40, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (mouthShape === 'T' || mouthShape === 'D' || mouthShape === 'K') {
        // T/D/K sound - teeth together
        ctx.beginPath();
        ctx.ellipse(0, 40, 16, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        // Default - slightly open
        ctx.beginPath();
        ctx.ellipse(0, 40, 15, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();

      // Display subtitle
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      const words = speech.split(' ');
      let displayText = '';
      const wordsPerFrame = speech.length / totalFrames;
      const currentChar = Math.floor(frame * wordsPerFrame);
      displayText = speech.substring(0, currentChar);

      if (frame >= 20 && frame <= 290) {
        ctx.strokeText(displayText, canvas.width / 2, canvas.height - 50);
        ctx.fillText(displayText, canvas.width / 2, canvas.height - 50);
      }
    }

    function animate() {
      if (frame < totalFrames) {
        const progress = frame / totalFrames;
        const mouthShape = getMouthShape(frame);
        drawCharacter(ctx, progress, mouthShape);
        frame++;
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        // Loop animation
        frame = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    if (isPlaying) {
      animate();
    } else {
      // Draw initial frame
      drawCharacter(ctx, 0, 'closed');
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    // Reset canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      padding: '20px'
    }}>
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>Animated Video - Gift Solution</h1>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: '100%',
          border: '4px solid #333',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}
      />
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handlePlay}
          style={{
            padding: '12px 30px',
            fontSize: '18px',
            marginRight: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isPlaying ? 'Playing...' : 'Play Animation'}
        </button>
        <button
          onClick={handleStop}
          style={{
            padding: '12px 30px',
            fontSize: '18px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Stop
        </button>
      </div>
      <p style={{ color: '#888', marginTop: '20px', textAlign: 'center', maxWidth: '600px' }}>
        Watch as the character walks towards the camera with lip-synced animation saying:<br/>
        <em>&quot;Tired of searching for the perfect gift? We have the ideal solution for you.&quot;</em>
      </p>
    </div>
  );
}
