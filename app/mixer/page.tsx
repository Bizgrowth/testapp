'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Download, Upload, Music, Video } from 'lucide-react';

export default function TurntableMixer() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [deck1Playing, setDeck1Playing] = useState(false);
  const [deck2Playing, setDeck2Playing] = useState(false);
  const [bassPlaying, setBassPlaying] = useState(false);
  const [crossfader, setCrossfader] = useState(50);
  const [deck1Volume, setDeck1Volume] = useState(75);
  const [deck2Volume, setDeck2Volume] = useState(75);
  const [bassVolume, setBassVolume] = useState(60);
  const [bassTempo, setBassTempo] = useState(120);
  const [deck1Speed, setDeck1Speed] = useState(100);
  const [deck2Speed, setDeck2Speed] = useState(100);
  const [deck1Rotation, setDeck1Rotation] = useState(0);
  const [deck2Rotation, setDeck2Rotation] = useState(0);
  const [deck1Scratching, setDeck1Scratching] = useState(false);
  const [deck2Scratching, setDeck2Scratching] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const bassOscillatorRef = useRef<OscillatorNode | null>(null);
  const bassGainRef = useRef<GainNode | null>(null);
  const deck1OscillatorRef = useRef<OscillatorNode | null>(null);
  const deck2OscillatorRef = useRef<OscillatorNode | null>(null);
  const deck1GainRef = useRef<GainNode | null>(null);
  const deck2GainRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Animate turntable rotation
  useEffect(() => {
    const animate = () => {
      if (deck1Playing && !deck1Scratching) {
        setDeck1Rotation(prev => (prev + (deck1Speed / 10)) % 360);
      }
      if (deck2Playing && !deck2Scratching) {
        setDeck2Rotation(prev => (prev + (deck2Speed / 10)) % 360);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [deck1Playing, deck2Playing, deck1Speed, deck2Speed, deck1Scratching, deck2Scratching]);

  // MIDI Bass Beat Generator
  const toggleBass = () => {
    if (!audioContextRef.current) return;

    if (!bassPlaying) {
      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();
      const filter = audioContextRef.current.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, audioContextRef.current.currentTime); // A1 note

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
      filter.Q.setValueAtTime(1, audioContextRef.current.currentTime);

      gain.gain.setValueAtTime(bassVolume / 100, audioContextRef.current.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioContextRef.current.destination);

      osc.start();

      // Create beat pattern
      const beatInterval = (60 / bassTempo) * 1000;
      let lastTime = Date.now();

      const beat = () => {
        if (!bassPlaying) return;
        const now = Date.now();
        if (now - lastTime >= beatInterval / 4) {
          if (gain.gain.value === 0) {
            gain.gain.setValueAtTime(bassVolume / 100, audioContextRef.current!.currentTime);
          } else {
            gain.gain.setValueAtTime(0, audioContextRef.current!.currentTime);
          }
          lastTime = now;
        }
        requestAnimationFrame(beat);
      };
      requestAnimationFrame(beat);

      bassOscillatorRef.current = osc;
      bassGainRef.current = gain;
      setBassPlaying(true);
    } else {
      if (bassOscillatorRef.current) {
        bassOscillatorRef.current.stop();
        bassOscillatorRef.current = null;
      }
      setBassPlaying(false);
    }
  };

  // Deck 1 Controls
  const toggleDeck1 = () => {
    if (!audioContextRef.current) return;

    if (!deck1Playing) {
      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(220, audioContextRef.current.currentTime);

      const finalVolume = (deck1Volume / 100) * (crossfader <= 50 ? 1 : (100 - crossfader) / 50);
      gain.gain.setValueAtTime(finalVolume, audioContextRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);
      osc.start();

      deck1OscillatorRef.current = osc;
      deck1GainRef.current = gain;
      setDeck1Playing(true);
    } else {
      if (deck1OscillatorRef.current) {
        deck1OscillatorRef.current.stop();
        deck1OscillatorRef.current = null;
      }
      setDeck1Playing(false);
    }
  };

  // Deck 2 Controls
  const toggleDeck2 = () => {
    if (!audioContextRef.current) return;

    if (!deck2Playing) {
      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, audioContextRef.current.currentTime);

      const finalVolume = (deck2Volume / 100) * (crossfader >= 50 ? 1 : crossfader / 50);
      gain.gain.setValueAtTime(finalVolume, audioContextRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);
      osc.start();

      deck2OscillatorRef.current = osc;
      deck2GainRef.current = gain;
      setDeck2Playing(true);
    } else {
      if (deck2OscillatorRef.current) {
        deck2OscillatorRef.current.stop();
        deck2OscillatorRef.current = null;
      }
      setDeck2Playing(false);
    }
  };

  // Update crossfader
  const handleCrossfader = (value: number) => {
    setCrossfader(value);
    if (deck1GainRef.current && audioContextRef.current) {
      const finalVolume = (deck1Volume / 100) * (value <= 50 ? 1 : (100 - value) / 50);
      deck1GainRef.current.gain.setValueAtTime(finalVolume, audioContextRef.current.currentTime);
    }
    if (deck2GainRef.current && audioContextRef.current) {
      const finalVolume = (deck2Volume / 100) * (value >= 50 ? 1 : value / 50);
      deck2GainRef.current.gain.setValueAtTime(finalVolume, audioContextRef.current.currentTime);
    }
  };

  // Scratching mechanics
  const handleDeck1Scratch = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!deck1Playing) return;
    setDeck1Scratching(true);
    const startY = e.clientY;
    const startRotation = deck1Rotation;

    const handleMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      setDeck1Rotation(startRotation + deltaY);

      if (deck1OscillatorRef.current && audioContextRef.current) {
        const pitchBend = 220 + (deltaY * 2);
        deck1OscillatorRef.current.frequency.setValueAtTime(
          Math.max(50, Math.min(800, pitchBend)),
          audioContextRef.current.currentTime
        );
      }
    };

    const handleUp = () => {
      setDeck1Scratching(false);
      if (deck1OscillatorRef.current && audioContextRef.current) {
        deck1OscillatorRef.current.frequency.setValueAtTime(220, audioContextRef.current.currentTime);
      }
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  };

  const handleDeck2Scratch = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!deck2Playing) return;
    setDeck2Scratching(true);
    const startY = e.clientY;
    const startRotation = deck2Rotation;

    const handleMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      setDeck2Rotation(startRotation + deltaY);

      if (deck2OscillatorRef.current && audioContextRef.current) {
        const pitchBend = 440 + (deltaY * 2);
        deck2OscillatorRef.current.frequency.setValueAtTime(
          Math.max(100, Math.min(1200, pitchBend)),
          audioContextRef.current.currentTime
        );
      }
    };

    const handleUp = () => {
      setDeck2Scratching(false);
      if (deck2OscillatorRef.current && audioContextRef.current) {
        deck2OscillatorRef.current.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
      }
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  };

  // Video Recording
  const startRecording = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stream = canvas.captureStream(30);

    // Capture audio
    if (audioContextRef.current) {
      const dest = audioContextRef.current.createMediaStreamDestination();
      if (deck1GainRef.current) deck1GainRef.current.connect(dest);
      if (deck2GainRef.current) deck2GainRef.current.connect(dest);
      if (bassGainRef.current) bassGainRef.current.connect(dest);

      dest.stream.getAudioTracks().forEach(track => {
        stream.addTrack(track);
      });
    }

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
    });

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setRecordedBlob(blob);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);

    // Render loop
    const render = () => {
      if (!isRecording) return;

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render uploaded video if available
      if (videoRef.current && uploadedVideo) {
        ctx.globalAlpha = 0.3;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
      }

      // Render turntables and mixer UI
      renderMixerToCanvas(ctx, canvas);

      requestAnimationFrame(render);
    };
    render();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setIsRecording(false);
    }
  };

  const downloadRecording = () => {
    if (!recordedBlob) return;

    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `turntable-mix-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideo(url);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.loop = true;
        videoRef.current.play();
      }
    }
  };

  const renderMixerToCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const w = canvas.width;
    const h = canvas.height;

    // Deck 1 (left)
    ctx.save();
    ctx.translate(w * 0.25, h * 0.3);
    ctx.rotate((deck1Rotation * Math.PI) / 180);

    // Turntable platter
    const gradient1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
    gradient1.addColorStop(0, '#1a1a1a');
    gradient1.addColorStop(0.7, '#2a2a2a');
    gradient1.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = gradient1;
    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, Math.PI * 2);
    ctx.fill();

    // Center label
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();

    // Tone arm indicator
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();

    ctx.restore();

    // Deck 1 status
    ctx.fillStyle = deck1Playing ? '#00ff00' : '#ff0000';
    ctx.font = '16px monospace';
    ctx.fillText(`DECK 1: ${deck1Playing ? 'PLAYING' : 'STOPPED'}`, w * 0.15, h * 0.55);
    ctx.fillText(`Speed: ${deck1Speed}%`, w * 0.15, h * 0.58);
    if (deck1Scratching) {
      ctx.fillStyle = '#ffff00';
      ctx.fillText('SCRATCHING', w * 0.15, h * 0.61);
    }

    // Deck 2 (right)
    ctx.save();
    ctx.translate(w * 0.75, h * 0.3);
    ctx.rotate((deck2Rotation * Math.PI) / 180);

    const gradient2 = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
    gradient2.addColorStop(0, '#1a1a1a');
    gradient2.addColorStop(0.7, '#2a2a2a');
    gradient2.addColorStop(1, '#0a0a0a');
    ctx.fillStyle = gradient2;
    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();

    ctx.restore();

    // Deck 2 status
    ctx.fillStyle = deck2Playing ? '#00ff00' : '#ff0000';
    ctx.fillText(`DECK 2: ${deck2Playing ? 'PLAYING' : 'STOPPED'}`, w * 0.65, h * 0.55);
    ctx.fillText(`Speed: ${deck2Speed}%`, w * 0.65, h * 0.58);
    if (deck2Scratching) {
      ctx.fillStyle = '#ffff00';
      ctx.fillText('SCRATCHING', w * 0.65, h * 0.61);
    }

    // Crossfader
    ctx.fillStyle = '#333';
    ctx.fillRect(w * 0.3, h * 0.7, w * 0.4, 20);
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(w * 0.3 + (w * 0.4 * crossfader / 100) - 10, h * 0.7 - 5, 20, 30);

    // Bass beat indicator
    if (bassPlaying) {
      ctx.fillStyle = '#ff00ff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText(`BASS BEAT: ${bassTempo} BPM`, w * 0.35, h * 0.8);
    }

    // Recording indicator
    if (isRecording) {
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(w - 30, 30, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('REC', w - 60, 35);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Digital Turntable Mixer
        </h1>
        <p className="text-center text-gray-400 mb-8">Professional DJ Mixer with MIDI Bass & Video Recording</p>

        {/* Main Mixer Interface */}
        <div className="bg-gray-800 rounded-lg p-8 mb-6 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Deck 1 */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-red-400">Deck 1</h2>
              <div
                className="relative w-64 h-64 mx-auto mb-4 cursor-grab active:cursor-grabbing"
                onMouseDown={handleDeck1Scratch}
              >
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl"
                  style={{ transform: `rotate(${deck1Rotation}deg)` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-red-500"></div>
                  <div className="absolute top-1/2 left-1/2 w-1 h-24 bg-white origin-bottom" style={{ transform: 'translateX(-50%)' }}></div>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={toggleDeck1}
                  className={`w-full py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 ${
                    deck1Playing ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {deck1Playing ? <><Pause size={20} /> Stop</> : <><Play size={20} /> Play</>}
                </button>
                <div>
                  <label className="block text-sm mb-2">Volume: {deck1Volume}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={deck1Volume}
                    onChange={(e) => setDeck1Volume(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Speed: {deck1Speed}%</label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={deck1Speed}
                    onChange={(e) => setDeck1Speed(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Deck 2 */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Deck 2</h2>
              <div
                className="relative w-64 h-64 mx-auto mb-4 cursor-grab active:cursor-grabbing"
                onMouseDown={handleDeck2Scratch}
              >
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-2xl"
                  style={{ transform: `rotate(${deck2Rotation}deg)` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-green-500"></div>
                  <div className="absolute top-1/2 left-1/2 w-1 h-24 bg-white origin-bottom" style={{ transform: 'translateX(-50%)' }}></div>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={toggleDeck2}
                  className={`w-full py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 ${
                    deck2Playing ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {deck2Playing ? <><Pause size={20} /> Stop</> : <><Play size={20} /> Play</>}
                </button>
                <div>
                  <label className="block text-sm mb-2">Volume: {deck2Volume}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={deck2Volume}
                    onChange={(e) => setDeck2Volume(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Speed: {deck2Speed}%</label>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={deck2Speed}
                    onChange={(e) => setDeck2Speed(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mixer Section */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Mixer Controls</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Crossfader (Deck 1 ← → Deck 2)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={crossfader}
                  onChange={(e) => handleCrossfader(Number(e.target.value))}
                  className="w-full h-3"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Deck 1</span>
                  <span>Center</span>
                  <span>Deck 2</span>
                </div>
              </div>
            </div>
          </div>

          {/* MIDI Bass Beat */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center gap-2">
              <Music size={24} /> MIDI Bass Beat Generator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={toggleBass}
                className={`py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 ${
                  bassPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {bassPlaying ? <><Square size={20} /> Stop Bass</> : <><Play size={20} /> Start Bass</>}
              </button>
              <div>
                <label className="block text-sm mb-2">BPM: {bassTempo}</label>
                <input
                  type="range"
                  min="60"
                  max="180"
                  value={bassTempo}
                  onChange={(e) => setBassTempo(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Bass Volume: {bassVolume}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bassVolume}
                  onChange={(e) => {
                    setBassVolume(Number(e.target.value));
                    if (bassGainRef.current && audioContextRef.current) {
                      bassGainRef.current.gain.setValueAtTime(
                        Number(e.target.value) / 100,
                        audioContextRef.current.currentTime
                      );
                    }
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video Recording Section */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
            <Video size={24} /> Video Recording & Export
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm mb-2 font-semibold">Upload Background Video (Optional)</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <Upload size={20} /> Choose Video
                </label>
                {uploadedVideo && <span className="text-green-400">Video loaded!</span>}
              </div>
            </div>

            <div className="flex items-end gap-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="bg-red-600 hover:bg-red-700 py-2 px-6 rounded-lg font-bold flex items-center gap-2"
                >
                  <Play size={20} /> Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-yellow-600 hover:bg-yellow-700 py-2 px-6 rounded-lg font-bold flex items-center gap-2"
                >
                  <Square size={20} /> Stop Recording
                </button>
              )}

              {recordedBlob && (
                <button
                  onClick={downloadRecording}
                  className="bg-green-600 hover:bg-green-700 py-2 px-6 rounded-lg font-bold flex items-center gap-2"
                >
                  <Download size={20} /> Download MP4
                </button>
              )}
            </div>
          </div>

          {/* Hidden canvas and video elements */}
          <canvas ref={canvasRef} width={1920} height={1080} className="hidden" />
          <video ref={videoRef} className="hidden" />

          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-sm text-gray-400">
              <strong>How to use:</strong>
              <br />1. Optionally upload a background video to overlay with the mixer
              <br />2. Play with the turntables, mixer, and bass generator
              <br />3. Click "Start Recording" to capture your mix
              <br />4. Click "Stop Recording" when done
              <br />5. Download your mix as an MP4 video
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Controls Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-bold text-purple-400 mb-2">Turntables:</h4>
              <ul className="space-y-1 text-gray-300">
                <li>Click and drag on the turntable to scratch</li>
                <li>Adjust speed to change rotation tempo</li>
                <li>Volume controls individual deck output</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-400 mb-2">Mixer:</h4>
              <ul className="space-y-1 text-gray-300">
                <li>Crossfader blends between Deck 1 and Deck 2</li>
                <li>MIDI Bass adds rhythmic bass patterns</li>
                <li>All audio is synchronized for mixing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
