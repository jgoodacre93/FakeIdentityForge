import OpenAI from "openai";
import type { IdentityProfile } from "@shared/schema";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateProfilePhoto(profile: IdentityProfile): Promise<string | null> {
  try {
    // Create a detailed prompt based on the profile
    const prompt = createPhotoPrompt(profile);
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    });

    if (response.data && response.data.length > 0 && response.data[0].url) {
      return response.data[0].url;
    }
    return null;
  } catch (error) {
    if (error instanceof Error && error.message.includes('429')) {
      console.log(`Rate limit reached for photo generation. Skipping photo for ${profile.fullName}`);
    } else {
      console.error("Error generating profile photo:", error);
    }
    return null;
  }
}

function createPhotoPrompt(profile: IdentityProfile): string {
  const age = profile.age;
  const gender = profile.genderIdentity;
  const ethnicity = profile.ethnicity;
  const hairColor = profile.hairColor;
  const eyeColor = profile.eyeColor;
  const build = profile.build;
  const skinTone = profile.skinTone;
  
  // Determine age category for styling
  let ageCategory = "adult";
  if (age < 25) ageCategory = "young adult";
  else if (age < 40) ageCategory = "adult";
  else if (age < 60) ageCategory = "middle-aged";
  else ageCategory = "senior";
  
  // Professional styling based on occupation
  const jobTitle = profile.jobTitle.toLowerCase();
  let styling = "casual professional";
  if (jobTitle.includes("executive") || jobTitle.includes("manager") || jobTitle.includes("director")) {
    styling = "business professional";
  } else if (jobTitle.includes("artist") || jobTitle.includes("creative") || jobTitle.includes("designer")) {
    styling = "creative casual";
  } else if (jobTitle.includes("doctor") || jobTitle.includes("lawyer") || jobTitle.includes("attorney")) {
    styling = "formal professional";
  }
  
  // Build comprehensive prompt
  const prompt = `Professional headshot portrait photo of a ${ageCategory} ${gender.toLowerCase()} person with ${ethnicity.toLowerCase()} features, ${hairColor.toLowerCase()} hair, ${eyeColor.toLowerCase()} eyes, ${skinTone.toLowerCase()} skin tone, ${build.toLowerCase()} build. ${styling} attire. Clean background, professional lighting, high quality, realistic photo, facing camera with slight smile, shoulders visible. Natural appearance, no artistic filters or effects.`;
  
  return prompt;
}

export async function generateMultiplePhotos(profiles: IdentityProfile[]): Promise<Array<{ id: number; photoUrl: string | null }>> {
  const results = [];
  
  for (const profile of profiles) {
    const photoUrl = await generateProfilePhoto(profile);
    results.push({ id: profile.id, photoUrl });
    
    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}