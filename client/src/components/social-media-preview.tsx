import { useState } from "react";
import type { IdentityProfile } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  MessageCircle,
  Heart,
  Share,
  MoreHorizontal,
  Camera,
  Globe,
  MapPin,
  Calendar,
  Users,
  Eye,
  ThumbsUp,
  Send
} from "lucide-react";

interface SocialMediaPreviewProps {
  profile: IdentityProfile;
}

const platforms = [
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "twitter", name: "Twitter/X", icon: Twitter, color: "bg-black" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "bg-red-600" }
];

export function SocialMediaPreview({ profile }: SocialMediaPreviewProps) {
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");

  const getProfileImage = () => {
    // Generate a consistent avatar based on profile data
    const seed = profile.fullName.replace(/\s+/g, '').toLowerCase();
    return `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&backgroundColor=random`;
  };

  const generatePostContent = (platform: string) => {
    const workPosts = [
      `Just finished an amazing project at ${profile.company}! The ${profile.industry.toLowerCase()} industry never stops innovating.`,
      `Team meeting was productive today. Love working in ${profile.city}!`,
      `Another milestone reached at ${profile.company}. Grateful for this journey!`,
      `Working late but loving every moment. ${profile.industry} is my passion!`
    ];

    const personalPosts = [
      `Beautiful day in ${profile.city}! ${profile.country} has the best views.`,
      `Just turned ${profile.age} and feeling grateful for everything life has given me.`,
      `Weekend vibes in ${profile.city}. Time to recharge and relax!`,
      `Coffee and contemplation. Life is good at ${profile.age}.`
    ];

    const hobbeyPosts = [
      `Exploring new places in ${profile.city}. This city never gets old!`,
      `Trying out new restaurants in ${profile.country}. The food scene here is incredible!`,
      `Fitness journey continues! Staying healthy and motivated.`,
      `Reading a great book about ${profile.industry.toLowerCase()}. Always learning!`
    ];

    const allPosts = [...workPosts, ...personalPosts, ...hobbeyPosts];
    return allPosts[Math.floor(Math.random() * allPosts.length)];
  };

  const getEngagementStats = (platform: string) => {
    const baseEngagement = {
      likes: Math.floor(Math.random() * 100) + 10,
      comments: Math.floor(Math.random() * 20) + 1,
      shares: Math.floor(Math.random() * 15) + 1
    };

    // Higher engagement for adult content creators
    if (profile.profileType === "Adult Content Creator") {
      return {
        likes: baseEngagement.likes * 2,
        comments: baseEngagement.comments * 3,
        shares: baseEngagement.shares
      };
    }

    return baseEngagement;
  };

  const getPlatformFollowers = (platform: string) => {
    const followers = profile.socialMediaProfiles
      .split('\n')
      .find(line => line.toLowerCase().includes(platform.toLowerCase()));
    
    if (followers) {
      const match = followers.match(/\(([0-9,]+)\s+followers/);
      return match ? match[1] : "1,234";
    }
    return "1,234";
  };

  const getPlatformPosts = (platform: string) => {
    const posts = profile.socialMediaProfiles
      .split('\n')
      .find(line => line.toLowerCase().includes(platform.toLowerCase()));
    
    if (posts) {
      const match = posts.match(/(\d+)\s+posts\)/);
      return match ? match[1] : "156";
    }
    return "156";
  };

  const getUsername = (platform: string) => {
    const usernameLine = profile.socialMediaProfiles
      .split('\n')
      .find(line => line.toLowerCase().includes(platform.toLowerCase()));
    
    if (usernameLine) {
      const match = usernameLine.match(/@([^\s(]+)/);
      return match ? match[1] : profile.firstName.toLowerCase();
    }
    return profile.firstName.toLowerCase();
  };

  const renderFacebookPreview = () => (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={getProfileImage()} 
              alt={profile.fullName}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold">Facebook</h3>
              <p className="text-sm opacity-90">Social Network</p>
            </div>
          </div>
          <Facebook className="w-6 h-6" />
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="text-center mb-4">
          <img 
            src={getProfileImage()} 
            alt={profile.fullName}
            className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-blue-100"
          />
          <h2 className="text-xl font-bold text-gray-900">{profile.fullName}</h2>
          <p className="text-gray-600">@{getUsername("facebook")}</p>
          <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500">
            <span>{getPlatformFollowers("facebook")} friends</span>
            <span>{getPlatformPosts("facebook")} posts</span>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">
            {profile.jobTitle} at {profile.company} • Lives in {profile.city}, {profile.country}
          </p>
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            {profile.city}, {profile.country}
          </div>
        </div>

        {/* Sample Post */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-3">
            <img src={getProfileImage()} alt="" className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <p className="font-medium text-sm">{profile.fullName}</p>
              <p className="text-xs text-gray-500">2 hours ago • 🌍</p>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-800 mb-3">
            {generatePostContent("facebook")}
          </p>
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-xs">{getEngagementStats("facebook").likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{getEngagementStats("facebook").comments}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                <Share className="w-4 h-4" />
                <span className="text-xs">{getEngagementStats("facebook").shares}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInstagramPreview = () => (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={getProfileImage()} 
              alt={profile.fullName}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold">Instagram</h3>
              <p className="text-sm opacity-90">Photo & Video</p>
            </div>
          </div>
          <Instagram className="w-6 h-6" />
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={getProfileImage()} 
            alt={profile.fullName}
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <div className="flex-1">
            <h2 className="font-bold text-gray-900">{getUsername("instagram")}</h2>
            <p className="text-sm text-gray-600">{profile.fullName}</p>
            <div className="flex space-x-4 mt-1 text-sm text-gray-500">
              <span><strong>{getPlatformPosts("instagram")}</strong> posts</span>
              <span><strong>{getPlatformFollowers("instagram")}</strong> followers</span>
              <span><strong>892</strong> following</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-sm text-gray-800">
            {profile.jobTitle} at {profile.company}<br/>
            📍 {profile.city}, {profile.country}<br/>
            ✨ Living my best life at {profile.age}
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded">
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTwitterPreview = () => (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="p-4 bg-black text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={getProfileImage()} 
              alt={profile.fullName}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold">X (Twitter)</h3>
              <p className="text-sm opacity-90">Microblogging</p>
            </div>
          </div>
          <Twitter className="w-6 h-6" />
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="mb-4">
          <img 
            src={getProfileImage()} 
            alt={profile.fullName}
            className="w-16 h-16 rounded-full mb-3"
          />
          <h2 className="text-xl font-bold text-gray-900">{profile.fullName}</h2>
          <p className="text-gray-600">@{getUsername("twitter")}</p>
          
          <p className="text-sm text-gray-800 mt-2 mb-3">
            {profile.jobTitle} at {profile.company} • {profile.city}, {profile.country} • 
            Passionate about innovation and growth 🚀
          </p>

          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4" />
            <span>Joined {new Date().getFullYear() - Math.floor(profile.age / 10)}</span>
          </div>

          <div className="flex space-x-4 text-sm text-gray-500">
            <span><strong>1,847</strong> Following</span>
            <span><strong>{getPlatformFollowers("twitter")}</strong> Followers</span>
          </div>
        </div>

        {/* Sample Tweet */}
        <div className="border rounded-lg p-3">
          <div className="flex space-x-3">
            <img src={getProfileImage()} alt="" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-sm">{profile.fullName}</p>
                <p className="text-xs text-gray-500">@{getUsername("twitter")}</p>
                <p className="text-xs text-gray-500">• 3h</p>
              </div>
              <p className="text-sm text-gray-800 mt-1">
                {generatePostContent("twitter")} ⚡ #productivity #innovation
              </p>
              <div className="flex items-center justify-between mt-3 text-gray-500">
                <button className="flex items-center space-x-2 hover:text-blue-500">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">{getEngagementStats("twitter").comments}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-500">
                  <Share className="w-4 h-4" />
                  <span className="text-xs">{getEngagementStats("twitter").shares}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-red-500">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">{getEngagementStats("twitter").likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLinkedInPreview = () => (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="p-4 bg-blue-700 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={getProfileImage()} 
              alt={profile.fullName}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold">LinkedIn</h3>
              <p className="text-sm opacity-90">Professional Network</p>
            </div>
          </div>
          <Linkedin className="w-6 h-6" />
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="text-center mb-4">
          <img 
            src={getProfileImage()} 
            alt={profile.fullName}
            className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-blue-100"
          />
          <h2 className="text-lg font-bold text-gray-900">{profile.fullName}</h2>
          <p className="text-gray-600">{profile.jobTitle}</p>
          <p className="text-sm text-gray-500">{profile.company} • {profile.city}, {profile.country}</p>
          
          <div className="flex justify-center space-x-4 mt-2 text-sm text-blue-600">
            <span>500+ connections</span>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <h3 className="font-medium text-sm text-gray-800 mb-2">About</h3>
          <p className="text-xs text-gray-600">
            Experienced {profile.jobTitle} with a passion for {profile.industry.toLowerCase()}. 
            Currently working at {profile.company} in {profile.city}. 
            Focused on driving innovation and delivering results.
          </p>
        </div>

        {/* Sample Update */}
        <div className="border rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-3">
            <img src={getProfileImage()} alt="" className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <p className="font-medium text-sm">{profile.fullName}</p>
              <p className="text-xs text-gray-500">{profile.jobTitle} at {profile.company}</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <p className="text-sm text-gray-800 mb-3">
            {generatePostContent("linkedin")} 🚀
            
            #professional #innovation #{profile.industry.toLowerCase().replace(/\s+/g, '')}
          </p>
          <div className="flex items-center space-x-4 pt-2 border-t text-gray-500">
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs">{getEngagementStats("linkedin").likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{getEngagementStats("linkedin").comments}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-600">
              <Share className="w-4 h-4" />
              <span className="text-xs">{getEngagementStats("linkedin").shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderYouTubePreview = () => (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="p-4 bg-red-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={getProfileImage()} 
              alt={profile.fullName}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-semibold">YouTube</h3>
              <p className="text-sm opacity-90">Video Platform</p>
            </div>
          </div>
          <Youtube className="w-6 h-6" />
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={getProfileImage()} 
            alt={profile.fullName}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">{profile.fullName}</h2>
            <p className="text-sm text-gray-600">@{getUsername("youtube")}</p>
            <div className="flex space-x-4 mt-1 text-sm text-gray-500">
              <span>{getPlatformFollowers("youtube")} subscribers</span>
              <span>{getPlatformPosts("youtube")} videos</span>
            </div>
          </div>
        </div>

        {/* Channel Description */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-700">
            Welcome to my channel! I'm a {profile.jobTitle} sharing insights about {profile.industry.toLowerCase()} 
            and life in {profile.city}. Subscribe for weekly content! 🎬
          </p>
        </div>

        {/* Video Thumbnails */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm text-gray-800">Recent Videos</h3>
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="flex space-x-3">
              <div className="w-24 h-16 bg-gradient-to-br from-red-200 to-red-300 rounded flex items-center justify-center">
                <Youtube className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-800">
                  {i === 0 ? `A Day in the Life of a ${profile.jobTitle}` : `My Experience in ${profile.industry}`}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                  <Eye className="w-3 h-3" />
                  <span>{i === 0 ? '2.1K' : '1.8K'} views</span>
                  <span>•</span>
                  <span>{i === 0 ? '2 days ago' : '1 week ago'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (selectedPlatform) {
      case "facebook": return renderFacebookPreview();
      case "instagram": return renderInstagramPreview();
      case "twitter": return renderTwitterPreview();
      case "linkedin": return renderLinkedInPreview();
      case "youtube": return renderYouTubePreview();
      default: return renderFacebookPreview();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 w-5 h-5 text-blue-600" />
          Social Media Preview
        </CardTitle>
        <p className="text-sm text-gray-600">
          See how this identity would appear across different social platforms
        </p>
      </CardHeader>
      <CardContent>
        {/* Platform Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isActive = selectedPlatform === platform.id;
            
            return (
              <Button
                key={platform.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center space-x-2 ${
                  isActive ? platform.color : 'hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{platform.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Preview */}
        <div className="max-w-md mx-auto">
          {renderPreview()}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a mockup preview showing how the generated identity data would appear 
            on social media platforms. Profile images are automatically generated avatars.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}