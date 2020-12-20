import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/api';

type AsyncThunkBaseParams = {
  token: string;
  id: number;
};

type AsyncThunkPostParams = AsyncThunkBaseParams & {
  data: unknown;
};

type AsyncThunkPatchParams = AsyncThunkBaseParams & {
  data: unknown;
  contactId: number;
};

type AsyncThunkDeleteParams = AsyncThunkBaseParams & {
  contactId: number;
};

// Contacts
export const getPatientContacts = createAsyncThunk(
  'patients/getPatientContacts',
  async ({ token, id }: AsyncThunkBaseParams) => {
    const response = await API(token).get(`patients/${id}/contacts/`);
    return { patientId: id, contacts: response.data };
  },
);

export const createPatientContact = createAsyncThunk(
  'patients/createPatientContact',
  async ({ token, id, data }: AsyncThunkPostParams) => {
    const response = await API(token).post(`patients/${id}/contacts/`, data);
    return { patientId: id, contact: response.data };
  },
);

export const patchPatientContact = createAsyncThunk(
  'patients/patchPatientContact',
  async ({ token, id, contactId, data }: AsyncThunkPatchParams) => {
    const response = await API(token).patch(
      `patients/${id}/contacts/${contactId}/`,
      data,
    );
    return { patientId: id, contact: response.data };
  },
);

export const deletePatientContact = createAsyncThunk(
  'patients/deletePatientContact',
  async ({ token, id, contactId }: AsyncThunkDeleteParams) => {
    await API(token).delete(`patients/${id}/contacts/${contactId}/`);
    return { patientId: id, contactId };
  },
);

// Medical Contacts
export const getPatientMedicalContacts = createAsyncThunk(
  'patients/getPatientMedicalContacts',
  async ({ token, id }: AsyncThunkBaseParams) => {
    const response = await API(token).get(`patients/${id}/medical_contacts/`);
    return { patientId: id, medicalContacts: response.data };
  },
);

export const createPatientMedicalContact = createAsyncThunk(
  'patients/createPatientMedicalContact',
  async ({ token, id, data }: AsyncThunkPostParams) => {
    const response = await API(token).post(
      `patients/${id}/medical_contacts/`,
      data,
    );
    return { patientId: id, medicalContact: response.data };
  },
);

export const patchPatientMedicalContact = createAsyncThunk(
  'patients/patchPatientMedicalContact',
  async ({ token, id, contactId, data }: AsyncThunkPatchParams) => {
    const response = await API(token).patch(
      `patients/${id}/medical_contacts/${contactId}/`,
      data,
    );
    return { patientId: id, medicalContact: response.data };
  },
);

export const deletePatientMedicalContact = createAsyncThunk(
  'patients/deletePatientMedicalContact',
  async ({ token, id, contactId }: AsyncThunkDeleteParams) => {
    await API(token).delete(`patients/${id}/medical_contacts/${contactId}/`);
    return { patientId: id, contactId };
  },
);
