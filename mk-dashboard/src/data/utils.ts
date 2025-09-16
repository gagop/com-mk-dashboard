import { GMINY, gestosc, powierzchniaKm2, przyrostNaturalny, udzialWiekowych, obciazenieDemograficzne } from './bdl'
import type { Gmina, Rok } from './bdl'

export const LATA: Rok[] = [2019, 2020, 2021, 2022, 2023, 2024]

export function computeLudnosc(gmina: Gmina, rok: Rok): number {
  const density = gestosc[gmina][rok]
  const area = powierzchniaKm2[gmina][rok]
  return Math.round(density * area)
}

export function computeMKSum<T extends number>(
  extractor: (g: Gmina) => Record<Rok, T>
): Record<Rok, number> {
  const result: Record<Rok, number> = { 2019: 0, 2020: 0, 2021: 0, 2022: 0, 2023: 0, 2024: 0 }
  GMINY.forEach((g) => {
    const series = extractor(g)
    LATA.forEach((y) => {
      result[y] += Number(series[y])
    })
  })
  return result
}

export const MK_powierzchniaKm2 = computeMKSum((g) => powierzchniaKm2[g])

export const MK_ludnosc = computeMKSum((g) => {
  const series = {} as Record<Rok, number>
  LATA.forEach((y) => {
    series[y] = computeLudnosc(g, y)
  })
  return series
})

export const MK_przyrostNaturalny = computeMKSum((g) => przyrostNaturalny[g] ?? ({} as any))

// Weighted average for indicators (density, structure shares) using population as weights
export function weightedAverage(seriesByGmina: Record<Gmina, Record<Rok, number>>): Record<Rok, number> {
  const out: Record<Rok, number> = { 2019: 0, 2020: 0, 2021: 0, 2022: 0, 2023: 0, 2024: 0 }
  LATA.forEach((y) => {
    let sumWeighted = 0
    let sumPop = 0
    GMINY.forEach((g) => {
      const pop = computeLudnosc(g, y)
      const v = seriesByGmina[g][y]
      sumWeighted += v * pop
      sumPop += pop
    })
    out[y] = sumPop ? sumWeighted / sumPop : 0
  })
  return out
}

export const MK_gestosc = weightedAverage(gestosc)
export const MK_obciazenie = weightedAverage(obciazenieDemograficzne)
export const MK_udzial_przed = weightedAverage(udzialWiekowych.przed)
export const MK_udzial_produkcyjny = weightedAverage(udzialWiekowych.produkcyjny)
export const MK_udzial_popro = weightedAverage(udzialWiekowych.popro)


