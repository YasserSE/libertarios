import { SPAIN_PROVINCE_COUNTS } from "@/data/mock/affiliate-counts";

export interface RegisteredUser {
  id: string;
  economic: number; // -100 to 100
  social: number; // -100 to 100
  province: string;
  provinceCode: string;
}

/**
 * Deterministic PRNG (mulberry32).
 *
 * These users are generated at module load on both the server and the client,
 * so `Math.random()` produced a different dataset on each side and every
 * component reading it hydrated with mismatched numbers. A fixed seed makes the
 * two renders identical.
 */
const createRandom = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Generate mock registered users
export const generateMockUsers = (count: number = 500, seed = 20260901): RegisteredUser[] => {
  const random = createRandom(seed);
  const provinces = [
    { name: "Madrid", code: "MD", weight: 0.18 },
    { name: "Barcelona", code: "B", weight: 0.15 },
    { name: "Valencia", code: "V", weight: 0.10 },
    { name: "Sevilla", code: "SE", weight: 0.08 },
    { name: "Málaga", code: "MA", weight: 0.06 },
    { name: "Alicante", code: "A", weight: 0.05 },
    { name: "Zaragoza", code: "Z", weight: 0.05 },
    { name: "Bilbao", code: "BI", weight: 0.04 },
    { name: "Murcia", code: "MU", weight: 0.04 },
    { name: "Palma", code: "PM", weight: 0.04 },
    { name: "Las Palmas", code: "GC", weight: 0.03 },
    { name: "Granada", code: "GR", weight: 0.03 },
    { name: "Córdoba", code: "CO", weight: 0.025 },
    { name: "Valladolid", code: "VA", weight: 0.025 },
    { name: "Santander", code: "S", weight: 0.025 },
    { name: "Oviedo", code: "O", weight: 0.025 },
    { name: "Pamplona", code: "NA", weight: 0.025 },
    { name: "San Sebastián", code: "SS", weight: 0.025 },
    { name: "Salamanca", code: "SA", weight: 0.02 },
    { name: "Burgos", code: "BU", weight: 0.02 },
    { name: "Albacete", code: "AB", weight: 0.02 },
    { name: "León", code: "LE", weight: 0.02 },
    { name: "Cádiz", code: "CA", weight: 0.025 },
    { name: "Huelva", code: "H", weight: 0.02 },
    { name: "Almería", code: "AL", weight: 0.02 },
    { name: "Jaén", code: "J", weight: 0.02 },
    { name: "Toledo", code: "TO", weight: 0.02 },
    { name: "Badajoz", code: "BA", weight: 0.02 },
    { name: "Cáceres", code: "CC", weight: 0.015 },
    { name: "Castellón", code: "CS", weight: 0.02 },
    { name: "Girona", code: "GI", weight: 0.02 },
    { name: "Tarragona", code: "T", weight: 0.02 },
    { name: "Lleida", code: "L", weight: 0.015 },
    { name: "La Coruña", code: "C", weight: 0.025 },
    { name: "Pontevedra", code: "PO", weight: 0.025 },
    { name: "Lugo", code: "LU", weight: 0.015 },
    { name: "Ourense", code: "OU", weight: 0.015 },
    { name: "Tenerife", code: "TF", weight: 0.03 },
    { name: "Logroño", code: "LO", weight: 0.015 },
    { name: "Vitoria", code: "VI", weight: 0.015 },
    { name: "Huesca", code: "HU", weight: 0.01 },
    { name: "Teruel", code: "TE", weight: 0.008 },
    { name: "Soria", code: "SO", weight: 0.008 },
    { name: "Segovia", code: "SG", weight: 0.01 },
    { name: "Ávila", code: "AV", weight: 0.008 },
    { name: "Zamora", code: "ZA", weight: 0.008 },
    { name: "Palencia", code: "P", weight: 0.008 },
    { name: "Cuenca", code: "CU", weight: 0.008 },
    { name: "Guadalajara", code: "GU", weight: 0.012 },
    { name: "Ciudad Real", code: "CR", weight: 0.02 },
    { name: "Ceuta", code: "CE", weight: 0.005 },
    { name: "Melilla", code: "ML", weight: 0.005 },
  ];

  const users: RegisteredUser[] = [];
  
  // Distribution weights for different libertarian quadrants
  const quadrantWeights = [
    { name: "Anarcocapitalismo", weight: 0.25, economicRange: [50, 100], socialRange: [50, 100] },
    { name: "Minarquismo", weight: 0.35, economicRange: [30, 70], socialRange: [20, 60] },
    { name: "Libertarismo de izquierda", weight: 0.20, economicRange: [0, 50], socialRange: [50, 100] },
    { name: "Paleolibertarismo", weight: 0.20, economicRange: [50, 100], socialRange: [0, 50] },
  ];
  
  for (let i = 0; i < count; i++) {
    // Select quadrant based on weight
    const quadrantRandom = random();
    let cumulative = 0;
    let selectedQuadrant = quadrantWeights[0];
    
    for (const quadrant of quadrantWeights) {
      cumulative += quadrant.weight;
      if (quadrantRandom <= cumulative) {
        selectedQuadrant = quadrant;
        break;
      }
    }
    
    // Generate position within selected quadrant range with some variance
    const economic = Math.round(
      selectedQuadrant.economicRange[0] + 
      random() * (selectedQuadrant.economicRange[1] - selectedQuadrant.economicRange[0]) +
      (random() - 0.5) * 15 // Add variance
    );
    
    const social = Math.round(
      selectedQuadrant.socialRange[0] + 
      random() * (selectedQuadrant.socialRange[1] - selectedQuadrant.socialRange[0]) +
      (random() - 0.5) * 15 // Add variance
    );
    
    // Clamp to valid range
    const clampedEconomic = Math.min(100, Math.max(-100, economic));
    const clampedSocial = Math.min(100, Math.max(-100, social));
    
    // Select province based on weight
    const provinceRandom = random();
    let cumulativeProvince = 0;
    let selectedProvince = provinces[0];
    
    for (const province of provinces) {
      cumulativeProvince += province.weight;
      if (provinceRandom <= cumulativeProvince) {
        selectedProvince = province;
        break;
      }
    }
    
    users.push({
      id: `user-${i}`,
      economic: clampedEconomic,
      social: clampedSocial,
      province: selectedProvince.name,
      provinceCode: selectedProvince.code,
    });
  }
  
  return users;
};

/**
 * La nube de puntos del cuadrante tiene que ser exactamente la gente contada en
 * España. Estaba fijada a 2.847 mientras el mapa decía 2.492, así que la misma
 * página afirmaba dos totales distintos. Se deriva del dato en vez de repetirlo.
 */
const SPAIN_TOTAL = Object.values(SPAIN_PROVINCE_COUNTS).reduce((a, b) => a + b, 0);

export const mockUsers = generateMockUsers(SPAIN_TOTAL);

// Get users by province for the map
export const getUsersByProvince = () => {
  const byProvince: Record<string, number> = {};
  
  for (const user of mockUsers) {
    byProvince[user.province] = (byProvince[user.province] || 0) + 1;
  }
  
  return byProvince;
};
