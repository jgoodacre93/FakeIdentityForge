import type { IdentityProfile } from "@shared/schema";

export interface Relationship {
  id: string;
  sourceId: number;
  targetId: number;
  type: RelationshipType;
  strength: number; // 0-1 scale
  description: string;
  context: string;
}

export type RelationshipType = 
  | "family"
  | "colleague" 
  | "friend"
  | "romantic"
  | "neighbor"
  | "business"
  | "social_media"
  | "education"
  | "healthcare"
  | "legal";

export interface NetworkNode {
  id: number;
  profile: IdentityProfile;
  x: number;
  y: number;
  connections: Relationship[];
}

export class RelationshipNetworkGenerator {
  private profiles: IdentityProfile[];
  private relationships: Relationship[];

  constructor(profiles: IdentityProfile[]) {
    this.profiles = profiles;
    this.relationships = [];
  }

  generateNetwork(): { nodes: NetworkNode[], edges: Relationship[] } {
    this.relationships = [];
    
    // Generate relationships between profiles
    for (let i = 0; i < this.profiles.length; i++) {
      for (let j = i + 1; j < this.profiles.length; j++) {
        const source = this.profiles[i];
        const target = this.profiles[j];
        
        const possibleRelationships = this.calculatePossibleRelationships(source, target);
        
        // Generate 1-3 relationships per pair based on compatibility
        const numRelationships = Math.floor(Math.random() * 3) + 1;
        
        for (let k = 0; k < Math.min(numRelationships, possibleRelationships.length); k++) {
          if (Math.random() < 0.7) { // 70% chance of creating a relationship
            const relationship = possibleRelationships[k];
            this.relationships.push(relationship);
          }
        }
      }
    }

    // Create network nodes with positions
    const nodes = this.profiles.map((profile, index) => ({
      id: profile.id,
      profile,
      x: Math.cos((index * 2 * Math.PI) / this.profiles.length) * 200 + 300,
      y: Math.sin((index * 2 * Math.PI) / this.profiles.length) * 200 + 300,
      connections: this.relationships.filter(r => 
        r.sourceId === profile.id || r.targetId === profile.id
      )
    }));

    return { nodes, edges: this.relationships };
  }

  private calculatePossibleRelationships(source: IdentityProfile, target: IdentityProfile): Relationship[] {
    const relationships: Relationship[] = [];
    
    // Family relationships (same last name or close age)
    if (this.shareLastName(source, target) || this.isAgeCompatibleForFamily(source, target)) {
      relationships.push(this.createRelationship(source, target, "family"));
    }

    // Colleague relationships (same company or industry)
    if (source.company === target.company) {
      relationships.push(this.createRelationship(source, target, "colleague"));
    } else if (source.industry === target.industry && Math.random() < 0.3) {
      relationships.push(this.createRelationship(source, target, "business"));
    }

    // Neighbor relationships (same city)
    if (source.city === target.city && Math.random() < 0.4) {
      relationships.push(this.createRelationship(source, target, "neighbor"));
    }

    // Friend relationships (similar age, same city, or shared interests)
    if (this.isAgeCompatibleForFriendship(source, target) && 
        (source.city === target.city || Math.random() < 0.2)) {
      relationships.push(this.createRelationship(source, target, "friend"));
    }

    // Social media connections (high probability for younger people)
    if (Math.random() < this.calculateSocialMediaProbability(source, target)) {
      relationships.push(this.createRelationship(source, target, "social_media"));
    }

    // Romantic relationships (appropriate age gap, compatible orientations)
    if (this.isRomanticCompatible(source, target)) {
      relationships.push(this.createRelationship(source, target, "romantic"));
    }

    // Education relationships (similar age, same country)
    if (Math.abs(source.age - target.age) <= 5 && 
        source.country === target.country && 
        Math.random() < 0.3) {
      relationships.push(this.createRelationship(source, target, "education"));
    }

    // Healthcare relationships (same city, age difference for doctor-patient)
    if (source.city === target.city && 
        (source.jobTitle.includes("Doctor") || target.jobTitle.includes("Doctor") ||
         source.jobTitle.includes("Nurse") || target.jobTitle.includes("Nurse"))) {
      relationships.push(this.createRelationship(source, target, "healthcare"));
    }

    // Legal relationships (if one has criminal record)
    if ((source.criminalRecord === "Has Records" || target.criminalRecord === "Has Records") &&
        (source.jobTitle.includes("Attorney") || target.jobTitle.includes("Attorney") ||
         source.jobTitle.includes("Legal") || target.jobTitle.includes("Legal"))) {
      relationships.push(this.createRelationship(source, target, "legal"));
    }

    return relationships.sort((a, b) => b.strength - a.strength);
  }

  private createRelationship(
    source: IdentityProfile, 
    target: IdentityProfile, 
    type: RelationshipType
  ): Relationship {
    const strength = this.calculateRelationshipStrength(source, target, type);
    const description = this.generateRelationshipDescription(source, target, type);
    const context = this.generateRelationshipContext(source, target, type);

    return {
      id: `${source.id}-${target.id}-${type}`,
      sourceId: source.id,
      targetId: target.id,
      type,
      strength,
      description,
      context
    };
  }

  private shareLastName(source: IdentityProfile, target: IdentityProfile): boolean {
    return source.lastName === target.lastName;
  }

  private isAgeCompatibleForFamily(source: IdentityProfile, target: IdentityProfile): boolean {
    const ageDiff = Math.abs(source.age - target.age);
    return ageDiff >= 15 && ageDiff <= 40; // Parent-child or sibling relationships
  }

  private isAgeCompatibleForFriendship(source: IdentityProfile, target: IdentityProfile): boolean {
    return Math.abs(source.age - target.age) <= 15;
  }

  private calculateSocialMediaProbability(source: IdentityProfile, target: IdentityProfile): number {
    let probability = 0.6; // Base probability
    
    // Higher for younger people
    if (source.age < 30 && target.age < 30) probability += 0.3;
    else if (source.age < 50 && target.age < 50) probability += 0.1;
    
    // Same city increases probability
    if (source.city === target.city) probability += 0.2;
    
    // Similar industries
    if (source.industry === target.industry) probability += 0.1;
    
    return Math.min(probability, 0.9);
  }

  private isRomanticCompatible(source: IdentityProfile, target: IdentityProfile): boolean {
    const ageDiff = Math.abs(source.age - target.age);
    
    // Age compatibility (within 20 years, both adults)
    if (ageDiff > 20 || source.age < 18 || target.age < 18) return false;
    
    // Both single or divorced
    const compatibleStatus = ["Single", "Divorced", "Widowed"];
    if (!compatibleStatus.includes(source.maritalStatus) || 
        !compatibleStatus.includes(target.maritalStatus)) return false;
    
    // Sexual orientation compatibility (simplified)
    const orientationMatch = this.checkOrientationCompatibility(
      source.sexualOrientation, 
      target.sexualOrientation,
      source.genderIdentity,
      target.genderIdentity
    );
    
    return orientationMatch && Math.random() < 0.1; // Low probability for romantic connections
  }

  private checkOrientationCompatibility(
    orientation1: string, 
    orientation2: string,
    gender1: string,
    gender2: string
  ): boolean {
    // Simplified compatibility check
    const universal = ["Pansexual", "Bisexual", "Queer"];
    
    if (universal.includes(orientation1) || universal.includes(orientation2)) {
      return true;
    }
    
    // Additional compatibility logic could be added here
    return Math.random() < 0.5;
  }

  private calculateRelationshipStrength(
    source: IdentityProfile, 
    target: IdentityProfile, 
    type: RelationshipType
  ): number {
    let strength = 0.5; // Base strength
    
    switch (type) {
      case "family":
        strength = 0.9;
        if (this.shareLastName(source, target)) strength = 0.95;
        break;
      case "romantic":
        strength = 0.8;
        break;
      case "colleague":
        strength = 0.7;
        if (source.company === target.company) strength = 0.8;
        break;
      case "friend":
        strength = 0.6;
        if (source.city === target.city) strength += 0.1;
        if (Math.abs(source.age - target.age) <= 5) strength += 0.1;
        break;
      case "neighbor":
        strength = 0.4;
        break;
      case "social_media":
        strength = 0.3;
        break;
      default:
        strength = 0.5;
    }
    
    return Math.min(strength + (Math.random() * 0.2 - 0.1), 1.0);
  }

  private generateRelationshipDescription(
    source: IdentityProfile, 
    target: IdentityProfile, 
    type: RelationshipType
  ): string {
    switch (type) {
      case "family":
        if (this.shareLastName(source, target)) {
          const ageDiff = Math.abs(source.age - target.age);
          if (ageDiff >= 20) return "Parent-Child";
          if (ageDiff <= 10) return "Siblings";
          return "Extended Family";
        }
        return "Family Friend";
      
      case "colleague":
        if (source.company === target.company) {
          return `Colleagues at ${source.company}`;
        }
        return `${source.industry} Professional Network`;
      
      case "friend":
        if (source.city === target.city) {
          return `Friends in ${source.city}`;
        }
        return "Long-distance Friends";
      
      case "romantic":
        if (source.maritalStatus === "Single" && target.maritalStatus === "Single") {
          return "Dating";
        }
        return "Romantic Connection";
      
      case "neighbor":
        return `Neighbors in ${source.city}`;
      
      case "business":
        return `${source.industry} Business Connection`;
      
      case "social_media":
        return "Social Media Connection";
      
      case "education":
        return "School Connection";
      
      case "healthcare":
        return "Doctor-Patient Relationship";
      
      case "legal":
        return "Legal Representation";
      
      default:
        return "Connected";
    }
  }

  private generateRelationshipContext(
    source: IdentityProfile, 
    target: IdentityProfile, 
    type: RelationshipType
  ): string {
    switch (type) {
      case "family":
        return `Share family ties${this.shareLastName(source, target) ? ' and surname' : ''}`;
      
      case "colleague":
        return `Work together in ${source.industry} industry`;
      
      case "friend":
        return `Connected through mutual interests and ${source.city} community`;
      
      case "romantic":
        return `Met through ${source.city === target.city ? 'local' : 'online'} connections`;
      
      case "neighbor":
        return `Live in the same neighborhood in ${source.city}`;
      
      case "business":
        return `Professional network in ${source.industry}`;
      
      case "social_media":
        return `Connected on social media platforms`;
      
      case "education":
        return `Met during education years`;
      
      case "healthcare":
        return `Medical professional relationship`;
      
      case "legal":
        return `Legal services and representation`;
      
      default:
        return `Connected through various circumstances`;
    }
  }
}