import * as FileSystem from "expo-file-system";
const { StorageAccessFramework } = FileSystem;

const localPathStorage = "/storage/emulated/0/Documents/ControlDeGastos/";

export const saveJsonFile = async (data, nameFile) => {
  try {
    const jsonContent = JSON.stringify(data);
    const fileUri = `${FileSystem.documentDirectory}${nameFile}.json`;

    await FileSystem.writeAsStringAsync(fileUri, jsonContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    console.log("JSON guardado", fileUri);
  } catch (error) {
    console.error("Error guardando archivo", error);
  }
};

export const readJsonFile = async (file) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}${file}.json`;
    const jsonContent = await FileSystem.readAsStringAsync(fileUri);
    const data = JSON.parse(jsonContent);
    console.log("Información del archivo", data);
    return data;
  } catch (error) {
    console.error("Error al leer el archivo", error);
  }
};

export const saveFile = async (data) => {
  const permissions =
    await StorageAccessFramework.requestDirectoryPermissionsAsync();

  if (permissions.granted) {
    const directoryUri = permissions.directoryUri;
    const info = data;

    await StorageAccessFramework.createFileAsync(
      directoryUri,
      "filename",
      "application/json"
    )
      .then(async (fileUri) => {
        console.log(FileSystem.documentDirectory);
        console.log(fileUri);
        await FileSystem.writeAsStringAsync(fileUri, info, {
          encoding: FileSystem.EncodingType.UTF8,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("Debes permitir el acceso para guardar.");
  }
};

export async function checkFolderExists() {
  let folderPath = FileSystem.documentDirectory + "Documents";
  try {
    const folderInfo = await FileSystem.getInfoAsync(folderPath);
    if (folderInfo.exists && folderInfo.isDirectory) {
      console.log("Folder exists:", folderPath);
    } else {
      console.log("Folder does not exist:", folderPath);
    }
  } catch (error) {
    console.error("Error checking folder:", error);
  }
}

export async function listarContenido() {
  let folderPath = FileSystem.documentDirectory;
  try {
    const archivos = await FileSystem.readDirectoryAsync(folderPath);
    console.log("Archivos en la carpeta:", archivos);
  } catch (error) {
    console.error("Error al listar contenido:", error);
  }
}
