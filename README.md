# Image Processing API

Image Processing API using sharp module for Udacity FWD program it is the first project in the Udacity advanced web development program. The goal is to implement an image processing API that uses the sharp module to resize any image to the needed size.

## API overview

This API is an image processing API that can be used to resize any image in the directory. The height and width can be set as intended and the API will return the required photo. The image has to be in the images project. To use first run the code as a localhost then access the /image route and set the query parameters as required.

### Health check

To check the health of the server and its availability , access the main route of the API by searching for the _localhost:port_ (default in code is 3000) in the url bar of your browser. A message with _'main route'_ will be displayed with a status of 200(ok).

### Setting query parameters

to set query parameters set **filename** parameter to be the name of the picture in the directory
for height and width set **height** parameter to be a positive number and **width** to be a positive number

## Code explained

the code is very systematic. it consists of one endpoint that is used along with two middleware. The first one called imageExist is used to check that filename is not empty
then searches for the filename parameter in the images directory after finding the image the next middleware checks for the height and width parameters to make sure they are valid
after everything is checked the main get function in the /image route is accessed were the image is first searched to check that the image was not already created in the directory as
a resized image. if the image is found it is send as a result and if not found sharp module is called to resize and send the image.

### Error handling

if any error rises it is handled and sent to the user as a response to ensure that the error is clear. in case of any invalid input the input is rejected and a clear message is sent
