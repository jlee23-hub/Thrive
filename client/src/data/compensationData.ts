export const compensationData = {
  annualCompensation: 321633,
  baseSalary: 198800,
  bonusTarget: 29820,
  rsus: 93013,
  defaultSharePrice: 79.43,
};

export const rsuYearlyData = [
  { year: "2023", vested: 65000, unvested: 0, isCurrent: false, vestedUnits: 818, unvestedUnits: 0, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 818, value: 65000 },
  ] },
  { year: "2024", vested: 78000, unvested: 0, isCurrent: false, vestedUnits: 982, unvestedUnits: 0, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 840, value: 66738 },
    { grantDate: "Nov 13, 2023", units: 142, value: 11282 },
  ] },
  { year: "2025", vested: 72000, unvested: 23000, isCurrent: false, vestedUnits: 907, unvestedUnits: 290, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 560, value: 44492 },
    { grantDate: "Nov 13, 2024", units: 247, value: 19622 },
    { grantDate: "Nov 13, 2025", units: 100, value: 7944 },
    { grantDate: "Nov 13, 2023", units: 290, value: 23042 },
  ] },
  { year: "2026", vested: 48000, unvested: 57000, isCurrent: true, vestedUnits: 605, unvestedUnits: 718, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 369, value: 29313 },
    { grantDate: "Nov 13, 2024", units: 390, value: 30978 },
    { grantDate: "Nov 13, 2025", units: 246, value: 19543 },
    { grantDate: "Nov 13, 2023", units: 318, value: 25266 },
  ] },
  { year: "2027", vested: 0, unvested: 38000, isCurrent: false, vestedUnits: 0, unvestedUnits: 479, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 222, value: 17637 },
    { grantDate: "Nov 13, 2025", units: 257, value: 20413 },
  ] },
];

export const equityData = {
  totalValue: 438374,
  totalUnits: 5519,
  vestedValue: 277131,
  vestedUnits: 3489,
  unvestedValue: 161243,
  unvestedUnits: 2030,
};

export interface Grant {
  id: string;
  grantDate: string;
  totalUnits: number;
  vestedUnits: number;
  vestedValue: number;
  totalValue: number;
  vestingProgress: number;
  vestingStartDate: string;
}

export const grants: Grant[] = [
  {
    id: "grant-1",
    grantDate: "Nov 13, 2025",
    totalUnits: 679,
    vestedUnits: 84,
    vestedValue: 6672,
    totalValue: 53933,
    vestingProgress: 12.4,
    vestingStartDate: "Nov, 2025",
  },
  {
    id: "grant-2",
    grantDate: "Nov 13, 2024",
    totalUnits: 989,
    vestedUnits: 370,
    vestedValue: 29389,
    totalValue: 78556,
    vestingProgress: 37.4,
    vestingStartDate: "Nov, 2024",
  },
  {
    id: "grant-3",
    grantDate: "Nov 18, 2023",
    totalUnits: 3354,
    vestedUnits: 2725,
    vestedValue: 216447,
    totalValue: 266408,
    vestingProgress: 81.2,
    vestingStartDate: "Nov, 2023",
  },
  {
    id: "grant-4",
    grantDate: "Nov 13, 2023",
    totalUnits: 497,
    vestedUnits: 310,
    vestedValue: 24623,
    totalValue: 39477,
    vestingProgress: 62.4,
    vestingStartDate: "Nov, 2023",
  },
];

export const vestingScheduleData = [
  { date: "Nov 2023", vested: 0, unvested: 5519, vestedValue: 0, unvestedValue: 438374, grantBreakdown: [] as { grantDate: string; units: number; value: number }[] },
  { date: "Mar 2024", vested: 550, unvested: 4969, vestedValue: 43696, unvestedValue: 394678, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2023", units: 130, value: 10327 },
  ] },
  { date: "Jul 2024", vested: 1100, unvested: 4419, vestedValue: 87392, unvestedValue: 350982, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2023", units: 130, value: 10327 },
  ] },
  { date: "Nov 2024", vested: 1650, unvested: 3869, vestedValue: 131088, unvestedValue: 307286, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2023", units: 130, value: 10327 },
  ] },
  { date: "Mar 2025", vested: 2200, unvested: 3319, vestedValue: 174783, unvestedValue: 263591, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2023", units: 50, value: 3972 },
    { grantDate: "Nov 13, 2024", units: 80, value: 6354 },
  ] },
  { date: "Jul 2025", vested: 2750, unvested: 2769, vestedValue: 218479, unvestedValue: 219895, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
  ] },
  { date: "Nov 2025", vested: 3489, unvested: 2030, vestedValue: 277188, unvestedValue: 161186, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 189, value: 15013 },
  ] },
  { date: "Mar 2026", vested: 3900, unvested: 1619, vestedValue: 309836, unvestedValue: 128538, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 195, value: 15491 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 86, value: 6830 },
  ] },
  { date: "Jul 2026", vested: 4300, unvested: 1219, vestedValue: 341610, unvestedValue: 96764, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 174, value: 13822 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 96, value: 7625 },
  ] },
  { date: "Nov 2026", vested: 4700, unvested: 819, vestedValue: 373385, unvestedValue: 64989, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 170, value: 13504 },
    { grantDate: "Nov 18, 2023", units: 100, value: 7944 },
  ] },
  { date: "Mar 2027", vested: 5000, unvested: 519, vestedValue: 397216, unvestedValue: 41158, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 170, value: 13504 },
  ] },
  { date: "Jul 2027", vested: 5200, unvested: 319, vestedValue: 413103, unvestedValue: 25271, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 129, value: 10247 },
    { grantDate: "Nov 13, 2025", units: 71, value: 5640 },
  ] },
  { date: "Nov 2027", vested: 5519, unvested: 0, vestedValue: 438374, unvestedValue: 0, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 89, value: 7070 },
    { grantDate: "Nov 18, 2023", units: 100, value: 7944 },
  ] },
];

export const getGrantVestingData = (grant: Grant) => {
  const totalQuarters = 16;
  const vestedPerQuarter = Math.floor(grant.totalUnits / totalQuarters);
  const data = [];
  const startYear = parseInt(grant.vestingStartDate.split(", ")[1]);

  for (let i = 0; i <= totalQuarters; i++) {
    const quarterIndex = i % 4;
    const yearOffset = Math.floor(i / 4);
    const months = ["Nov", "Feb", "May", "Aug"];
    const month = months[quarterIndex];
    const year = startYear + yearOffset;
    const vested = Math.min(i * vestedPerQuarter, grant.vestedUnits);
    const total = grant.totalUnits;

    data.push({
      date: `${month} ${year}`,
      vested: Math.min(vested, total),
      total: total,
    });
  }
  return data;
};
