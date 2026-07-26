import React, { useRef, useState, useEffect } from 'react';
import { MousePointer2, Pen, Square, Circle, Type, Image, Undo, Redo, Download, Share2, Trash2 } from 'lucide-react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(3);
  const [mode, setMode] = useState('draw'); // draw, erase

  useEffect(() => {
    const canvas = canvasRef.current;
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = mode === 'erase' ? '#1a1c23' : color;
      contextRef.current.lineWidth = mode === 'erase' ? 20 : lineWidth;
    }
  }, [color, lineWidth, mode]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = url;
    link.click();
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-dark border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
      {/* Toolbar */}
      <div className="h-16 bg-card border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2 bg-darker rounded-xl p-1 border border-gray-700">
          <button 
            onClick={() => setMode('draw')}
            className={`p-2 rounded-lg transition-colors ${mode === 'draw' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <Pen size={18} />
          </button>
          <button 
            onClick={() => setMode('erase')}
            className={`p-2 rounded-lg transition-colors ${mode === 'erase' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            title="Eraser"
          >
            <div className="w-4 h-4 border-2 border-current rounded-sm"></div>
          </button>
          
          <div className="w-px h-6 bg-gray-700 mx-1"></div>
          
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
            title="Color Picker"
          />
          
          <input 
            type="range" 
            min="1" max="20" 
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-24 ml-2 accent-primary"
            title="Line Width"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={clearCanvas} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors" title="Clear Canvas">
            <Trash2 size={18} />
          </button>
          <div className="w-px h-6 bg-gray-700 mx-1"></div>
          <button onClick={downloadCanvas} className="p-2 text-gray-400 hover:text-white transition-colors" title="Download">
            <Download size={18} />
          </button>
          <button className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg font-medium transition-colors">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="flex-1 bg-[#1a1c23] relative overflow-hidden flex items-center justify-center cursor-crosshair">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Real Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseOut={finishDrawing}
          onMouseMove={draw}
          className="relative z-10 w-full h-full"
        />
      </div>
    </div>
  );
};

export default Whiteboard;
