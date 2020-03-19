export const communityProperties = [
  {
    key: 'cost-free',
    label: 'Cost Free',
    description: 'Enter on all services that are free of cost',
    type: 'checkbox'
  },

  {
    key: 'community-transgender',
    label: 'community-transgender',
    description:
      'Opportunities that serve the trans/gender nonconforming/nonbinary community',
    type: 'checkbox'
  },
  {
    key: 'community-hiv-aids',
    label: 'community-hiv-aids',
    description: 'Opportunities that serve the HIV+ and at-risk community',
    type: 'checkbox'
  },
  {
    key: 'community-detained-immigrant',
    label: 'community-detained-immigrant',
    description: 'Opportunities that serve detained immigrants',
    type: 'checkbox'
  },
  {
    key: 'community-daca-recipient-seeker',
    label: 'community-daca-recipient-seeker',
    description: 'Opportunities that serve Dreamers (DACA recipients)',
    type: 'checkbox'
  },
  {
    key: 'community-undocumented	',
    label: 'community-undocumented	',
    description: 'Opportunities that serve undocumented immigrants',
    type: 'checkbox'
  },
  {
    key: 'community-homeless',
    label: 'community-homeless',
    description: 'Opportunities that serve homeless individuals',
    type: 'checkbox'
  },
  {
    key: 'community-lgbtq-youth',
    label: 'community-lgbtq-youth',
    description: 'Opportunities that serve LGBTQ youth',
    type: 'checkbox'
  },
  {
    key: 'community-teens',
    label: 'community-teens',
    description: '"teen" defined as 12-18 years old',
    type: 'checkbox'
  },
  {
    key: 'community-adults',
    label: 'community-adults',
    description: '"adult" defined as 18 years or older',
    type: 'checkbox'
  },
  {
    key: 'community-seniors',
    label: 'community-seniors',
    description: '"senior" defined as 65 years or older',
    type: 'checkbox'
  },
  {
    key: 'community-human-trafficking-survivor',
    label: 'community-human-trafficking-survivor',
    description: 'Opportunities that serve human trafficking survivors',
    type: 'checkbox'
  },
  {
    key: 'community-latino',
    label: 'community-latino',
    description: 'Opportunities that serve the Latinx community',
    type: 'checkbox'
  },
  {
    key: 'community-api',
    label: 'community-api',
    description:
      'Opportunities that serve the Asian and Pacific Islander community',
    type: 'checkbox'
  },
  {
    key: 'community-african-american',
    label: 'community-african-american',
    description: 'Opportunities that serve the African American community',
    type: 'checkbox'
  },
  {
    key: 'community-muslim',
    label: 'community-muslim',
    description: 'Opportunities that serve the Muslim community',
    type: 'checkbox'
  },
  {
    key: 'community-native-american',
    label: 'community-native-american',
    description: 'Opportunities that serve the Native American community',
    type: 'checkbox'
  },
  {
    key: 'community-disabled',
    label: 'community-disabled',
    description: 'Opportunities that serve the disabled community',
    type: 'checkbox'
  },
  {
    key: 'community-refugee',
    label: 'community-refugee ',
    description: 'Opportunities that serve refugees',
    type: 'checkbox'
  },
  {
    key: 'community-asylee',
    label: 'community-asylee',
    description:
      'Opportunities that serve asylees (those who have been granted asylum status)',
    type: 'checkbox'
  },
  {
    key: 'community-russia-immigrant',
    label: 'community-russia-immigrant',
    description: 'Opportunities that serve the Russian community',
    type: 'checkbox'
  },
  {
    key: 'community-middle-east-immigrant',
    label: 'community-middle-east-immigrant',
    description: 'Opportunities that serve those from the Middle East',
    type: 'checkbox'
  },
  {
    key: 'community-latin-america-immigrant',
    label: 'community-latin-america-immigrant',
    description: 'Opportunities that serve those from Latin America',
    type: 'checkbox'
  },
  {
    key: 'community-africa-immigrant',
    label: 'community-africa-immigrant',
    description: 'Opportunities that serve those from African countries',
    type: 'checkbox'
  }
];

export const costProperties = [
  {
    key: 'cost-free',
    label: 'Cost Free',
    description: 'Enter on all services that are free of cost',
    type: 'checkbox'
  },
  {
    key: 'cost-fees',
    label: 'Cost Fees',
    description:
      'Enter a # or brief written short description of fees (e.g. "costs offered on a sliding scale"',
    type: 'text'
  }
];

/*

*/
export const eligibilityRequirementProperties = [
  {
    key: 'has-confidentiality-policy',
    label: 'elig-description',
    description: 'tk',
    type: 'textarea'
  },
  {
    key: 'time-appointment-required',
    label: 'Time Appointment Required',
    description:
      'Enter this property for all services that require an appointment in advance',
    type: 'checkbox'
  },
  {
    key: 'elig-age-or-over',
    label: 'Eligible Age or Over (e.g. age 18 and over)',
    description:
      '"IF the opportunity is available to a specific age group, it should have the elig-age-or-over or elig-age-or-under with a numeric value for the years. For example, an opportunity that serves 18+ should have a property of elig-age-or-over with a value of 18.'
  },
  {
    key: 'elig-age-or-under (value = #)',
    label: 'Eligible Age or Under (e.g. age 25 and under)',
    description: 'N/A',
    type: 'checkbox'
  },
  {
    key: 'elig-age-range (value = # - #)',
    label: 'Eligible Age Range (e.g. ages 12-24)',
    description: 'N/A',
    type: 'checkbox'
  },
  {
    key: 'req-photo-id',
    label: 'REQUIRES a photo ID',
    description:
      'If the service requires a photo ID from new/potential clients in order to access"',
    type: 'checkbox'
  },
  {
    key: 'req-proof-of-age',
    label: 'REQUIRES proof of age',
    description:
      'If the service requires proof of age from new/potential clients in order to access"',
    type: 'checkbox'
  },
  {
    key: 'req-medical-insurance',
    label: 'REQUIRES medical insurance',
    description:
      'If the service requires medical insurance from new/potential clients in order to access"',
    type: 'checkbox'
  },
  {
    key: 'req-proof-of-income',
    label: 'REQUIRES proof of income',
    description:
      'If the service requires proof of income from new/potential clients in order to access"',
    type: 'checkbox'
  },
  {
    key: 'req-proof-of-residence',
    label: 'REQUIRES proof of residence',
    description:
      'If the service requires proof of residence from new/potential clients in order to access"',
    type: 'checkbox'
  },
  {
    key: 'req-referral',
    label: 'REQUIRES a referral',
    description:
      'If the service requires a referral from another service provider from new/potential clients in order to access"',
    type: 'checkbox'
  }
];

/**
 * TODO: Ask Katie
 */
export const languageProperties = [];

/*
  TODO: Ask Katie about this: Every city, state (province), country for our 3 nations
  Add new service area properties for new international locations
    - Currently have: “service-state-pennsylvania” + “service-county-washington-adams” “service-national-canada”, etc.
    - Canada: change “service-state-alberta” to “service-canada-province-alberta” + add Canadian cities (service-canada-city-toronto), etc.
    - Mexico: add Mexican states + cities (e.g. “service-mexico-state-baja-california”, “service-mexico-state-sonora” “service-mexico-city-tijuana”)
    - New countries/locations ORAM might need: Turkey, Pakistan, Nigeria, etc.
*/
export const serviceAreaProperties = [];

export const additionalInformationProperties = [
  {
    key: 'has-confidentiality-policy',
    label: 'Has A Confidentiality Policy',
    description: 'If the organization has a confidentiality policy',
    type: 'checkbox'
  },
  {
    key: 'time-walk-in',
    label: 'Has Walk-In Hours',
    description:
      'Accepts walk-ins; Walk-in clinic hours; Legal clinic; No appointment required',
    type: 'checkbox'
  },
  {
    key: 'at-capacity',
    label: 'At capacity',
    description:
      'If the service is currently "at capacity" (i.e. unable to take on new clients)',
    type: 'checkbox'
  },
  {
    key: 'geo-near-public-transit',
    label: 'Near public transportation',
    type: 'checkbox'
  },
  {
    key: 'geo-public-transit-description',
    label: 'Public transit / specific directions',
    description: 'Written description of public transit services',
    type: 'textarea'
  }
];

export const tags = [
  {
    key: 'Community Support',
    label: 'Community Support',
    subcategories: [
      {key: 'Cultural centers', label: 'Cultural centers'},
      {key: 'LGBTQ centers', label: 'LGBTQ centers'}
    ]
  },
  {
    key: 'Computers and Internet',
    label: 'Computers and Internet'
  },
  {
    key: 'Education and Employment',
    label: 'Education and Employment',
    subcategories: [
      {key: 'Career counseling', label: 'Career counseling'},
      {key: 'Scholarships', label: 'Scholarships'},
      {key: 'English classes', label: 'English classes'},
      {key: 'Libraries', label: 'Libraries'},
      {
        key: 'Educational support for LGBTQ youth',
        label: 'Educational support for LGBTQ youth'
      }
    ]
  },
  {
    key: 'Food',
    label: 'Food'
  },
  {
    key: 'Housing',
    label: 'Housing',
    subcategories: [
      {key: 'Short-term housing', label: 'Short-term housing'},
      {
        key: 'Housing information and referrals',
        label: 'Housing information and referrals'
      },
      {key: 'Emergency housing', label: 'Emergency housing'},
      {
        key: 'Drop-in centers for LGBTQ youth',
        label: 'Drop-in centers for LGBTQ youth'
      }
    ]
  },
  {
    key: 'Hygiene and Clothing',
    label: 'Hygiene and Clothing',
    subcategories: [
      {key: 'Gender-neutral bathrooms', label: 'Gender-neutral bathrooms'},
      {key: 'Gender-affirming items', label: 'Gender-affirming items'},
      {key: 'Clothes', label: 'Clothes'},
      {key: 'Hygiene', label: 'Hygiene'}
    ]
  },
  {
    key: 'Legal',
    label: 'Legal',
    subcategories: [
      {key: 'Asylum application', label: 'Asylum application'},
      {key: 'Deportation or removal', label: 'Deportation or removal'},
      {key: 'Name and gender change', label: 'Name and gender change'},
      {
        key: 'Deferred Action for Childhood Arrivals (DACA)',
        label: 'Deferred Action for Childhood Arrivals (DACA)'
      },
      {key: 'Immigration detention', label: 'Immigration detention'},
      {key: 'Crime and discrimination', label: 'Crime and discrimination'},
      {key: 'Legal hotlines', label: 'Legal hotlines'},
      {
        key: 'Special Immigrant Juvenile Status (SIJS)',
        label: 'Special Immigrant Juvenile Status (SIJS)'
      }
    ]
  },
  {
    key: 'Mail',
    label: 'Mail'
  },
  {
    key: 'Medical',
    label: 'Medical',
    subcategories: [
      {key: 'Medical clinics', label: 'Medical clinics'},
      {key: "Women's health", label: "Women's health"},
      {key: 'HIV and sexual health', label: 'HIV and sexual health'},
      {key: 'Trans health', label: 'Trans health'},
      {
        key: 'Physical evaluations for asylum claim',
        label: 'Physical evaluations for asylum claim'
      },
      {key: 'Dental care', label: 'Dental care'}
    ]
  },
  {
    key: 'Mental Health',
    label: 'Mental Health',
    subcategories: [
      {key: 'Hotlines', label: 'Hotlines'},
      {key: 'Support groups', label: 'Support groups'},
      {key: 'Trans support groups', label: 'Trans support groups'},
      {
        key: 'Private therapy and counseling',
        label: 'Private therapy and counseling'
      },
      {
        key: 'Psychological evaluations for asylum claim',
        label: 'Psychological evaluations for asylum claim'
      },
      {key: 'Substance use', label: 'Substance use'}
    ]
  },
  {
    key: 'Sports and Entertainment',
    label: 'Sports and Entertainment'
  },
  {
    key: 'Translation and Interpretation',
    label: 'Translation and Interpretation',
    subcategories: [
      {
        key: 'Transit passes and discounts',
        label: 'Transit passes and discounts'
      },
      {key: 'Transportation assistance', label: 'Transportation assistance'}
    ]
  },
  {
    key: 'Transportation',
    label: 'Transportation'
  }
];
