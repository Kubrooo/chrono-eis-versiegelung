import Conf from "conf";

const config = new Conf({ projectName: 'chrono-cli' });

export const getPreferences = () => {
    return {
        jiraPrefix: config.get('jiraPrefix') as string || '',
        commitStyle: config.get('commitStyle') as string || 'conventional',
    };
};

export const setPreference = (key: string, value: any) => {
    config.set(key, value);
};