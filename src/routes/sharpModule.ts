import path from 'path';
import sharp from 'sharp';

//sharp functions

const getMetaData = async (
  filePath: string,
): Promise<sharp.Metadata | undefined> => {
  try {
    return await sharp(filePath).metadata();
  } catch (error) {
    console.log(error);
  }
};

const resizeImg = async (
  filePath: string,
  fileName: string,
  width: number,
  height: number,
): Promise<string | undefined> => {
  try {
    await sharp(filePath)
      .resize({
        width: width,
        height: height,
      }) //should add check that file does not exist
      .toFile(
        path.join(
          __dirname,
          '../../images/',
          fileName + `W${width}H${height}` + path.extname(filePath),
        ),
      );
    return path.join(fileName + `W${width}H${height}` + path.extname(filePath));
  } catch (error) {
    console.log(error);
  }
};

export { getMetaData, resizeImg };
