import express from 'express';
import path from 'path';
import * as fs from 'fs';

//function to search if image is present in directory
const imageExist = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  //path of images
  const imagesPath = path.join(__dirname, '../../images');

  // read the images directory to get pictures names
  const picNames = fs.readdirSync(imagesPath);

  // get name of picture requested from query parameters
  const urlName = req.query.filename as string;

  //flag to check if pic is found
  let isPicFound = false;

  //check filename parameter exists
  if (!req.query.filename) {
    res.status(400).send('no filename is given');
    //return to prevent rest of code running
    return;
  }

  //resized array to send to get function
  const resizedArray: string[] = [];

  picNames.forEach(pic => {
    //picture name
    const fileName = path.parse(pic).name;
    if (fileName === urlName) {
      //get extension
      const ext = path.parse(pic).ext;
      //set exten as the extension of the picture to pass it to the get
      res.locals.exten = ext;
      //set isfound = true to pass to the next
      isPicFound = true;
    }

    //search for resized pictures and send to getImage
    if (fileName.slice(0, urlName.length) === urlName) {
      //name of part after fileName in case of resized image
      const dimName = fileName.slice(urlName.length);

      //if conditions to make sure it is a resized image not an error
      //test first letter is W followed by a number then an H is the string followed by a number
      //number check is done using to lower and to upper case as they true on letters only
      //if both are equal in type
      if (
        dimName.charAt(0) === 'W' &&
        dimName.charAt(1).toLowerCase() === dimName.charAt(1).toUpperCase() &&
        dimName.includes('H')
      ) {
        const heightNum = dimName.indexOf('H');
        if (
          dimName.charAt(heightNum + 1).toLowerCase() ===
          dimName.charAt(heightNum + 1).toUpperCase()
        ) {
          //send resized file name
          resizedArray.push(fileName);
        }
      }
    }
  });

  //send resized array to get function
  res.locals.resizedArray = resizedArray;

  //exited loop without finding picture
  if (!isPicFound) {
    res.status(404).send(`Picture ${urlName} not found
    available images: ${picNames}`);
    return;
  } else {
    next();
  }
};

const verifyDimensions = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  res.locals.validHeight = false;
  res.locals.validWidth = false;

  if (req.query.height) {
    //check conditions for height
    const height = req.query.height as unknown as string;

    //check height is a number
    if (isNaN(parseInt(height))) {
      res.status(400).send('please enter a number for the height');
    } else if (parseInt(height) <= 0) {
      //height is number less than 0 so negative
      res.status(400).send('please provide a positive height');
    } else {
      //if height is positive it is valid
      res.locals.validHeight = true;
    }
  }

  //check if width only
  if (req.query.width) {
    const width = req.query.width as unknown as string;

    //check width is a number
    if (isNaN(parseInt(width))) {
      res.status(400).send('please enter a number for the width');
    } else if (parseInt(width) <= 0) {
      //width is number less than 0 so negative
      res.status(400).send('please provide a positive width');
    } else {
      //if width is positive it is valid
      res.locals.validWidth = true;
    }
  }

  // we have the valid width or length so return
  //console.log(res.locals.validHeight, res.locals.validWidth);
  return next();
};
export { imageExist, verifyDimensions };
