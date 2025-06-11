import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfileTypeColor, getRiskLevelColor } from "@/lib/profile-colors";
import { UserCheck, AlertTriangle, CheckCircle, Info } from "lucide-react";

const profileTypes = [
  "Young Professional",
  "Adult Content Creator", 
  "High-Risk Individual",
  "Senior Executive",
  "Creative Professional",
  "Student/Young Adult",
  "Senior Citizen",
  "General Population"
];

const riskLevels = ["Low", "Medium", "High"];

export function ProfileLegend() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="mr-2 w-5 h-5 text-blue-600" />
          Profile Classification Legend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Types */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Profile Types</h4>
            <div className="space-y-2">
              {profileTypes.map((type) => {
                const colors = getProfileTypeColor(type);
                return (
                  <div
                    key={type}
                    className={`flex items-center px-3 py-2 rounded-lg border ${colors.bg} ${colors.border}`}
                  >
                    <UserCheck className={`w-4 h-4 mr-2 ${colors.icon}`} />
                    <span className={`text-sm font-medium ${colors.text}`}>
                      {type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Levels */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Risk Levels</h4>
            <div className="space-y-2">
              {riskLevels.map((level) => {
                const colors = getRiskLevelColor(level);
                return (
                  <div
                    key={level}
                    className={`flex items-center px-3 py-2 rounded-lg border ${colors.bg} ${colors.border}`}
                  >
                    <div className={`w-3 h-3 rounded-full mr-2 ${colors.dot}`}></div>
                    <span className={`text-sm font-medium ${colors.text}`}>
                      {level} Risk
                    </span>
                    {level === "High" && <AlertTriangle className="w-4 h-4 ml-2 text-red-500" />}
                    {level === "Low" && <CheckCircle className="w-4 h-4 ml-2 text-green-500" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Classification Criteria:</strong> Profile types are determined by age, industry, online presence, and activity patterns. 
            Risk levels consider criminal history, credit score, age factors, and profile characteristics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}