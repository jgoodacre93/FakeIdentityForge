import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

interface GenerationControlsProps {
  onGenerate: (count: number) => void;
  isLoading: boolean;
}

export function GenerationControls({ onGenerate, isLoading }: GenerationControlsProps) {
  const [batchSize, setBatchSize] = useState("1");

  const handleGenerate = () => {
    onGenerate(parseInt(batchSize));
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Generate New Identity</h2>
            <p className="text-sm text-gray-600">
              Create comprehensive fake profiles with diverse, inclusive data across all demographics
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center">
              <label htmlFor="batch-count" className="text-sm font-medium text-gray-700 mr-3">
                Batch Size:
              </label>
              <Select value={batchSize} onValueChange={setBatchSize}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Profile</SelectItem>
                  <SelectItem value="5">5 Profiles</SelectItem>
                  <SelectItem value="10">10 Profiles</SelectItem>
                  <SelectItem value="25">25 Profiles</SelectItem>
                  <SelectItem value="50">50 Profiles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 w-4 h-4" />
              )}
              Generate Profile{parseInt(batchSize) > 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
