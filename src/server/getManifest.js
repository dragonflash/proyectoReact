//Esta funcion permite leer el archivo manifest.json
import fs from 'fs';

const getManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
  } catch (error) {
    console.log(error);
  }
};

export default getManifest;