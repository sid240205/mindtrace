import React from 'react';
import { Battery } from 'lucide-react';

const HUDOverlay = ({ mode, recognitionResult }) => {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Helper to get style for tracking tag
    const getTagStyle = () => {
        if (!recognitionResult?.position) {
            // Fallback to center bottom if no position (shouldn't happen often with tracking)
            return {
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'all 0.2s ease-out' // Smooth transition for tracking
            };
        }

        const { left, top, width, height } = recognitionResult.position;

        // Position the tag slightly above or below the face box
        // Let's place it to the right of the face for a futuristic/AR look, or below.
        // User asked for "tag on the recognition". Let's place it floating near the face.

        return {
            position: 'absolute',
            left: `${left + width + 20}px`, // 20px to the right of the face
            top: `${top}px`, // Aligned with top of face
            transition: 'all 0.1s linear' // Fast transition for smooth tracking
        };
    };

    const TagContent = () => (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg shadow-lg text-white">
            <div className="flex flex-col">
                <span className="text-xs font-serif tracking-widest uppercase opacity-70 mb-1">Identified</span>
                <h1 className="text-xl font-serif font-bold leading-tight">{recognitionResult.name}</h1>
                <span className="text-sm font-sans opacity-90 mt-1">{recognitionResult.relation}</span>
            </div>
            {/* Connecting Line */}
            <div className="absolute top-4 -left-5 w-5 h-px bg-white/30" />
            <div className="absolute top-4 -left-1 w-1 h-1 bg-white rounded-full" />
        </div>
    );

    if (mode === 'standard') {
        return (
            <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
                {/* Top Bar */}
                <div className="flex justify-between items-start">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-white">
                        <h2 className="text-sm font-serif tracking-widest uppercase">MindTrace</h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-sm font-serif">Live Feed</span>
                        </div>
                    </div>
                </div>

                {/* Tracking Tag */}
                {recognitionResult && (
                    <div style={getTagStyle()}>
                        <TagContent />
                    </div>
                )}
            </div>
        );
    }

    // Ray-Ban Meta Mode
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

            {/* HUD Elements */}
            <div className="absolute top-8 right-8 flex items-center gap-4 text-white/90 font-medium">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-serif">REC</span>
                    <span className="text-sm font-mono ml-2 opacity-80">00:14</span>
                </div>
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                    <Battery className="w-5 h-5" />
                    <span className="text-sm font-serif">84%</span>
                    <div className="w-px h-4 bg-white/20" />
                    <span className="text-sm font-serif">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Center Reticle - Minimal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
                <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
            </div>

            {/* Tracking Tag - Minimal for Ray-Ban */}
            {recognitionResult && (
                <div style={getTagStyle()}>
                    <div className="bg-black/40 backdrop-blur-md p-3 rounded-lg border border-white/20 text-white shadow-xl">
                        <div className="text-lg font-serif font-bold">{recognitionResult.name}</div>
                        <div className="text-sm font-serif opacity-80">{recognitionResult.relation}</div>
                    </div>
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 -left-8 w-8 h-px bg-white/30" />
                    <div className="absolute top-1/2 -left-1 w-1 h-1 bg-white rounded-full" />
                </div>
            )}
        </div>
    );
};

export default HUDOverlay;
