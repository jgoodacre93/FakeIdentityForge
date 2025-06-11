import { useState } from "react";
import type { IdentityProfile } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  User, 
  Contact, 
  Ruler, 
  Briefcase, 
  Globe, 
  FileText,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Lock,
  Heart,
  Shield,
  CreditCard,
  Activity,
  Music,
  Play,
  MessageCircle,
  MessageSquare,
  Camera
} from "lucide-react";

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
                  <label className="text-sm font-medium text-gray-500">Marital Status</label>
                  <p className="text-lg font-medium text-gray-900">
                    {profile.maritalStatus}
                    {profile.spouseName && ` to ${profile.spouseName}`}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nationality</label>
                  <p className="text-lg font-medium text-gray-900">{profile.nationality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Spoken Languages</label>
                  <p className="text-lg font-medium text-gray-900">{profile.spokenLanguages}</p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection("contact")}>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Contact className="mr-2 text-blue-600" />
              Contact Information
            </span>
            {openSections.has("contact") ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <Collapsible open={openSections.has("contact")}>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-lg font-medium text-gray-900">{profile.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-lg font-medium text-gray-900">{profile.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-lg font-medium text-gray-900">
                    {profile.address}, {profile.city}
                    {profile.state && `, ${profile.state}`} {profile.zipCode}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Country</label>
                  <p className="text-lg font-medium text-gray-900">{profile.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Citizenship Status</label>
                  <p className="text-lg font-medium text-gray-900">{profile.citizenshipStatus}</p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Physical Attributes */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection("physical")}>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Ruler className="mr-2 text-blue-600" />
              Physical Attributes
            </span>
            {openSections.has("physical") ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <Collapsible open={openSections.has("physical")}>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Height</label>
                  <p className="text-lg font-medium text-gray-900">{profile.height}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Weight</label>
                  <p className="text-lg font-medium text-gray-900">{profile.weight}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Build</label>
                  <p className="text-lg font-medium text-gray-900">{profile.build}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Hair Color</label>
                  <p className="text-lg font-medium text-gray-900">{profile.hairColor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Eye Color</label>
                  <p className="text-lg font-medium text-gray-900">{profile.eyeColor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Skin Tone</label>
                  <p className="text-lg font-medium text-gray-900">{profile.skinTone}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-700 mb-4">Body Measurements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Measurements</label>
                    <p className="text-lg font-medium text-gray-900">{profile.bodyMeasurements}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection("professional")}>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Briefcase className="mr-2 text-blue-600" />
              Professional Information
            </span>
            {openSections.has("professional") ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <Collapsible open={openSections.has("professional")}>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Job Title</label>
                  <p className="text-lg font-medium text-gray-900">{profile.jobTitle}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Company</label>
                  <p className="text-lg font-medium text-gray-900">{profile.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Industry</label>
                  <p className="text-lg font-medium text-gray-900">{profile.industry}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Annual Income</label>
                  <p className="text-lg font-medium text-gray-900">{profile.annualIncome}</p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Online Presence */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection("online")}>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Globe className="mr-2 text-blue-600" />
              Online Presence
            </span>
            {openSections.has("online") ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <Collapsible open={openSections.has("online")}>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Linkedin className="text-blue-600 mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">LinkedIn</span>
                  </div>
                  <span className="text-blue-600">{profile.linkedinUrl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Twitter className="text-blue-400 mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">Twitter</span>
                  </div>
                  <span className="text-blue-600">{profile.twitterUrl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Instagram className="text-pink-500 mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">Instagram</span>
                  </div>
                  <span className="text-blue-600">{profile.instagramUrl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Github className="text-gray-700 mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">GitHub</span>
                  </div>
                  <span className="text-blue-600">{profile.githubUrl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Globe className="text-blue-500 mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">Facebook</span>
                  </div>
                  <span className="text-blue-600">{profile.facebookUrl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Music className="text-black mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">TikTok</span>
                  </div>
                  <span className="text-blue-600">{profile.tiktokUrl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Play className="text-red-600 mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">YouTube</span>
                  </div>
                  <span className="text-blue-600">{profile.youtubeUrl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <MessageCircle className="text-indigo-500 mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">Discord</span>
                  </div>
                  <span className="text-blue-600">{profile.discordUrl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <MessageSquare className="text-orange-500 mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">Reddit</span>
                  </div>
                  <span className="text-blue-600">{profile.redditUrl}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Camera className="text-yellow-400 mr-3 w-5 h-5" />
                    <span className="font-medium text-gray-900">Snapchat</span>
                  </div>
                  <span className="text-blue-600">{profile.snapchatUrl}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-700 mb-4 flex items-center">
                  <Lock className="mr-2 text-gray-500 w-4 h-4" />
                  Adult Platform Profiles
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-gray-900">OnlyFans</span>
                    <span className="text-blue-600">{profile.onlyfansUrl}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-gray-900">Premium Dating</span>
                    <span className="text-blue-600">{profile.datingUrl}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Additional Records */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection("additional")}>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <FileText className="mr-2 text-blue-600" />
              Additional Records
            </span>
            {openSections.has("additional") ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
          </CardTitle>
        </CardHeader>
        <Collapsible open={openSections.has("additional")}>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-6">
              {/* Health Records */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                  <Activity className="mr-2 w-4 h-4" />
                  Health Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Blood Type</label>
                    <p className="text-lg font-medium text-gray-900">{profile.bloodType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Medical Conditions</label>
                    <p className="text-lg font-medium text-gray-900">{profile.medicalConditions}</p>
                  </div>
                </div>
              </div>

              {/* Banking Information */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                  <CreditCard className="mr-2 w-4 h-4" />
                  Banking Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Bank Name</label>
                    <p className="text-lg font-medium text-gray-900">{profile.bankName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Account Type</label>
                    <p className="text-lg font-medium text-gray-900">{profile.accountType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Routing Number</label>
                    <p className="text-lg font-medium text-gray-900">{profile.routingNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Credit Score</label>
                    <p className="text-lg font-medium text-gray-900">{profile.creditScore}</p>
                  </div>
                </div>
              </div>

              {/* Credit Card Information */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                  <CreditCard className="mr-2 w-4 h-4" />
                  Credit Card Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Card Type</label>
                    <p className="text-lg font-medium text-gray-900">{profile.creditCardType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Card Number</label>
                    <p className="text-lg font-medium text-gray-900 font-mono">{profile.creditCardNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Expiry Date</label>
                    <p className="text-lg font-medium text-gray-900">{profile.creditCardExpiry}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">CVV</label>
                    <p className="text-lg font-medium text-gray-900">{profile.creditCardCvv}</p>
                  </div>
                </div>
              </div>

              {/* Criminal Records */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                  <Shield className="mr-2 w-4 h-4" />
                  Criminal Records
                </h4>
                {profile.criminalRecord === "Clean Record" ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Shield className="text-green-600 mr-2 w-4 h-4" />
                      <span className="text-green-800 font-medium">Clean Record</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">No criminal history found</p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Shield className="text-yellow-600 mr-2 w-4 h-4" />
                      <span className="text-yellow-800 font-medium">Has Records</span>
                    </div>
                    <p className="text-sm text-yellow-700">{profile.criminalHistory}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}
