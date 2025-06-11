import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-900 font-medium">Generating Profile...</p>
        <p className="text-gray-600 text-sm mt-1">Creating comprehensive identity data</p>
      </div>
    </div>
  );
}
