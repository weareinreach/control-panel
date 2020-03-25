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
    email_id: initialValues?.email_id || '',
    is_published: initialValues?.is_published || false,
    location_id: initialValues?.location_id || '',
    name: initialValues?.name || '',
    phone_id: initialValues?.phone_id || '',
    properties: initialValues?.properties || {},
    schedule_id: initialValues?.schedule_id || '',
    services: initialValues?.services || [],
    slug: initialValues?.slug || '',
    tags: initialValues?.tags || []
  };
};
