import { promises as fs } from 'fs';

export const getFiles = async directory => {
    try {
        const files = await fs.readdir(directory);
        return files;
    } catch (e) {
        console.error(e);
    }
    return [];
};