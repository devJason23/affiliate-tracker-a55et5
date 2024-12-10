import { startOfMonth, endOfMonth, subMonths } from 'date-fns'

export interface CommissionTier {
  direct: number
  override: number
  minimumTeamSize: number
  minimumDirectReferrals: number
  qualificationPeriodMonths: number
  monthlyMinimumVolume: number
}

export const COMMISSION_TIERS: Record<number, CommissionTier> = {
  1: { 
    direct: 0.10, 
    override: 0.05,
    minimumTeamSize: 0,
    minimumDirectReferrals: 0,
    qualificationPeriodMonths: 1,
    monthlyMinimumVolume: 0
  },
  2: { 
    direct: 0.15, 
    override: 0.07,
    minimumTeamSize: 5,
    minimumDirectReferrals: 3,
    qualificationPeriodMonths: 2,
    monthlyMinimumVolume: 5000
  },
  3: { 
    direct: 0.20, 
    override: 0.10,
    minimumTeamSize: 10,
    minimumDirectReferrals: 5,
    qualificationPeriodMonths: 3,
    monthlyMinimumVolume: 10000
  }
}

interface CommissionHistory {
  id: string
  affiliateId: string
  amount: number
  type: 'direct' | 'override'
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: number
  paidAt?: number
  transactionId: string
  originalAmount?: number
  adjustmentReason?: string
  tier: number
}

export async function recalculateCommissions(
  affiliateId: string,
  startDate: Date,
  dynamodb: any
) {
  try {
    // Get team performance metrics for tier qualification
    const teamMetrics = await getTeamMetrics(affiliateId, startDate, dynamodb)
    
    // Determine appropriate tier based on performance
    const newTier = determineCommissionTier(teamMetrics)
    
    // Get all transactions for the affiliate's team
    const transactions = await getTeamTransactions(affiliateId, startDate, dynamodb)
    
    // Calculate new commission amounts
    const commissionUpdates = await calculateCommissionUpdates(
      transactions,
      newTier,
      dynamodb
    )
    
    // Create commission history records
    await createCommissionHistory(commissionUpdates, dynamodb)
    
    // Update current commission records
    await updateCommissionRecords(commissionUpdates, dynamodb)
    
    // Update affiliate earnings and tier
    await updateAffiliateStatus(
      affiliateId,
      newTier,
      commissionUpdates,
      dynamodb
    )
    
    return {
      newTier,
      updates: commissionUpdates
    }
  } catch (error) {
    console.error('Error recalculating commissions:', error)
    throw error
  }
}

async function getTeamMetrics(
  affiliateId: string, 
  startDate: Date,
  dynamodb: any
) {
  const team = await getTeamMembers(affiliateId, dynamodb)
  const monthlyVolumes = await getMonthlyVolumes(team.map(m => m.id), startDate, dynamodb)
  
  return {
    teamSize: team.length,
    directReferrals: team.filter(m => m.uplineId === affiliateId).length,
    monthlyVolume: monthlyVolumes.total,
    monthlyAverages: monthlyVolumes.averages
  }
}

function determineCommissionTier(metrics: any): number {
  // Start from highest tier and work down
  for (let tier = 3; tier >= 1; tier--) {
    const requirements = COMMISSION_TIERS[tier]
    
    if (
      metrics.teamSize >= requirements.minimumTeamSize &&
      metrics.directReferrals >= requirements.minimumDirectReferrals &&
      metrics.monthlyVolume >= requirements.monthlyMinimumVolume
    ) {
      return tier
    }
  }
  
  return 1 // Default tier
}

async function createCommissionHistory(updates: any, dynamodb: any) {
  const histories: CommissionHistory[] = updates.map((update: any) => ({
    id: `hist_${update.commissionId}`,
    affiliateId: update.affiliateId,
    amount: update.newAmount,
    type: update.type,
    status: 'pending',
    createdAt: Date.now(),
    transactionId: update.transactionId,
    originalAmount: update.originalAmount,
    adjustmentReason: 'Tier Recalculation',
    tier: update.newTier
  }))

  // Batch write histories
  const batchSize = 25
  for (let i = 0; i < histories.length; i += batchSize) {
    const batch = histories.slice(i, i + batchSize)
    await dynamodb.batchWrite({
      RequestItems: {
        'CommissionHistory': batch.map(history => ({
          PutRequest: { Item: history }
        }))
      }
    }).promise()
  }
}

async function updateAffiliateStatus(
  affiliateId: string,
  newTier: number,
  updates: any[],
  dynamodb: any
) {
  const totalEarnings = updates
    .filter(u => u.affiliateId === affiliateId)
    .reduce((sum, u) => sum + u.newAmount, 0)

  await dynamodb.update({
    TableName: 'Affiliates',
    Key: { id: affiliateId },
    UpdateExpression: 'SET commissionTier = :tier, totalEarnings = :earnings',
    ExpressionAttributeValues: {
      ':tier': newTier,
      ':earnings': totalEarnings
    }
  }).promise()
}

// ... (previous helper functions remain the same)
