export interface EntityTownTranslation {
  TOWN: string;
  TOWNS: string;
  NAME: string;
  ADD_TOWN: string;

  // ==== errors ====
  NAME__REQUIRED: string;
}

export interface EntityBillingCompanyTranslation {
  BILLING_COMPANY: string;
  BILLING_COMPANIES: string;
  ADD_BILLING_COMPANY: string;
  NAME: string;

  // ==== errors ====
  NAME__REQUIRED: string;
}

export interface EntitySpaceTranslation {
  ADDRESS: string;

  // ==== errors ====
  ADDRESS__REQUIRED: string;
  ADDRESS__CAN_NOT_BE_LONGER_THAN_1000_CHARACTERS: string;
  TOWN__REQUIRED: string;
}

export interface EntityCountPointTranslation {
  NAME: string;
  TYPE: string;
  COLD_WATER: string;
  HOT_WATER: string;
  ELECTRICITY: string;
  ELECTRICITY_DAY: string;
  ELECTRICITY_NIGHT: string;
  GAS: string;

  // ==== errors ====
  NAME__REQUIRED: string;
  NAME__CAN_NOT_BE_LONGER_THAN_250_CHARACTERS: string;
}

export interface EntityReadoutTranslation {
  READOUT: string;
  READOUTS: string;

  // ==== errors ====
  READOUT__CAN_NOT_CONTAIN_MORE_THAN_9_DIGITS: string;
  READOUT__CAN_NOT_BE_NEGATIVE: string;
  READOUT__MUST_BE_AN_INTEGER: string;
}
