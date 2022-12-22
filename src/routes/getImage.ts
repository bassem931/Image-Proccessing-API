import express from 'express';
import path from 'path';
import { imageExist, verifyDimensions } from '../middlewares/validateMiddle';
import { getMetaData, resizeImg } from './sharpModule';

//create route for images
const imageRoute = express.Router();

const resizeFunc = async (
  filePath: string,
  picName: string,
  width: number,
  height: number,
): Promise<string> => {
  const directory = path.join(__dirname, '../../images/');
  const newName = await resizeImg(filePath, picName, width, height);
  return path.join(directory, newName as unknown as string);
};

const getResizedPicture = async (
  picName: string,
  width: number,
  height: number,
  resizedArray: string[],
): Promise<string | undefined> => {
  //boolean
  let isFound = false;
  let requiredPic = '';
  //search resized array for same picture dimensions
  resizedArray.forEach(picResize => {
    //get required name
    requiredPic = picName + `W${width}H${height}`;
    if (picResize === requiredPic) {
      isFound = true;
      return requiredPic;
    }
  });
  if (isFound) {
    return requiredPic;
  } else {
    return 'not found';
  }
};

const getPicture = async (
  filePathOrigin: string,
  picName: string,
  width: number,
  height: number,
  resizedArray: string[],
  res: express.Response,
): Promise<void> => {
  //get directory and extension
  const directory = path.join(__dirname, '../../images/');
  const extension = res.locals.exten as string;
  const requiredPic = await getResizedPicture(
    picName,
    width,
    height,
    resizedArray,
  );
  if (requiredPic !== 'not found') {
    //join path for new find and send as response
    const requiredPicPath = path.join(directory, requiredPic + extension);
    console.log(`${requiredPic} was found in database`);
    res.sendFile(requiredPicPath);
    ``;
  } else {
    try {
      const sharpImg = await resizeFunc(filePathOrigin, picName, width, height);
      console.log(`${`${picName}W${width}H${height}`} was resized using sharp`);
      res.sendFile(sharpImg);
    } catch (error) {
      console.log(error);
    }
  }
};

//get function to retrun image to user
imageRoute.get('/', imageExist, verifyDimensions, (req, res) => {
  //define picture name from url and extension
  const picName = req.query.filename as string;
  const extension = res.locals.exten as string;

  //define if height and weight is provided and valid
  const isValidHeight = res.locals.validHeight as boolean;
  const isValidWidth = res.locals.validWidth as boolean;

  //define image location and directory of images
  const filePath = path.join(__dirname, '../../images/', picName + extension);

  //get ispicresized for checking if resized image is already in the directory
  //const isPicResized = res.locals.isPicResized as boolean;

  // get metadata first then call async functions to change photos
  getMetaData(filePath).then(metaData => {
    if (isValidHeight || isValidWidth) {
      //get resized array
      const resizedArray: string[] = res.locals.resizedArray;

      //both width and height are available
      if (isValidHeight && isValidWidth) {
        //define needed width and length
        const width = parseInt(req.query.width as string);
        const height = parseInt(req.query.height as string);
        //if array is empty resize automatically
        if (resizedArray.length !== 0) {
          getPicture(filePath, picName, width, height, resizedArray, res);
        } else {
          //5osh sharp 3ala tool
          resizeFunc(filePath, picName, width, height).then(sharpImg => {
            res.sendFile(sharpImg);
          });
        }
        //only width is defined
      } else if (!isValidHeight && isValidWidth) {
        //define needed width and length
        const width = parseInt(req.query.width as string);
        const height = parseInt(metaData?.height as unknown as string);

        //if array is empty resize automatically
        if (resizedArray.length !== 0) {
          //call function to check if image is found or resize and return
          getPicture(filePath, picName, width, height, resizedArray, res);
        } else {
          //5osh sharp 3ala tool
          resizeFunc(filePath, picName, width, height).then(sharpImg => {
            res.sendFile(sharpImg);
          });
        }
        //only height is defined
      } else if (isValidHeight && !isValidWidth) {
        //define needed width and length
        const width = parseInt(metaData?.height as unknown as string);
        const height = parseInt(req.query.height as string);

        //call function to check if image is found or resize and return
        if (resizedArray.length !== 0) {
          getPicture(filePath, picName, width, height, resizedArray, res);
        } else {
          //5osh sharp 3ala tool
          resizeFunc(filePath, picName, width, height).then(sharpImg => {
            res.sendFile(sharpImg);
          });
        }
      }
      //go to resize function
    } else {
      //if both not available return original
      res.sendFile(filePath);
    }

    //can test more functionailty here
  });
});

export default imageRoute;
