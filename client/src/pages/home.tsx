import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { IdentityProfile } from "@shared/schema";
import { GenerationControls } from "@/components/generation-controls";
import { IdentityProfileComponent } from "@/components/identity-profile";
import { ExportActions } from "@/components/export-actions";
import { LoadingOverlay } from "@/components/loading-overlay";
import { ProfileLegend } from "@/components/profile-legend";
import { RelationshipNetwork } from "@/components/relationship-network";
import { getProfileTypeColor, getRiskLevelColor } from "@/lib/profile-colors";
import { useToast } from "@/hooks/use-toast";
import { KeyRound, History, BarChart3 } from "lucide-react";
import { DatabaseExport } from "@/components/database-export";

export default function Home() {
  const [currentProfiles, setCurrentProfiles] = useState<IdentityProfile[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const { toast } = useToast();

  // Fetch recent profiles
  const { data: recentProfiles = [] } = useQuery<IdentityProfile[]>({
    queryKey: ["/api/profiles/recent"],
  });

  // Generate profiles mutation
  const generateMutation = useMutation({
    mutationFn: async (count: number) => {
      const res = await apiRequest("POST", "/api/profiles/generate", { count });
      return res.json();
    },
    onSuccess: (data: IdentityProfile[]) => {
      setCurrentProfiles(data);
      setCurrentProfileIndex(0);
      queryClient.invalidateQueries({ queryKey: ["/api/profiles/recent"] });
      toast({
        title: "Success",
        description: `Generated ${data.length} profile${data.length > 1 ? 's' : ''} successfully`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleGenerate = (count: number) => {
    generateMutation.mutate(count);
  };

  const handleSelectProfile = (profile: IdentityProfile) => {
    setCurrentProfiles([profile]);
    setCurrentProfileIndex(0);
  };

  const currentProfile = currentProfiles[currentProfileIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <KeyRound className="text-2xl text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Identity Generator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Professional Fake Identity Creation Tool</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Classification Legend */}
        <ProfileLegend />

        {/* Generation Controls */}
        <GenerationControls 
          onGenerate={handleGenerate}
          isLoading={generateMutation.isPending}
        />

        {/* Relationship Network */}
        {(currentProfiles.length > 1 || recentProfiles.length > 1) && (
          <div className="mb-8">
            <RelationshipNetwork 
              profiles={currentProfiles.length > 1 ? currentProfiles : recentProfiles.slice(0, 10)} 
            />
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Display */}
          <div className="lg:col-span-2">
            {currentProfile ? (
              <IdentityProfileComponent 
                profile={currentProfile}
                profiles={currentProfiles}
                currentIndex={currentProfileIndex}
                onProfileChange={setCurrentProfileIndex}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <KeyRound className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Profile Generated</h3>
                <p className="text-gray-600">Click "Generate Profile" to create a new fake identity</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Export Actions */}
            {currentProfile && (
              <>
                <ExportActions 
                  profiles={currentProfiles}
                  currentProfile={currentProfile}
                />
                <DatabaseExport />
              </>
            )}

            {/* Recent Profiles */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <History className="mr-2 text-blue-600" />
                Recent Profiles
              </h3>
              {recentProfiles.length > 0 ? (
                <div className="space-y-3">
                  {recentProfiles.slice(0, 5).map((profile) => {
                    const profileTypeColors = getProfileTypeColor(profile.profileType);
                    const riskColors = getRiskLevelColor(profile.riskLevel);

                    return (
                      <div
                        key={profile.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSelectProfile(profile)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-900">{profile.fullName}</p>
                            <div className="flex gap-1">
                              <div 
                                className={`w-2 h-2 rounded-full ${profileTypeColors.icon.replace('text-', 'bg-')}`}
                                title={profile.profileType}
                              ></div>
                              <div 
                                className={`w-2 h-2 rounded-full ${riskColors.dot}`}
                                title={`${profile.riskLevel} Risk`}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-500">
                              {new Date(profile.createdAt).toLocaleDateString()}
                            </p>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${profileTypeColors.bg} ${profileTypeColors.text}`}>
                              {profile.profileType.split(' ')[0]}
                            </span>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${riskColors.bg} ${riskColors.text}`}>
                              {profile.riskLevel}
                            </span>
                          </div>
                        </div>
                        <div className="text-gray-400">→</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No profiles generated yet</p>
              )}
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <BarChart3 className="mr-2 text-blue-600" />
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Profiles Generated</span>
                  <span className="font-medium text-gray-900">{recentProfiles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Session</span>
                  <span className="font-medium text-gray-900">{currentProfiles.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoadingOverlay isVisible={generateMutation.isPending} />
    </div>
  );
}