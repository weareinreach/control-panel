export const newSchedule = {
  sunday: {start_time: '', end_time: '', timezone: ''},
  monday: {start_time: '', end_time: '', timezone: ''},
  tuesday: {start_time: '', end_time: '', timezone: ''},
  wednesday: {start_time: '', end_time: '', timezone: ''},
  thursday: {start_time: '', end_time: '', timezone: ''},
  friday: {start_time: '', end_time: '', timezone: ''},
  saturday: {start_time: '', end_time: '', timezone: ''}
};

export const getOrgInitialValues = initialValues => {
  return {
    alert_message: initialValues?.alert_message || '',
    description: initialValues?.description || '',
    emails: initialValues?.emails || [],
    is_at_capacity: initialValues?.is_at_capacity || false,
    is_published: initialValues?.is_published || false,
    locations: initialValues?.locations || [],
    name: initialValues?.name || '',
    phones: initialValues?.phones || [],
    schedule: initialValues?.schedule || newSchedule,
    services: initialValues?.services || [],
    slug: initialValues?.slug || '',
    website: initialValues?.website || ''
  };
};

export const getServiceInitialValues = initialValues => {
  return {
    description: initialValues?.description || '',
    emails: initialValues?.emails || [],
    is_at_capacity: initialValues?.is_at_capacity || false,
    is_published: initialValues?.is_published || false,
    locations: initialValues?.locations || [],
    name: initialValues?.name || '',
    phones: initialValues?.phones || [],
    schedule: initialValues?.schedule || null,
    services: initialValues?.services || [],
    slug: initialValues?.slug || '',
    website: initialValues?.website || ''
  };
};
