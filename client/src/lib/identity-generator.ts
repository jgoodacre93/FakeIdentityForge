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
  creditCardTypes,
  socialMediaPlatforms,
  adultPlatforms,
  socialMediaUsernames,
  adultUsernames,
  getRandomElement,
  getRandomNumber,
  getRandomBoolean
} from "./data-sets";

function generateCreditCardNumber(cardType: { name: string; prefix: string; length: number }): string {
  const { prefix, length } = cardType;
  let cardNumber = prefix;
  
  // Generate remaining digits
  while (cardNumber.length < length - 1) {
    cardNumber += getRandomNumber(0, 9).toString();
  }
  
  // Add check digit using Luhn algorithm
  const checkDigit = calculateLuhnCheckDigit(cardNumber);
  cardNumber += checkDigit;
  
  // Format with spaces for readability
  return cardNumber.replace(/(.{4})/g, '$1 ').trim();
}

function calculateLuhnCheckDigit(cardNumber: string): number {
  let sum = 0;
  let alternate = true;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }
    
    sum += digit;
    alternate = !alternate;
  }
  
  return (10 - (sum % 10)) % 10;
}

function generateCreditCardExpiry(): string {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  // Generate expiry date 1-5 years in the future
  const expiryYear = currentYear + getRandomNumber(1, 5);
  const expiryMonth = getRandomNumber(1, 12);
  
  // If it's the same year, make sure month is in the future
  const finalMonth = expiryYear === currentYear && expiryMonth <= currentMonth 
    ? getRandomNumber(currentMonth + 1, 12) 
    : expiryMonth;
  
  return `${finalMonth.toString().padStart(2, '0')}/${expiryYear.toString().slice(-2)}`;
}

function generateCreditCardCvv(cardType: { name: string; prefix: string; length: number }): string {
  // American Express uses 4-digit CVV, others use 3-digit
  const cvvLength = cardType.name === "American Express" ? 4 : 3;
  return Array.from({ length: cvvLength }, () => getRandomNumber(0, 9)).join('');
}

function generateSocialMediaProfiles(firstName: string, lastName: string): string {
  const profiles = [];
  const numProfiles = getRandomNumber(4, 8); // Generate 4-8 social media profiles
  const selectedPlatforms = [];
  
  // Always include the most common platforms
  const commonPlatforms = ["Facebook", "Instagram", "Twitter/X"];
  selectedPlatforms.push(...commonPlatforms);
  
  // Add additional random platforms
  while (selectedPlatforms.length < numProfiles) {
    const platform = getRandomElement(socialMediaPlatforms);
    if (!selectedPlatforms.includes(platform)) {
      selectedPlatforms.push(platform);
    }
  }
  
  for (const platform of selectedPlatforms) {
    const baseUsername = getRandomElement(socialMediaUsernames);
    const usernameVariations = [
      baseUsername,
      `${baseUsername}_${getRandomNumber(10, 99)}`,
      `${firstName.toLowerCase()}_${baseUsername}`,
      `${baseUsername}_${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}${getRandomNumber(10, 999)}`,
      `${baseUsername}${getRandomNumber(2000, 2024)}`
    ];
    
    const username = getRandomElement(usernameVariations);
    const followers = getRandomNumber(50, 50000);
    const following = getRandomNumber(100, 2000);
    const posts = getRandomNumber(20, 5000);
    
    profiles.push(`${platform}: @${username} (${followers.toLocaleString()} followers, ${following} following, ${posts} posts)`);
  }
  
  return profiles.join('\n');
}

function generateAdultSiteProfiles(firstName: string, genderIdentity: string): string {
  const profiles = [];
  const numProfiles = getRandomNumber(2, 6); // Generate 2-6 adult site profiles
  const selectedPlatforms = [];
  
  // Always include OnlyFans as it's most common
  selectedPlatforms.push("OnlyFans");
  
  // Add additional random platforms
  while (selectedPlatforms.length < numProfiles) {
    const platform = getRandomElement(adultPlatforms);
    if (!selectedPlatforms.includes(platform)) {
      selectedPlatforms.push(platform);
    }
  }
  
  for (const platform of selectedPlatforms) {
    const baseUsername = getRandomElement(adultUsernames);
    const usernameVariations = [
      baseUsername,
      `${baseUsername}${getRandomNumber(10, 99)}`,
      `${firstName.toLowerCase()}_${baseUsername}`,
      `${baseUsername}_vip`,
      `${baseUsername}_official`,
      `real_${baseUsername}`
    ];
    
    const username = getRandomElement(usernameVariations);
    const subscribers = getRandomNumber(100, 100000);
    const monthlyEarnings = getRandomNumber(500, 50000);
    const contentCount = getRandomNumber(50, 2000);
    
    let profileType = "Content Creator";
    if (platform.includes("Cam") || platform.includes("Live") || platform.includes("Chat")) {
      profileType = "Live Performer";
    } else if (platform.includes("Hub") || platform.includes("Videos")) {
      profileType = "Video Content";
    }
    
    profiles.push(`${platform}: @${username} (${subscribers.toLocaleString()} subscribers, $${monthlyEarnings.toLocaleString()}/month, ${contentCount} content items, ${profileType})`);
  }
  
  return profiles.join('\n');
}

export function generateIdentityProfile(): InsertIdentityProfile {
  const birthGender = getRandomElement(["Male", "Female"]);
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
  const state: string | null = isUS ? getRandomElement(usStates) : null;
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
  
  // Credit card generation
  const cardType = getRandomElement(creditCardTypes);
  const creditCardNumber = generateCreditCardNumber(cardType);
  const creditCardExpiry = generateCreditCardExpiry();
  const creditCardCvv = generateCreditCardCvv(cardType);
  
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
    birthGender,
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
    
    socialMediaProfiles: generateSocialMediaProfiles(firstName, lastName),
    adultSiteProfiles: generateAdultSiteProfiles(firstName, genderData.identity),
    
    bloodType: getRandomElement(bloodTypes),
    medicalConditions: conditions,
    
    bankName: bank,
    accountType: getRandomElement(["Checking", "Savings", "Checking & Savings"]),
    routingNumber: generateRoutingNumber(),
    creditScore: getRandomElement(creditScores),
    
    creditCardNumber,
    creditCardType: cardType.name,
    creditCardExpiry,
    creditCardCvv,
    
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
    "Trespassing (2021)",
    "Driving Under the Influence (2020)",
    "Assault (Misdemeanor) (2017)",
    "Vandalism (2019)",
    "Theft (2018)",
    "Drug Possession (2020)",
    "Reckless Driving (2021)",
    "Disturbing the Peace (2019)",
    "Fraud (2018)",
    "Embezzlement (2017)",
    "Burglary (2019)",
    "Identity Theft (2020)",
    "Tax Evasion (2018)",
    "Money Laundering (2017)",
    "Cybercrime (2021)",
    "Forgery (2019)",
    "Perjury (2020)",
    "Bribery (2018)",
    "Extortion (2017)",
    "Stalking (2019)",
    "Harassment (2020)",
    "Domestic Violence (2018)",
    "Child Neglect (2017)",
    "Elder Abuse (2019)",
    "Animal Cruelty (2020)",
    "Environmental Crime (2018)",
    "Corporate Fraud (2017)",
    "Securities Fraud (2019)",
    "Insurance Fraud (2020)",
    "Medicare Fraud (2018)",
    "Wire Fraud (2017)",
    "Mail Fraud (2019)",
    "Bank Fraud (2020)",
    "Credit Card Fraud (2018)",
    "Mortgage Fraud (2017)",
    "Bankruptcy Fraud (2019)",
    "Immigration Fraud (2020)",
    "Welfare Fraud (2018)",
    "Organized Crime (2017)",
    "Racketeering (2019)",
    "Human Trafficking (2020)",
    "Arms Trafficking (2018)",
    "Drug Trafficking (2017)",
    "Weapons Violation (2019)",
    "Arson (2020)",
    "Kidnapping (2018)",
    "Robbery (2017)",
    "Aggravated Assault (2019)",
    "Sexual Assault (2020)",
    "Manslaughter (2018)",
    "Vehicular Homicide (2017)",
    "Hate Crime (2019)",
    "Terrorism (2020)",
    "Espionage (2018)",
    "Treason (2017)"
  ];
  const count = getRandomNumber(1, 4);
  const selectedOffenses = [];
  const shuffled = [...offenses].sort(() => 0.5 - Math.random());
  
  for (let i = 0; i < count && i < shuffled.length; i++) {
    selectedOffenses.push(shuffled[i]);
  }
  
  return selectedOffenses.join(", ");
}

export function generateMultipleProfiles(count: number): InsertIdentityProfile[] {
  return Array.from({ length: count }, () => generateIdentityProfile());
}