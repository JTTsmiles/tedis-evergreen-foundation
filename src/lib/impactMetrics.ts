/* =========================================================
   SHARED TEDIS NETWORK AND IMPACT METRICS

   Import these values on the home, impact and community
   network pages so every public figure changes together.
========================================================= */

export const TOTAL_SYSTEMS = 2700;
export const SYSTEMS_REQUIRING_ATTENTION = 3;
export const ACTIVE_SYSTEMS =
  TOTAL_SYSTEMS - SYSTEMS_REQUIRING_ATTENTION;

export const PEOPLE_REACHED = 2700;
export const COMMUNITY_COUNT = 25;

export const MIN_SYSTEM_OUTPUT_KW = 0.5;
export const MAX_SYSTEM_OUTPUT_KW = 0.9;
export const AVERAGE_SYSTEM_OUTPUT_KW =
  (MIN_SYSTEM_OUTPUT_KW + MAX_SYSTEM_OUTPUT_KW) / 2;

export const AVERAGE_SUPPLY_HOURS_PER_DAY = 17;

export const LIVE_OUTPUT_KW =
  ACTIVE_SYSTEMS * AVERAGE_SYSTEM_OUTPUT_KW;

export const DAILY_ENERGY_KWH =
  LIVE_OUTPUT_KW * AVERAGE_SUPPLY_HOURS_PER_DAY;

export const FUEL_PREVENTED_LITRES_PER_SYSTEM_PER_DAY = 3.5;
export const CARBON_KG_PER_LITRE = 2.5;

export const DAILY_FUEL_PREVENTED_LITRES =
  ACTIVE_SYSTEMS * FUEL_PREVENTED_LITRES_PER_SYSTEM_PER_DAY;

export const DAILY_CARBON_PREVENTED_KG =
  DAILY_FUEL_PREVENTED_LITRES * CARBON_KG_PER_LITRE;

export const WASTE_RECOVERED_TONS = 13_500;

export const IMPACT_START_DATE = new Date(
  "2025-09-09T00:00:00+01:00"
).getTime();

export function getCumulativeImpact(now = Date.now()) {
  const elapsedMilliseconds = Math.max(0, now - IMPACT_START_DATE);

  const elapsedDays =
    now < IMPACT_START_DATE
      ? 0
      : Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24)) + 1;

  return {
    elapsedDays,
    cumulativeEnergyKwh: DAILY_ENERGY_KWH * elapsedDays,
    cumulativeCarbonKg: DAILY_CARBON_PREVENTED_KG * elapsedDays,
  };
}
