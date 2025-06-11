import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Network, Zap, RefreshCw } from "lucide-react";
import { RelationshipNetworkGenerator, type NetworkNode, type Relationship } from "@/lib/relationship-generator";
import { getProfileTypeColor, getRiskLevelColor } from "@/lib/profile-colors";
import type { IdentityProfile } from "@shared/schema";

interface RelationshipNetworkProps {
  profiles: IdentityProfile[];
}

export function RelationshipNetwork({ profiles }: RelationshipNetworkProps) {
  const [networkData, setNetworkData] = useState<{ nodes: NetworkNode[], edges: Relationship[] } | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Relationship | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Convert Tailwind color classes to hex values for SVG
  const getHexColor = (profileType: string) => {
    const colorMap = {
      "Young Professional": "#3b82f6",
      "Adult Content Creator": "#ec4899",
      "High-Risk Individual": "#ef4444",
      "Senior Executive": "#8b5cf6",
      "Creative Professional": "#10b981",
      "Student/Young Adult": "#f59e0b",
      "Senior Citizen": "#64748b",
      "General Population": "#64748b"
    };
    return colorMap[profileType as keyof typeof colorMap] || "#64748b";
  };

  const generateNetwork = async () => {
    if (profiles.length < 2) return;
    
    setIsGenerating(true);
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generator = new RelationshipNetworkGenerator(profiles);
    const network = generator.generateNetwork();
    setNetworkData(network);
    setIsGenerating(false);
  };

  useEffect(() => {
    if (profiles.length >= 2) {
      generateNetwork();
    }
  }, [profiles]);

  const getRelationshipColor = (type: string, strength: number) => {
    const colors = {
      family: "#ef4444", // red
      romantic: "#ec4899", // pink
      colleague: "#3b82f6", // blue
      friend: "#10b981", // green
      neighbor: "#f59e0b", // amber
      business: "#8b5cf6", // purple
      social_media: "#06b6d4", // cyan
      education: "#84cc16", // lime
      healthcare: "#f97316", // orange
      legal: "#6b7280" // gray
    };
    
    const baseColor = colors[type as keyof typeof colors] || "#6b7280";
    const opacity = Math.max(strength, 0.3);
    
    return `${baseColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const handleEdgeClick = (edge: Relationship) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  if (profiles.length < 2) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="w-5 h-5" />
            <span>AI Relationship Network</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Generate at least 2 profiles to see relationship connections</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Network className="w-5 h-5" />
            <span>AI Relationship Network</span>
            <Badge variant="secondary" className="ml-2">
              <Zap className="w-3 h-3 mr-1" />
              AI Generated
            </Badge>
          </CardTitle>
          <Button 
            onClick={generateNetwork}
            disabled={isGenerating}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Intelligent relationship mapping based on demographics, location, occupation, and social factors
        </p>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-sm text-gray-600">AI analyzing connections...</p>
            </div>
          </div>
        ) : networkData ? (
          <div className="space-y-4">
            {/* Network Visualization */}
            <div className="border rounded-lg bg-gray-50 relative overflow-hidden">
              <svg
                ref={svgRef}
                width="100%"
                height="500"
                viewBox="0 0 600 500"
                className="w-full h-[500px]"
              >
                {/* Render edges first (behind nodes) */}
                {networkData.edges.map((edge) => {
                  const sourceNode = networkData.nodes.find(n => n.id === edge.sourceId);
                  const targetNode = networkData.nodes.find(n => n.id === edge.targetId);
                  
                  if (!sourceNode || !targetNode) return null;
                  
                  return (
                    <line
                      key={edge.id}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={getRelationshipColor(edge.type, edge.strength)}
                      strokeWidth={Math.max(edge.strength * 4, 1)}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleEdgeClick(edge)}
                    />
                  );
                })}
                
                {/* Render nodes */}
                {networkData.nodes.map((node) => {
                  const colorHex = getHexColor(node.profile.profileType);
                  const isSelected = selectedNode?.id === node.id;
                  
                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? 25 : 20}
                        fill={colorHex}
                        stroke={isSelected ? "#000" : "#fff"}
                        strokeWidth={isSelected ? 3 : 2}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => handleNodeClick(node)}
                      />
                      <text
                        x={node.x}
                        y={node.y + 35}
                        textAnchor="middle"
                        className="text-xs font-medium fill-gray-700"
                        style={{ fontSize: '11px' }}
                      >
                        {node.profile.firstName}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 47}
                        textAnchor="middle"
                        className="text-xs fill-gray-500"
                        style={{ fontSize: '9px' }}
                      >
                        {node.profile.age}y
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Network Statistics */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{networkData.nodes.length}</div>
                <div className="text-sm text-blue-800">Profiles</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{networkData.edges.length}</div>
                <div className="text-sm text-green-800">Connections</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((networkData.edges.reduce((sum, edge) => sum + edge.strength, 0) / networkData.edges.length) * 100)}%
                </div>
                <div className="text-sm text-purple-800">Avg Strength</div>
              </div>
            </div>

            {/* Selected Node/Edge Details */}
            {selectedNode && (
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  {selectedNode.profile.fullName}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">Age:</span> {selectedNode.profile.age}
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Location:</span> {selectedNode.profile.city}
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Occupation:</span> {selectedNode.profile.jobTitle}
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Connections:</span> {selectedNode.connections.length}
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-blue-700 font-medium">Connected to:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedNode.connections.slice(0, 5).map((conn) => {
                      const otherProfile = networkData.nodes.find(n => 
                        n.id === (conn.sourceId === selectedNode.id ? conn.targetId : conn.sourceId)
                      )?.profile;
                      return (
                        <Badge key={conn.id} variant="outline" className="text-xs">
                          {otherProfile?.firstName} ({conn.type})
                        </Badge>
                      );
                    })}
                    {selectedNode.connections.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{selectedNode.connections.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedEdge && (
              <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  Relationship Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-green-700 font-medium">Type:</span> 
                    <Badge className="ml-2" style={{ backgroundColor: getRelationshipColor(selectedEdge.type, 1).slice(0, -2) }}>
                      {selectedEdge.type}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Strength:</span> {Math.round(selectedEdge.strength * 100)}%
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Description:</span> {selectedEdge.description}
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Context:</span> {selectedEdge.context}
                  </div>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-3">Relationship Types</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                {[
                  { type: "family", label: "Family", color: "#ef4444" },
                  { type: "romantic", label: "Romantic", color: "#ec4899" },
                  { type: "colleague", label: "Colleague", color: "#3b82f6" },
                  { type: "friend", label: "Friend", color: "#10b981" },
                  { type: "neighbor", label: "Neighbor", color: "#f59e0b" },
                  { type: "business", label: "Business", color: "#8b5cf6" },
                  { type: "social_media", label: "Social Media", color: "#06b6d4" },
                  { type: "education", label: "Education", color: "#84cc16" },
                  { type: "healthcare", label: "Healthcare", color: "#f97316" },
                  { type: "legal", label: "Legal", color: "#6b7280" }
                ].map((item) => (
                  <div key={item.type} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}