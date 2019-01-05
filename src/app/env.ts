const HTTP_TIMEOUT: number = 60000;

export const LANGUAGE = {
    ENGLISH: "en",
    VIETNAMESSE: "vi"
};

export interface Environment {
    api: string;
    language: string;
    timeout: number;
    debug?: boolean;
    bypass?: boolean;
}

export const TEST: Environment = {
    api: 'http://18.188.229.2/oolaga',
    language: LANGUAGE.ENGLISH,
    timeout: HTTP_TIMEOUT
};

export const PROD: Environment = {
    api: 'http://18.188.229.2/oolaga',
    language: LANGUAGE.ENGLISH,
    timeout: HTTP_TIMEOUT
};

export const ENV: Environment = TEST;