import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { criminalRecordOptions } from "@/lib/data-sets";
import { Shuffle, Plus } from "lucide-react";

interface GenerationFormProps {
  onGenerate: (count: number, options?: GenerationOptions) => void;
  isLoading: boolean;
}

export interface GenerationOptions {
  criminalRecordType?: string;
}

export function GenerationForm({ onGenerate, isLoading }: GenerationFormProps) {
  const [count, setCount] = useState(1);
  const [criminalRecordType, setCriminalRecordType] = useState<string>("");

  const handleGenerate = () => {
    const options: GenerationOptions = {};
    if (criminalRecordType) {
      options.criminalRecordType = criminalRecordType;
    }
    onGenerate(count, options);
  };

  const handleQuickGenerate = (quickCount: number) => {
    onGenerate(quickCount);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shuffle className="mr-2 text-blue-600" />
          Generate Identities
        </CardTitle>
        <CardDescription>
          Create realistic identity profiles with customizable options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Generate Buttons */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Quick Generate</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => handleQuickGenerate(1)}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              1 Profile
            </Button>
            <Button
              onClick={() => handleQuickGenerate(5)}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              5 Profiles
            </Button>
            <Button
              onClick={() => handleQuickGenerate(10)}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              10 Profiles
            </Button>
          </div>
        </div>

        <Separator />

        {/* Custom Generation */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Custom Generation</Label>
          
          <div className="space-y-2">
            <Label htmlFor="count" className="text-sm">Number of Profiles</Label>
            <Input
              id="count"
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="criminal-record" className="text-sm">Criminal Record Type</Label>
            <Select value={criminalRecordType} onValueChange={setCriminalRecordType}>
              <SelectTrigger>
                <SelectValue placeholder="Any (Random)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any (Random)</SelectItem>
                {criminalRecordOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full"
          >
            <Plus className="mr-2 w-4 h-4" />
            {isLoading ? "Generating..." : `Generate ${count} Profile${count !== 1 ? 's' : ''}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}