import API from '@/api';

export const getPatientAlertConfigs = async ({token, id}) => {
    const alertConfigs = await API(token).get(`patients/${id}/alertconfigs/`);
    return {patientId: id, alertConfigs: alertConfigs.data};
};

export const createPatientAlertConfigs = async ({token, id, data}) => {
    const alertConfig = await API(token).post(
        `patients/${id}/alertconfigs/`,
        data,
    );
    return {patientId: id, alertConfig: alertConfig.data};
};

export const patchPatientAlertConfigs = async ({
    token,
    id,
    alertConfigId,
    data,
}) => {
    const alertConfig = await API(token).patch(
        `patients/${id}/alertconfigs/${alertConfigId}/`,
        data,
    );
    return {patientId: id, alertConfig: alertConfig.data};
};

export const deletePatientAlertConfigs = async ({token, id, alertConfigId}) => {
    await API(token).delete(`patients/${id}/alertconfigs/${alertConfigId}/`);
    return {patientId: id, alertConfigId};
};
