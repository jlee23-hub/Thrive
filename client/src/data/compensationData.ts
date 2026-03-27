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
  { date: "Nov 2023", vested: 0, unvested: 5519, vestedValue: 0, unvestedValue: 438374, periodVested: 0, periodVestedValue: 0, periodUnvestedValue: 0, grantBreakdown: [] as { grantDate: string; units: number; value: number }[] },
  { date: "Mar 2024", vested: 550, unvested: 4969, vestedValue: 43696, unvestedValue: 394678, periodVested: 550, periodVestedValue: 43696, periodUnvestedValue: 0, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2023", units: 130, value: 10327 },
  ] },
  { date: "Jul 2024", vested: 1100, unvested: 4419, vestedValue: 87392, unvestedValue: 350982, periodVested: 550, periodVestedValue: 43696, periodUnvestedValue: 0, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2023", units: 130, value: 10327 },
  ] },
  { date: "Nov 2024", vested: 1650, unvested: 3869, vestedValue: 131088, unvestedValue: 307286, periodVested: 550, periodVestedValue: 43696, periodUnvestedValue: 0, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2023", units: 130, value: 10327 },
  ] },
  { date: "Mar 2025", vested: 2200, unvested: 3319, vestedValue: 174783, unvestedValue: 263591, periodVested: 550, periodVestedValue: 43695, periodUnvestedValue: 0, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2023", units: 50, value: 3972 },
    { grantDate: "Nov 13, 2024", units: 80, value: 6354 },
  ] },
  { date: "Jul 2025", vested: 2750, unvested: 2769, vestedValue: 218479, unvestedValue: 219895, periodVested: 550, periodVestedValue: 43696, periodUnvestedValue: 0, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
  ] },
  { date: "Nov 2025", vested: 3489, unvested: 2030, vestedValue: 277188, unvestedValue: 161186, periodVested: 739, periodVestedValue: 58709, periodUnvestedValue: 0, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 420, value: 33369 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 189, value: 15013 },
  ] },
  { date: "Mar 2026", vested: 3900, unvested: 1619, vestedValue: 309836, unvestedValue: 128538, periodVested: 411, periodVestedValue: 32648, periodUnvestedValue: 0, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 195, value: 15491 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 86, value: 6830 },
  ] },
  { date: "Jul 2026", vested: 4300, unvested: 1219, vestedValue: 341610, unvestedValue: 96764, periodVested: 400, periodVestedValue: 0, periodUnvestedValue: 31774, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 174, value: 13822 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 96, value: 7625 },
  ] },
  { date: "Nov 2026", vested: 4700, unvested: 819, vestedValue: 373385, unvestedValue: 64989, periodVested: 400, periodVestedValue: 0, periodUnvestedValue: 31775, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 100, value: 7944 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 170, value: 13504 },
  ] },
  { date: "Mar 2027", vested: 5000, unvested: 519, vestedValue: 397216, unvestedValue: 41158, periodVested: 300, periodVestedValue: 0, periodUnvestedValue: 23831, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 170, value: 13504 },
  ] },
  { date: "Jul 2027", vested: 5200, unvested: 319, vestedValue: 413103, unvestedValue: 25271, periodVested: 200, periodVestedValue: 0, periodUnvestedValue: 15887, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 129, value: 10247 },
    { grantDate: "Nov 13, 2025", units: 71, value: 5640 },
  ] },
  { date: "Nov 2027", vested: 5519, unvested: 1148, vestedValue: 438374, unvestedValue: 91169, periodVested: 319, periodVestedValue: 0, periodUnvestedValue: 25341, grantBreakdown: [
    { grantDate: "Nov 18, 2023", units: 100, value: 7944 },
    { grantDate: "Nov 13, 2024", units: 130, value: 10327 },
    { grantDate: "Nov 13, 2025", units: 89, value: 7070 },
  ] },
  { date: "Mar 2028", vested: 5659, unvested: 1008, vestedValue: 449493, unvestedValue: 80035, periodVested: 140, periodVestedValue: 0, periodUnvestedValue: 11119, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 82, value: 6514 },
    { grantDate: "Nov 13, 2025", units: 58, value: 4605 },
  ] },
  { date: "Jul 2028", vested: 5799, unvested: 868, vestedValue: 460612, unvestedValue: 68916, periodVested: 140, periodVestedValue: 0, periodUnvestedValue: 11119, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 82, value: 6514 },
    { grantDate: "Nov 13, 2025", units: 58, value: 4605 },
  ] },
  { date: "Nov 2028", vested: 5978, unvested: 689, vestedValue: 474833, unvestedValue: 54720, periodVested: 179, periodVestedValue: 0, periodUnvestedValue: 14221, grantBreakdown: [
    { grantDate: "Nov 13, 2024", units: 121, value: 9607 },
    { grantDate: "Nov 13, 2025", units: 58, value: 4614 },
  ] },
  { date: "Mar 2029", vested: 6035, unvested: 632, vestedValue: 479360, unvestedValue: 50193, periodVested: 57, periodVestedValue: 0, periodUnvestedValue: 4527, grantBreakdown: [
    { grantDate: "Nov 13, 2025", units: 57, value: 4527 },
  ] },
  { date: "Jul 2029", vested: 6092, unvested: 575, vestedValue: 483887, unvestedValue: 45666, periodVested: 57, periodVestedValue: 0, periodUnvestedValue: 4527, grantBreakdown: [
    { grantDate: "Nov 13, 2025", units: 57, value: 4527 },
  ] },
  { date: "Nov 2029", vested: 6187, unvested: 480, vestedValue: 491431, unvestedValue: 38122, periodVested: 95, periodVestedValue: 0, periodUnvestedValue: 7544, grantBreakdown: [
    { grantDate: "Nov 13, 2025", units: 95, value: 7544 },
  ] },
];

const historicalSharePrices: Record<string, number> = {
  "Nov 2023": 72.15, "Feb 2024": 74.80, "Mar 2024": 74.80, "May 2024": 78.22,
  "Jul 2024": 78.22, "Aug 2024": 76.50, "Nov 2024": 80.10, "Feb 2025": 82.45,
  "Mar 2025": 82.45, "May 2025": 79.90, "Jul 2025": 79.90, "Aug 2025": 84.38,
  "Nov 2025": 81.20, "Feb 2026": 84.38, "Mar 2026": 84.38, "May 2026": 0,
  "Jul 2026": 0, "Aug 2026": 0, "Nov 2026": 0, "Feb 2027": 0, "Mar 2027": 0,
  "May 2027": 0, "Jul 2027": 0, "Aug 2027": 0, "Nov 2027": 0,
  "Feb 2028": 0, "Mar 2028": 0, "May 2028": 0, "Jul 2028": 0, "Aug 2028": 0,
  "Nov 2028": 0, "Feb 2029": 0, "Mar 2029": 0, "May 2029": 0, "Jul 2029": 0,
  "Aug 2029": 0, "Nov 2029": 0,
};

export const getGrantVestingData = (grant: Grant, modeledPrice?: number) => {
  const totalQuarters = 16;
  const vestedPerQuarter = Math.floor(grant.totalUnits / totalQuarters);
  const data = [];
  const startYear = parseInt(grant.vestingStartDate.split(", ")[1]);
  const now = new Date();

  for (let i = 0; i <= totalQuarters; i++) {
    const quarterIndex = i % 4;
    const yearOffset = Math.floor(i / 4);
    const months = ["Nov", "Feb", "May", "Aug"];
    const month = months[quarterIndex];
    const year = startYear + yearOffset;
    const dateKey = `${month} ${year}`;
    const vested = Math.min(i * vestedPerQuarter, grant.totalUnits);
    const total = grant.totalUnits;
    const vestingUnits = i === 0 ? 0 : vestedPerQuarter;
    const vestingPct = ((vested / total) * 100).toFixed(2);

    const monthIndex = months.indexOf(month);
    const calendarMonths = [10, 1, 4, 7];
    const periodDate = new Date(year, calendarMonths[monthIndex]);
    const isFuture = periodDate > now;

    const sharePrice = isFuture
      ? (modeledPrice || compensationData.defaultSharePrice)
      : (historicalSharePrices[dateKey] || compensationData.defaultSharePrice);

    const vestingValue = vestingUnits * sharePrice;

    data.push({
      date: dateKey,
      vested: Math.min(vested, total),
      total: total,
      vestingUnits,
      vestingValue: Math.round(vestingValue),
      totalVestedUnits: Math.min(vested, total),
      vestingPct: parseFloat(vestingPct),
      sharePrice,
      isFuture,
    });
  }
  return data;
};
