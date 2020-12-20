export type PatientParameters = {
  id: number;
  threshold_hypoglycemia: number;
  threshold_hyperglycemia: number;
  threshold_hypoglycemia_2: number;
  threshold_hyperglycemia_2: number;
  patient: number;
};

export type ThresholdName =
  | 'threshold_hypoglycemia'
  | 'threshold_hyperglycemia'
  | 'threshold_hypoglycemia_2'
  | 'threshold_hyperglycemia_2';

type BaseDataPoint = {
  id: number;
  date: string;
  patient: number;
};

type GlycemiaType = 'capillary' | 'interstitial';

export type GlycemiaDataPoint = BaseDataPoint & {
  value: number;
  type: GlycemiaType;
};

export type InsulinDataPoint = BaseDataPoint & {
  quantity: number;
  type?: 'short' | 'long';
  context?: 'before_meal' | 'after_meal' | 'correction';
};

export type FoodDataPoint = BaseDataPoint & {
  size: 'light' | 'big' | 'unknown';
};

export type ActivityDataPoint = BaseDataPoint & {
  intensity: 'low' | 'medium' | 'high';
  duration: number;
};

export type ReportsDataPoint = BaseDataPoint & {
  category:
    | 'hypoglycemie_severe'
    | 'hypoglycemie_ressentie'
    | 'alerte_technique'
    | 'presence_de_cetone';
  message: string;
};

export type PatientDiabetesDailyData = {
  date: string;
  parameters: PatientParameters;
  glycemia: GlycemiaDataPoint[];
  insulin: InsulinDataPoint[];
  food: FoodDataPoint[];
  activity: ActivityDataPoint[];
  reports: ReportsDataPoint[];
};

export type PatientDiabetesData = PatientDiabetesDailyData[];

export type GlycemiaReaderGlobalStats = {
  daily_mean_count_measures: number;
  mean_glycemia: number;
  count_hypoglycemia: number;
};

export type GlycemiaSensorGlobalStats = {
  daily_mean_count_measures: number;
  mean_glycemia: number;
  count_hypoglycemia: number;
  usage_percent: number;
};

export type GlycemiaGlobalStats = {
  reader: GlycemiaReaderGlobalStats;
  sensor: GlycemiaSensorGlobalStats;
};

export type InsulinGlobalStats = {
  daily_mean_long_insulin: number;
  daily_mean_short_insulin: number;
  daily_mean_total_insulin: number;
  daily_mean_count_injections: number;
};
export type PatientGlobalStats = {
  glycemia: GlycemiaGlobalStats;
  insulin: InsulinGlobalStats;
  count_days: number;
};

export type GlycemiaDistributionRange = {
  glycemia_range: string;
  ratio: number;
};

export type PatientTargetDurationStatsCommon = {
  high_glycemia: number;
  target_glycemia: number;
  low_glycemia: number;
  parameters: PatientParameters;
  glycemia_distribution: GlycemiaDistributionRange[];
};

export type PatientTargetDurationStatsReader = PatientTargetDurationStatsCommon & {
  total_glycemia: number;
};

export type PatientTargetDurationStatsSensor = PatientTargetDurationStatsCommon & {
  total_time: number;
};

export type PatientTargetDurationStats = {
  sensor: PatientTargetDurationStatsSensor;
  reader: PatientTargetDurationStatsReader;
};

export type PatientData = {
  dataviz: PatientDiabetesData;
  globalStats: PatientGlobalStats;
  targetDurationStats: PatientTargetDurationStats;
  diabetesParams: PatientParameters;
};
