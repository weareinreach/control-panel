/**
 ************************************************************
 * Fields for headers and forms
 ************************************************************
 */
export const generalOrgDetailsFields = [
  {key: 'name', label: 'Name'},
  {key: 'website', label: 'Website'},
  {key: 'description', label: 'Description', type: 'textarea'},
  {key: 'alert_message', label: 'Alert Message', type: 'textarea'},
  {key: 'is_published', label: 'Is Published', type: 'checkbox'}
];

export const generalServiceDetailsFields = [
  {key: 'name', label: 'Name'},
  {key: 'description', label: 'Description', type: 'textarea'},
  {key: 'is_published', label: 'Is Published', type: 'checkbox'}
];

export const emailFields = [
  {key: 'email', label: 'Email'},
  {key: 'title', label: 'Title'},
  {key: 'first_name', label: 'First Name'},
  {key: 'last_name', label: 'Last Name'},
  {key: 'is_primary', label: 'Is Primary', type: 'checkbox'},
  {key: 'show_on_organization', label: 'Show on Org', type: 'checkbox'}
];

export const locationFields = [
  {key: 'name', label: 'Name'},
  {key: 'unit', label: 'Unit'},
  {key: 'address', label: 'Address'},
  {key: 'city', label: 'City'},
  {key: 'state', label: 'State'},
  {key: 'country', label: 'Country'},
  {key: 'zip_code', label: 'Zipcode'},
  {key: 'lat', label: 'Lat'},
  {key: 'long', label: 'Long'},
  {key: 'is_primary', label: 'Is Primary', type: 'checkbox'},
  {key: 'show_on_organization', label: 'Show on Org', type: 'checkbox'}
];

export const phoneFields = [
  {
    key: 'phone_type',
    label: 'Phone Type',
    placeholder: 'For example is it a mobile, fax, office phone?'
  },
  {key: 'digits', label: 'Digits'},
  {key: 'is_primary', label: 'Is Primary', type: 'checkbox'},
  {key: 'show_on_organization', label: 'Show on Org', type: 'checkbox'}
];

export const scheduleFields = [
  {key: 'monday_start', label: 'Monday Start'},
  {key: 'monday_end', label: 'Monday End'},
  {key: 'tuesday_start', label: 'Tuesday Start'},
  {key: 'tuesday_end', label: 'Tuesday End'},
  {key: 'wednesday_start', label: 'Wednesday Start'},
  {key: 'wednesday_end', label: 'Wednesday End'},
  {key: 'thursday_start', label: 'Thursday Start'},
  {key: 'thursday_end', label: 'Thursday End'},
  {key: 'friday_start', label: 'Friday Start'},
  {key: 'friday_end', label: 'Friday End'},
  {key: 'saturday_start', label: 'Saturday Start'},
  {key: 'saturday_end', label: 'Saturday End'},
  {key: 'sunday_start', label: 'Sunday Start'},
  {key: 'sunday_end', label: 'Sunday End'},
  {
    key: 'timezone',
    label: 'Timezone',
    type: 'select',
    placeholder: 'Select a timezone',
    options: [
      {label: 'AKST', value: 'AKST'},
      {label: 'AST', value: 'AST'},
      {label: 'CST', value: 'CST'},
      {label: 'EST', value: 'EST'},
      {label: 'HST', value: 'HST'},
      {label: 'MDT', value: 'MDT'},
      {label: 'MST', value: 'MST'},
      {label: 'NST', value: 'NST'},
      {label: 'PDT', value: 'PDT'},
      {label: 'PST', value: 'PST'}
    ]
  },
  {key: 'note', label: 'Note', type: 'textarea'}
];

/**
 ************************************************************
 * Properties
 ************************************************************
 */
export const communityProperties = [
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

export const languageProperties = [
  {key: 'lang-Albanian', label: 'lang-Albanian', type: 'checkbox'},
  {
    key: 'lang-all-languages-by-interpreter',
    label: 'lang-all-languages-by-interpreter',
    type: 'checkbox'
  },
  {
    key: 'lang-american-sign-language',
    label: 'lang-american-sign-language',
    type: 'checkbox'
  },
  {key: 'lang-amharic', label: 'lang-amharic', type: 'checkbox'},
  {key: 'lang-arabic', label: 'lang-arabic', type: 'checkbox'},
  {key: 'lang-armenian', label: 'lang-armenian', type: 'checkbox'},
  {key: 'lang-bengali', label: 'lang-bengali', type: 'checkbox'},
  {key: 'lang-berber', label: 'lang-berber', type: 'checkbox'},
  {key: 'lang-bhutanese', label: 'lang-bhutanese', type: 'checkbox'},
  {key: 'lang-bosnian', label: 'lang-bosnian', type: 'checkbox'},
  {key: 'lang-Bulgarian', label: 'lang-Bulgarian', type: 'checkbox'},
  {key: 'lang-burmese', label: 'lang-burmese', type: 'checkbox'},
  {key: 'lang-cambodian', label: 'lang-cambodian', type: 'checkbox'},
  {key: 'lang-cantonese', label: 'lang-cantonese', type: 'checkbox'},
  {key: 'lang-cebuano', label: 'lang-cebuano', type: 'checkbox'},
  {key: 'lang-Chin', label: 'lang-Chin', type: 'checkbox'},
  {key: 'lang-chiu-chow', label: 'lang-chiu-chow', type: 'checkbox'},
  {key: 'lang-Creole', label: 'lang-Creole', type: 'checkbox'},
  {key: 'lang-croatian', label: 'lang-croatian', type: 'checkbox'},
  {key: 'lang-dari', label: 'lang-dari', type: 'checkbox'},
  {key: 'lang-Dinka', label: 'lang-Dinka', type: 'checkbox'},
  {key: 'lang-eritrean', label: 'lang-eritrean', type: 'checkbox'},
  {key: 'lang-farsi', label: 'lang-farsi', type: 'checkbox'},
  {key: 'lang-fiji', label: 'lang-fiji', type: 'checkbox'},
  {key: 'lang-french', label: 'lang-french', type: 'checkbox'},
  {key: 'lang-fukienese', label: 'lang-fukienese', type: 'checkbox'},
  {key: 'lang-german', label: 'lang-german', type: 'checkbox'},
  {key: 'lang-greek', label: 'lang-greek', type: 'checkbox'},
  {key: 'lang-Gujarati', label: 'lang-Gujarati', type: 'checkbox'},
  {key: 'lang-Hebrew', label: 'lang-Hebrew', type: 'checkbox'},
  {key: 'lang-hindi', label: 'lang-hindi', type: 'checkbox'},
  {key: 'lang-hmong', label: 'lang-hmong', type: 'checkbox'},
  {key: 'lang-Hunan', label: 'lang-Hunan', type: 'checkbox'},
  {key: 'lang-Hungarian', label: 'lang-Hungarian', type: 'checkbox'},
  {key: 'lang-ilocano', label: 'lang-ilocano', type: 'checkbox'},
  {key: 'lang-indonesian', label: 'lang-indonesian', type: 'checkbox'},
  {key: 'lang-italian', label: 'lang-italian', type: 'checkbox'},
  {key: 'lang-japanese', label: 'lang-japanese', type: 'checkbox'},
  {key: 'lang-karen', label: 'lang-karen', type: 'checkbox'},
  {key: 'lang-karenni', label: 'lang-karenni', type: 'checkbox'},
  {key: 'lang-Katchi', label: 'lang-Katchi', type: 'checkbox'},
  {key: 'lang-khmer', label: 'lang-khmer', type: 'checkbox'},
  {key: 'lang-kiche', label: 'lang-kiche', type: 'checkbox'},
  {key: 'lang-Kirundi', label: 'lang-Kirundi', type: 'checkbox'},
  {key: 'lang-kiswahili', label: 'lang-kiswahili', type: 'checkbox'},
  {key: 'lang-korean', label: 'lang-korean', type: 'checkbox'},
  {key: 'lang-Kurdish', label: 'lang-Kurdish', type: 'checkbox'},
  {key: 'lang-Kurmanji', label: 'lang-Kurmanji', type: 'checkbox'},
  {key: 'lang-laotian', label: 'lang-laotian', type: 'checkbox'},
  {key: 'lang-Lingala', label: 'lang-Lingala', type: 'checkbox'},
  {key: 'lang-mam', label: 'lang-mam', type: 'checkbox'},
  {key: 'lang-mandarin', label: 'lang-mandarin', type: 'checkbox'},
  {key: 'lang-mandingo', label: 'lang-mandingo', type: 'checkbox'},
  {key: 'lang-Marathi', label: 'lang-Marathi', type: 'checkbox'},
  {key: 'lang-mien', label: 'lang-mien', type: 'checkbox'},
  {key: 'lang-mongolian', label: 'lang-mongolian', type: 'checkbox'},
  {key: 'lang-nepali', label: 'lang-nepali', type: 'checkbox'},
  {key: 'lang-pashto', label: 'lang-pashto', type: 'checkbox'},
  {key: 'lang-Polish', label: 'lang-Polish', type: 'checkbox'},
  {key: 'lang-portuguese', label: 'lang-portuguese', type: 'checkbox'},
  {key: 'lang-punjabi', label: 'lang-punjabi', type: 'checkbox'},
  {key: 'lang-Quechua', label: 'lang-Quechua', type: 'checkbox'},
  {key: 'lang-romanian', label: 'lang-romanian', type: 'checkbox'},
  {key: 'lang-russian', label: 'lang-russian', type: 'checkbox'},
  {key: 'lang-samoan', label: 'lang-samoan', type: 'checkbox'},
  {key: 'lang-senufo', label: 'lang-senufo', type: 'checkbox'},
  {key: 'lang-serbian', label: 'lang-serbian', type: 'checkbox'},
  {key: 'lang-Sinhala', label: 'lang-Sinhala', type: 'checkbox'},
  {key: 'lang-somali', label: 'lang-somali', type: 'checkbox'},
  {key: 'lang-spanish', label: 'lang-spanish', type: 'checkbox'},
  {key: 'lang-tagalog', label: 'lang-tagalog', type: 'checkbox'},
  {key: 'lang-taiwanese', label: 'lang-taiwanese', type: 'checkbox'},
  {key: 'lang-Tamil', label: 'lang-Tamil', type: 'checkbox'},
  {key: 'lang-telugu', label: 'lang-telugu', type: 'checkbox'},
  {key: 'lang-thai', label: 'lang-thai', type: 'checkbox'},
  {key: 'lang-tibetan', label: 'lang-tibetan', type: 'checkbox'},
  {key: 'lang-tigrigna', label: 'lang-tigrigna', type: 'checkbox'},
  {key: 'lang-tigrinya', label: 'lang-tigrinya', type: 'checkbox'},
  {key: 'lang-toisanese', label: 'lang-toisanese', type: 'checkbox'},
  {key: 'lang-tongan', label: 'lang-tongan', type: 'checkbox'},
  {key: 'lang-Turkish', label: 'lang-Turkish', type: 'checkbox'},
  {key: 'lang-Twi', label: 'lang-Twi', type: 'checkbox'},
  {key: 'lang-ukrainian', label: 'lang-ukrainian', type: 'checkbox'},
  {key: 'lang-urdu', label: 'lang-urdu', type: 'checkbox'},
  {key: 'lang-vietnamese', label: 'lang-vietnamese', type: 'checkbox'},
  {key: 'lang-wolof', label: 'lang-wolof', type: 'checkbox'}
];

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

/**
 ************************************************************
 * Tags
 ************************************************************
 */
export const tags = {
  canada: {
    'Community Support': ['Cultural centres', 'LGBTQ centres'],
    'Computers and Internet': [],
    'Education and Employment': [
      'Career counselling',
      'Scholarships',
      'Language classes',
      'Libraries',
      'Educational support for LGBTQ youth'
    ],
    Food: [],
    Housing: [
      'Short-term housing',
      'Housing information and referrals',
      'Emergency housing',
      'Drop-in centres for LGBTQ youth'
    ],
    'Hygiene and Clothing': [
      'Gender-neutral washrooms',
      'Gender-affirming items',
      'Clothes',
      'Hygiene'
    ],
    Legal: [
      'Refugee claim',
      'Deportation or removal',
      'Name and gender change',
      'Immigration detention',
      'Crime and discrimination',
      'Legal hotlines'
    ],
    Medical: [
      'Medical clinics',
      "Women's health",
      'HIV and sexual health',
      'Trans health',
      'Physical evaluations for refugee claim',
      'Dental care'
    ],
    'Mental Health': [
      'Hotlines',
      'Support groups',
      'Trans support groups',
      'Private therapy and counselling',
      'Psychological evaluations for refugee claim',
      'Substance use'
    ],
    'Sports and Entertainment': [],
    'Translation and Interpretation': [],
    Transportation: [
      'Transit passes and discounts',
      'Transportation assistance'
    ]
  },
  mexico: {
    'Community Support': ['Cultural centers', 'LGBTQ centers'],
    'Computers and Internet': [],
    'Education and Employment': [
      'Career counseling',
      'Scholarships',
      'Language Classes',
      'Libraries',
      'Educational support for LGBTQ youth'
    ],
    Food: [],
    Housing: [
      'Housing information and referrals',
      'Emergency housing',
      'Drop-in centers for LGBTQ youth'
    ],
    'Hygiene and Clothing': [
      'Gender-neutral restrooms',
      'Gender-affirming items',
      'Clothes',
      'Hygiene'
    ],
    Legal: [
      'Asylum application in the US from Mexico',
      'Asylum application in Mexico',
      'Deportation or removal',
      'Name and gender change',
      'Immigration detention',
      'Crime and discrimination'
    ],
    Medical: [
      'Medical clinics',
      "Women's health",
      'HIV and sexual health',
      'Trans health',
      'Physical evaluations for asylum claim',
      'Dental care'
    ],
    'Mental Health': [
      'Hotlines',
      'Support groups',
      'Trans support groups',
      'Private therapy and counseling',
      'Psychological evaluations for asylum claim',
      'Substance use'
    ],
    'Sports and Entertainment': [],
    'Translation and Interpretation': [],
    Transportation: [
      'Transit passes and discounts',
      'Transportation assistance'
    ]
  },
  unitedStates: {
    'Community Support': ['Cultural centers', 'LGBTQ centers'],
    'Computers and Internet': [],
    'Education and Employment': [
      'Career counseling',
      'Educational support for LGBTQ youth',
      'English classes',
      'Libraries',
      'Scholarships'
    ],
    Food: [],
    Housing: [
      'Short-term housing',
      'Drop-in centers for LGBTQ youth',
      'Emergency housing',
      'Housing information and referrals'
    ],
    'Hygiene and Clothing': [
      'Clothes',
      'Gender-affirming items',
      'Gender-neutral bathrooms',
      'Hygienee'
    ],
    Legal: [
      'Asylum application',
      'Crime and discrimination',
      'Deferred Action for Childhood Arrivals (DACA)',
      'Deportation or removal',
      'Immigration detention',
      'Legal hotlines',
      'Name and gender change',
      'Special Immigrant Juvenile Status (SIJS)'
    ],
    Mail: [],
    Medical: [
      'Dental care',
      'HIV and sexual health',
      'Medical clinics',
      'Physical evaluations for asylum claim',
      'Trans health',
      "Women's health"
    ],
    'Mental Health': [
      'Hotlines',
      'Private therapy and counseling',
      'Psychological evaluations for asylum claim',
      'Substance use',
      'Support groups',
      'Trans support groups'
    ],
    'Sports and Entertainment': [],
    'Translation and Interpretation': [],
    Transportation: [
      'Transit passes and discounts',
      'Transportation assistance'
    ]
  }
};
