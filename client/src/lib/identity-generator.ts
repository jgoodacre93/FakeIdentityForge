import { InsertIdentityProfile } from "@shared/schema";
import { 
  firstNames, 
  lastNames, 
  cities, 
  companies, 
  jobTitles, 
  medicalConditions,
  genderIdentities,
  sexualOrientations,
  ethnicities,
  countries,
  usStates,
  banks,
  getRandomElement,
  getRandomNumber,
  getRandomBoolean
} from "./data-sets";

export function generateIdentityProfile(): InsertIdentityProfile {
  const genderData = getRandomElement(genderIdentities);
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const fullName = `${firstName} ${lastName}`;
  const age = getRandomNumber(18, 80);
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const dateOfBirth = `${getRandomNumber(1, 12).toString().padStart(2, '0')}/${getRandomNumber(1, 28).toString().padStart(2, '0')}/${birthYear}`;
  
  const country = getRandomElement(countries);
  const isUS = country === "United States";
  const state = isUS ? getRandomElement(usStates) : null;
  const city = getRandomElement(cities);
  
  const company = getRandomElement(companies);
  const jobTitle = getRandomElement(jobTitles);
  const industry = getRandomElement([
    "Technology", "Healthcare", "Finance", "Education", "Manufacturing",
    "Retail", "Consulting", "Media", "Government", "Non-profit"
  ]);
  
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed", "In a relationship"];
  const maritalStatus = getRandomElement(maritalStatusOptions);
  const spouseName = maritalStatus === "Married" ? 
    `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}` : null;
  
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const conditions = getRandomElement(medicalConditions);
  
  const bank = getRandomElement(banks);
  const creditScores = ["Excellent (750-850)", "Good (700-749)", "Fair (650-699)", "Poor (300-649)"];
  
  const hasCriminalRecord = getRandomBoolean(0.15); // 15% chance
  
  const heights = [
    "5'2\" (157 cm)", "5'3\" (160 cm)", "5'4\" (163 cm)", "5'5\" (165 cm)",
    "5'6\" (168 cm)", "5'7\" (170 cm)", "5'8\" (173 cm)", "5'9\" (175 cm)",
    "5'10\" (178 cm)", "5'11\" (180 cm)", "6'0\" (183 cm)", "6'1\" (185 cm)",
    "6'2\" (188 cm)", "6'3\" (191 cm)"
  ];
  
  const weights = [
    "120 lbs (54 kg)", "130 lbs (59 kg)", "140 lbs (64 kg)", "150 lbs (68 kg)",
    "160 lbs (73 kg)", "170 lbs (77 kg)", "180 lbs (82 kg)", "190 lbs (86 kg)",
    "200 lbs (91 kg)", "210 lbs (95 kg)", "220 lbs (100 kg)"
  ];
  
  const builds = ["Slim", "Athletic", "Average", "Muscular", "Heavy"];
  const hairColors = ["Black", "Brown", "Blonde", "Auburn", "Red", "Gray", "White"];
  const eyeColors = ["Brown", "Blue", "Green", "Hazel", "Gray", "Amber"];
  const skinTones = ["Fair", "Light", "Medium", "Olive", "Tan", "Dark", "Deep"];
  
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${getRandomNumber(1, 999)}`;
  
  return {
    fullName,
    firstName,
    lastName,
    age,
    dateOfBirth,
    genderIdentity: genderData.identity,
    pronouns: genderData.pronouns,
    sexualOrientation: getRandomElement(sexualOrientations),
    ethnicity: getRandomElement(ethnicities),
    nationality: country,
    
    email: `${username}@${getRandomElement(["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "protonmail.com"])}`,
    phone: `+1 (${getRandomNumber(200, 999)}) ${getRandomNumber(100, 999)}-${getRandomNumber(1000, 9999)}`,
    address: `${getRandomNumber(1, 9999)} ${getRandomElement(["Main St", "Oak Ave", "Elm Dr", "Park Blvd", "First St", "Second Ave"])}`,
    city,
    state,
    zipCode: getRandomNumber(10000, 99999).toString(),
    country,
    citizenshipStatus: getRandomElement([
      "Born Citizen", "Naturalized Citizen", "Permanent Resident", "Work Visa", "Student Visa"
    ]),
    
    height: getRandomElement(heights),
    weight: getRandomElement(weights),
    build: getRandomElement(builds),
    hairColor: getRandomElement(hairColors),
    eyeColor: getRandomElement(eyeColors),
    skinTone: getRandomElement(skinTones),
    bodyMeasurements: generateBodyMeasurements(),
    
    jobTitle,
    company,
    industry,
    annualIncome: `$${(getRandomNumber(30, 200) * 1000).toLocaleString()}`,
    
    maritalStatus,
    spouseName,
    
    linkedinUrl: `linkedin.com/in/${username}`,
    twitterUrl: `twitter.com/${username}`,
    instagramUrl: `instagram.com/${username}`,
    githubUrl: `github.com/${username}`,
    onlyfansUrl: `onlyfans.com/${username}_premium`,
    datingUrl: `seekingarrangement.com/${username}`,
    
    bloodType: getRandomElement(bloodTypes),
    medicalConditions: conditions,
    
    bankName: bank,
    accountType: getRandomElement(["Checking", "Savings", "Checking & Savings"]),
    routingNumber: generateRoutingNumber(),
    creditScore: getRandomElement(creditScores),
    
    criminalRecord: hasCriminalRecord ? "Has Records" : "Clean Record",
    criminalHistory: hasCriminalRecord ? generateCriminalHistory() : null,
  };
}

function generateBodyMeasurements(): string {
  const chest = getRandomNumber(30, 48);
  const waist = getRandomNumber(24, 42);
  const hips = getRandomNumber(30, 48);
  return `${chest}-${waist}-${hips}`;
}

function generateRoutingNumber(): string {
  // Generate a valid-looking routing number
  const firstDigit = getRandomNumber(0, 1);
  const secondDigit = getRandomNumber(1, 2);
  const remainingDigits = Array.from({ length: 7 }, () => getRandomNumber(0, 9)).join('');
  return `${firstDigit}${secondDigit}${remainingDigits}`;
}

function generateCriminalHistory(): string {
  const offenses = [
    "Minor Traffic Violation (2019)",
    "Disorderly Conduct (2018)",
    "Shoplifting (2020)",
    "Public Intoxication (2019)",
    "Trespassing (2021)"
  ];
  const count = getRandomNumber(1, 3);
  return Array.from({ length: count }, () => getRandomElement(offenses)).join(", ");
}

export function generateMultipleProfiles(count: number): InsertIdentityProfile[] {
  return Array.from({ length: count }, () => generateIdentityProfile());
}
