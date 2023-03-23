const DB = require("./correccions.json");
const { saveToDatabase } = require("./utils");
const { v4: uuid } = require("uuid");

const getCorreccio = (correccioId) => {
  try {
    const correccio = DB.correccions.find((correccio) => correccio.id === correccioId);

    if (!correccio) {
      console.log(`No es pot trobal la correcció amb la id '${correccioId}'`)
    }
    return correccio;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const registerCorreccio = (errors) => {
  const newCorreccio = {
    id: uuid(),
    errors,
  };
  try {
    DB.correccions.push(newCorreccio);
    saveToDatabase(DB);
    return newCorreccio;
  } catch (error) {
    console.log(error);
  }

};

const deleteCorreccio = (correccioId) => {
  try {
    const indexForDeletion = DB.correccions.findIndex(
      (correccio) => correccio.id === correccioId
    );
    DB.correccions.splice(indexForDeletion, 1);
    saveToDatabase(DB);
    console.log(`Correcció amb la id '${correccioId}' s'ha borrat correctament`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerCorreccio,
  deleteCorreccio,
  getCorreccio
}