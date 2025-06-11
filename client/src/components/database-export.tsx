
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DatabaseExport() {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportDatabase = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/database/export');
      
      if (!response.ok) {
        throw new Error('Failed to export database');
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `identity_database_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "Database exported successfully as JSON file",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export database",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 text-purple-600" />
          Export Database
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Export all identity profiles from the database as a JSON file.
        </p>
        <Button
          onClick={exportDatabase}
          disabled={isExporting}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 w-4 h-4" />
              Export Entire Database
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
