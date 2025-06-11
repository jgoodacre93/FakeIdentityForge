import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { 
  User, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Heart,
  Shield,
  Users,
  Camera
} from "lucide-react";
import { getProfileTypeColor, getRiskLevelColor } from "@/lib/profile-colors";
import { SocialMediaPreview } from "@/components/social-media-preview";
import type { IdentityProfile } from "@shared/schema";

interface IdentityProfileProps {
  profile: IdentityProfile;
  profiles: IdentityProfile[];
  currentIndex: number;
  onProfileChange: (index: number) => void;
}

export function IdentityProfileComponent({ 
  profile, 
  profiles, 
  currentIndex, 
  onProfileChange 
}: IdentityProfileProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["basic"]));

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const canNavigate = profiles.length > 1;

  return (
    <div className="space-y-6">
      {/* Navigation */}
      {canNavigate && (
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onProfileChange(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-sm font-medium text-gray-600">
            Profile {currentIndex + 1} of {profiles.length}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onProfileChange(Math.min(profiles.length - 1, currentIndex + 1))}
            disabled={currentIndex === profiles.length - 1}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Profile Header with Photo */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              {profile.photoUrl ? (
                <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                  <img 
                    src={profile.photoUrl} 
                    alt={`Profile photo of ${profile.fullName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{profile.fullName}</h1>
              <p className="text-lg text-gray-600 mb-4">{profile.age} years old • {profile.jobTitle}</p>
              
              {/* Status Badges */}
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <div className={`flex items-center px-3 py-2 rounded-full border ${getProfileTypeColor(profile.profileType).bg} ${getProfileTypeColor(profile.profileType).border}`}>
                  <UserCheck className={`w-4 h-4 mr-2 ${getProfileTypeColor(profile.profileType).icon}`} />
                  <span className={`text-sm font-medium ${getProfileTypeColor(profile.profileType).text}`}>
                    {profile.profileType}
                  </span>
                </div>
                
                <div className={`flex items-center px-3 py-2 rounded-full border ${getRiskLevelColor(profile.riskLevel).bg} ${getRiskLevelColor(profile.riskLevel).border}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${getRiskLevelColor(profile.riskLevel).dot}`}></div>
                  <span className={`text-sm font-medium ${getRiskLevelColor(profile.riskLevel).text}`}>
                    {profile.riskLevel} Risk
                  </span>
                  {profile.riskLevel === "High" && <AlertTriangle className="w-4 h-4 ml-1 text-red-500" />}
                  {profile.riskLevel === "Low" && <CheckCircle className="w-4 h-4 ml-1 text-green-500" />}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection("basic")}>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <User className="mr-2 text-blue-600" />
              Basic Information
            </span>
            {openSections.has("basic") ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <Collapsible open={openSections.has("basic")}>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-lg font-medium text-gray-900">{profile.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Age</label>
                  <p className="text-lg font-medium text-gray-900">{profile.age} years old</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="text-lg font-medium text-gray-900">{profile.dateOfBirth}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Birth Gender</label>
                  <p className="text-lg font-medium text-gray-900">{profile.birthGender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender Identity</label>
                  <p className="text-lg font-medium text-gray-900">{profile.genderIdentity} ({profile.pronouns})</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Sexual Orientation</label>
                  <p className="text-lg font-medium text-gray-900">{profile.sexualOrientation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ethnicity</label>
                  <p className="text-lg font-medium text-gray-900">{profile.ethnicity}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nationality</label>
                  <p className="text-lg font-medium text-gray-900">{profile.nationality}</p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Social Media Preview */}
      <SocialMediaPreview profile={profile} />
    </div>
  );
}