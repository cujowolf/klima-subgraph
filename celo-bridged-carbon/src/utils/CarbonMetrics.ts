import { BigInt, BigDecimal } from '@graphprotocol/graph-ts'
import { CarbonMetric } from '../../generated/schema'
import { dayFromTimestamp } from '../../../lib/utils/Dates'
import { IPoolToken } from './pool_token/IPoolToken'
import { ICarbonToken } from './carbon_token/ICarbonToken'
import * as constants from './Constants'

export class CarbonMetricUtils {
  private static DAY_IN_SECONDS: BigInt = BigInt.fromString('86400')
  private static INIT_TIMESTAMP: BigInt = BigInt.fromString(constants.METRICS_INIT_TIMESTAMP)

  static updatePoolTokenSupply(poolToken: IPoolToken, timestamp: BigInt): void {
    let carbonMetrics = this.loadCarbonMetrics(timestamp)
    carbonMetrics = poolToken.returnUpdatedSupplyMetrics(carbonMetrics)

    carbonMetrics.save()
  }

  static updateCarbonTokenRetirements(carbonToken: ICarbonToken, timestamp: BigInt, amount: BigInt): void {
    let carbonMetrics = this.loadCarbonMetrics(timestamp)
    carbonMetrics = carbonToken.returnUpdatedRetirementMetrics(carbonMetrics, amount)

    carbonMetrics.save()
  }

  private static loadCarbonMetrics(timestamp: BigInt): CarbonMetric {
    const dayTimestamp = dayFromTimestamp(timestamp)
    let carbonMetrics = CarbonMetric.load(dayTimestamp)
    if (carbonMetrics == null) {
      carbonMetrics = this.getTheMostRecentCarbonMetric(timestamp)
      carbonMetrics.id = dayTimestamp
      carbonMetrics.timestamp = BigInt.fromString(dayTimestamp)
    }

    return carbonMetrics
  }

  private static getTheMostRecentCarbonMetric(timestamp: BigInt): CarbonMetric {
    const prevTimestamp = timestamp.minus(this.DAY_IN_SECONDS)
    const prevDayString = dayFromTimestamp(prevTimestamp)
    if (prevTimestamp.lt(this.INIT_TIMESTAMP)) {
      return this.createAndReturnEmptyCarbonMetrics(prevDayString)
    } else {
      const carbonMetric = CarbonMetric.load(prevDayString)
      if (carbonMetric != null) {
        return carbonMetric
      } else {
        return this.getTheMostRecentCarbonMetric(prevTimestamp)
      }
    }
  }

  private static createAndReturnEmptyCarbonMetrics(id: string): CarbonMetric {
    let carbonMetrics = new CarbonMetric(id)
    carbonMetrics.timestamp = BigInt.zero()
    carbonMetrics.bctSupply = BigDecimal.zero()
    carbonMetrics.nctSupply = BigDecimal.zero()
    carbonMetrics.mco2Supply = BigDecimal.zero()
    carbonMetrics.totalCarbonSupply = BigDecimal.zero()

    carbonMetrics.tco2Retired = BigDecimal.zero()
    carbonMetrics.mco2Retired = BigDecimal.zero()

    carbonMetrics.totalRetirements = BigDecimal.zero()
    carbonMetrics.save()

    return carbonMetrics
  }
}
