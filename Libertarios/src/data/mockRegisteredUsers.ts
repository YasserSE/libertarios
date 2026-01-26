export interface RegisteredUser {
  id: string;
  economic: number; // -100 to 100
  social: number; // -100 to 100
  province: string;
  provinceCode: string;
}

// Generate mock registered users
export const generateMockUsers = (count: number = 500): RegisteredUser[] => {
  const provinces = [
    { name: "Madrid", code: "MD", weight: 0.15 },
    { name: "Barcelona", code: "B", weight: 0.12 },
    { name: "Valencia", code: "V", weight: 0.08 },
    { name: "Sevilla", code: "SE", weight: 0.06 },
    { name: "Málaga", code: "MA", weight: 0.05 },
    { name: "Alicante", code: "A", weight: 0.04 },
    { name: "Zaragoza", code: "Z", weight: 0.04 },
    { name: "Bilbao", code: "BI", weight: 0.03 },
    { name: "Murcia", code: "MU", weight: 0.03 },
    { name: "Palma", code: "PM", weight: 0.03 },
    { name: "Las Palmas", code: "GC", weight: 0.03 },
    { name: "Granada", code: "GR", weight: 0.025 },
    { name: "Córdoba", code: "CO", weight: 0.02 },
    { name: "Valladolid", code: "VA", weight: 0.02 },
    { name: "Santander", code: "S", weight: 0.02 },
    { name: "Oviedo", code: "O", weight: 0.02 },
    { name: "Pamplona", code: "NA", weight: 0.02 },
    { name: "San Sebastián", code: "SS", weight: 0.02 },
    { name: "Salamanca", code: "SA", weight: 0.015 },
    { name: "Burgos", code: "BU", weight: 0.015 },
    { name: "Albacete", code: "AB", weight: 0.015 },
    { name: "León", code: "LE", weight: 0.015 },
    { name: "Cádiz", code: "CA", weight: 0.02 },
    { name: "Huelva", code: "H", weight: 0.015 },
    { name: "Almería", code: "AL", weight: 0.015 },
    { name: "Jaén", code: "J", weight: 0.015 },
    { name: "Toledo", code: "TO", weight: 0.015 },
    { name: "Badajoz", code: "BA", weight: 0.015 },
    { name: "Cáceres", code: "CC", weight: 0.01 },
    { name: "Castellón", code: "CS", weight: 0.015 },
    { name: "Girona", code: "GI", weight: 0.015 },
    { name: "Tarragona", code: "T", weight: 0.015 },
    { name: "Lleida", code: "L", weight: 0.01 },
    { name: "La Coruña", code: "C", weight: 0.02 },
    { name: "Pontevedra", code: "PO", weight: 0.02 },
    { name: "Lugo", code: "LU", weight: 0.01 },
    { name: "Ourense", code: "OU", weight: 0.01 },
    { name: "Tenerife", code: "TF", weight: 0.025 },
    { name: "Logroño", code: "LO", weight: 0.01 },
    { name: "Vitoria", code: "VI", weight: 0.01 },
    { name: "Huesca", code: "HU", weight: 0.008 },
    { name: "Teruel", code: "TE", weight: 0.005 },
    { name: "Soria", code: "SO", weight: 0.005 },
    { name: "Segovia", code: "SG", weight: 0.008 },
    { name: "Ávila", code: "AV", weight: 0.006 },
    { name: "Zamora", code: "ZA", weight: 0.006 },
    { name: "Palencia", code: "P", weight: 0.006 },
    { name: "Cuenca", code: "CU", weight: 0.006 },
    { name: "Guadalajara", code: "GU", weight: 0.01 },
    { name: "Ciudad Real", code: "CR", weight: 0.015 },
    { name: "Ceuta", code: "CE", weight: 0.003 },
    { name: "Melilla", code: "ML", weight: 0.003 },
  ];

  const users: RegisteredUser[] = [];
  
  for (let i = 0; i < count; i++) {
    // Bias towards libertarian quadrant (positive economic, positive social)
    const economicBase = 20 + Math.random() * 40;
    const socialBase = 15 + Math.random() * 50;
    
    // Add some variance
    const economic = Math.min(100, Math.max(-100, economicBase + (Math.random() - 0.3) * 60));
    const social = Math.min(100, Math.max(-100, socialBase + (Math.random() - 0.3) * 50));
    
    // Select province based on weight
    const random = Math.random();
    let cumulative = 0;
    let selectedProvince = provinces[0];
    
    for (const province of provinces) {
      cumulative += province.weight;
      if (random <= cumulative) {
        selectedProvince = province;
        break;
      }
    }
    
    users.push({
      id: `user-${i}`,
      economic: Math.round(economic),
      social: Math.round(social),
      province: selectedProvince.name,
      provinceCode: selectedProvince.code,
    });
  }
  
  return users;
};

export const mockUsers = generateMockUsers(847);

// Get users by province for the map
export const getUsersByProvince = () => {
  const byProvince: Record<string, number> = {};
  
  for (const user of mockUsers) {
    byProvince[user.province] = (byProvince[user.province] || 0) + 1;
  }
  
  return byProvince;
};
