import { useState } from "react";
import type { IdentityProfile } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileCode, FileSpreadsheet, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportActionsProps {
  profiles: IdentityProfile[];
  currentProfile: IdentityProfile;
}

export function ExportActions({ profiles, currentProfile }: ExportActionsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportJSON = async () => {
    setIsExporting(true);
    try {
      const data = profiles.length === 1 ? currentProfile : profiles;
      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fake_identity_profiles_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: `Exported ${profiles.length} profile${profiles.length > 1 ? 's' : ''} as JSON`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export JSON file",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportCSV = async () => {
    setIsExporting(true);
    try {
      const headers = [
        'Full Name', 'Age', 'Birth Gender', 'Gender Identity', 'Pronouns', 'Sexual Orientation', 'Ethnicity',
        'Email', 'Phone', 'Address', 'City', 'State', 'Zip Code', 'Country', 'Citizenship Status',
        'Height', 'Weight', 'Hair Color', 'Eye Color', 'Job Title', 'Company', 'Industry',
        'Annual Income', 'Marital Status', 'Spouse Name', 'Social Media Profiles', 'Adult Site Profiles',
        'Blood Type', 'Medical Conditions', 'Bank Name', 'Account Type', 'Credit Score', 
        'Credit Card Type', 'Credit Card Number', 'Credit Card Expiry', 'Credit Card CVV', 'Criminal Record'
      ];
      
      const csvContent = [
        headers.join(','),
        ...profiles.map(profile => [
          `"${profile.fullName}"`,
          profile.age,
          `"${profile.birthGender}"`,
          `"${profile.genderIdentity}"`,
          `"${profile.pronouns}"`,
          `"${profile.sexualOrientation}"`,
          `"${profile.ethnicity}"`,
          `"${profile.email}"`,
          `"${profile.phone}"`,
          `"${profile.address}"`,
          `"${profile.city}"`,
          `"${profile.state || ''}"`,
          `"${profile.zipCode}"`,
          `"${profile.country}"`,
          `"${profile.citizenshipStatus}"`,
          `"${profile.height}"`,
          `"${profile.weight}"`,
          `"${profile.hairColor}"`,
          `"${profile.eyeColor}"`,
          `"${profile.jobTitle}"`,
          `"${profile.company}"`,
          `"${profile.industry}"`,
          `"${profile.annualIncome}"`,
          `"${profile.maritalStatus}"`,
          `"${profile.spouseName || ''}"`,
          `"${profile.socialMediaProfiles.replace(/\n/g, '; ')}"`,
          `"${profile.adultSiteProfiles.replace(/\n/g, '; ')}"`,
          `"${profile.bloodType}"`,
          `"${profile.medicalConditions}"`,
          `"${profile.bankName}"`,
          `"${profile.accountType}"`,
          `"${profile.creditScore}"`,
          `"${profile.creditCardType}"`,
          `"${profile.creditCardNumber}"`,
          `"${profile.creditCardExpiry}"`,
          `"${profile.creditCardCvv}"`,
          `"${profile.criminalRecord}"`
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fake_identity_profiles_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: `Exported ${profiles.length} profile${profiles.length > 1 ? 's' : ''} as CSV`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export CSV file",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportText = async () => {
    setIsExporting(true);
    try {
      const textContent = profiles.map(profile => {
        return `
IDENTITY PROFILE
================

BASIC INFORMATION
Full Name: ${profile.fullName}
Age: ${profile.age}
Date of Birth: ${profile.dateOfBirth}
Birth Gender: ${profile.birthGender}
Gender Identity: ${profile.genderIdentity} (${profile.pronouns})
Sexual Orientation: ${profile.sexualOrientation}
Ethnicity: ${profile.ethnicity}
Marital Status: ${profile.maritalStatus}${profile.spouseName ? ` to ${profile.spouseName}` : ''}

CONTACT INFORMATION
Email: ${profile.email}
Phone: ${profile.phone}
Address: ${profile.address}, ${profile.city}${profile.state ? `, ${profile.state}` : ''} ${profile.zipCode}
Country: ${profile.country}
Citizenship: ${profile.citizenshipStatus}

PHYSICAL ATTRIBUTES
Height: ${profile.height}
Weight: ${profile.weight}
Build: ${profile.build}
Hair Color: ${profile.hairColor}
Eye Color: ${profile.eyeColor}
Skin Tone: ${profile.skinTone}
Measurements: ${profile.bodyMeasurements}

PROFESSIONAL INFORMATION
Job Title: ${profile.jobTitle}
Company: ${profile.company}
Industry: ${profile.industry}
Annual Income: ${profile.annualIncome}

SOCIAL MEDIA PROFILES
${profile.socialMediaProfiles}

ADULT PLATFORM PROFILES
${profile.adultSiteProfiles}

HEALTH INFORMATION
Blood Type: ${profile.bloodType}
Medical Conditions: ${profile.medicalConditions}

BANKING INFORMATION
Bank: ${profile.bankName}
Account Type: ${profile.accountType}
Routing Number: ${profile.routingNumber}
Credit Score: ${profile.creditScore}

CREDIT CARD INFORMATION
Card Type: ${profile.creditCardType}
Card Number: ${profile.creditCardNumber}
Expiry Date: ${profile.creditCardExpiry}
CVV: ${profile.creditCardCvv}

CRIMINAL RECORDS
Status: ${profile.criminalRecord}${profile.criminalHistory ? `\nHistory: ${profile.criminalHistory}` : ''}

================
        `.trim();
      }).join('\n\n' + '='.repeat(50) + '\n\n');
      
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fake_identity_profiles_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: `Exported ${profiles.length} profile${profiles.length > 1 ? 's' : ''} as text`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export text file",
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
          <Download className="mr-2 text-blue-600" />
          Export Profile{profiles.length > 1 ? 's' : ''}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={exportJSON}
          disabled={isExporting}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <FileCode className="mr-2 w-4 h-4" />
          Export as JSON
        </Button>
        <Button
          onClick={exportCSV}
          disabled={isExporting}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          <FileSpreadsheet className="mr-2 w-4 h-4" />
          Export as CSV
        </Button>
        <Button
          onClick={exportText}
          disabled={isExporting}
          className="w-full bg-gray-600 hover:bg-gray-700"
        >
          <FileText className="mr-2 w-4 h-4" />
          Export as Text
        </Button>
      </CardContent>
    </Card>
  );
}
