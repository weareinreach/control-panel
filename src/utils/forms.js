export const newSchedule = {
  monday_start: '',
  monday_end: '',
  tuesday_start: '',
  tuesday_end: '',
  wednesday_start: '',
  wednesday_end: '',
  thursday_start: '',
  thursday_end: '',
  friday_start: '',
  friday_end: '',
  saturday_start: '',
  saturday_end: '',
  sunday_start: '',
  sunday_end: '',
  note: '',
  timezone: ''
};

export const getOrgInitialValues = initialValues => {
  return {
    alert_message: initialValues?.alert_message || '',
    description: initialValues?.description || '',
    emails: initialValues?.emails || [],
    is_published: initialValues?.is_published || false,
    locations: initialValues?.locations || [],
    name: initialValues?.name || '',
    phones: initialValues?.phones || [],
    properties: initialValues?.properties || {},
    schedules: initialValues?.schedules || [],
    services: initialValues?.services || [],
    slug: initialValues?.slug || '',
    website: initialValues?.website || ''
  };
};

export const getServiceInitialValues = initialValues => {
  return {
    access_instructions: initialValues?.access_instructions || [],
    description: initialValues?.description || '',
    email_id: initialValues?.email_id || [],
    is_published: initialValues?.is_published || false,
    location_id: initialValues?.location_id || [],
    name: initialValues?.name || '',
    phone_id: initialValues?.phone_id || [],
    properties: initialValues?.properties || {},
    schedule_id: initialValues?.schedule_id || null,
    services: initialValues?.services || [],
    slug: initialValues?.slug || '',
    tags: initialValues?.tags || []
  };
};
