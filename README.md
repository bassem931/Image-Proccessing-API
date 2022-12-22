# Image Processsing API
 Image Processing API using sharp module for Udacity FWD program

## API overview
this API is an image processing API that can be used to resize any image in the directory. The height and width can be set as intended and the API will return the required photo
the image has to be in the images project. to use first run the code as a localhost then access the /images route and set the query parameters as required

### setting query parameters
to set query parameters set **filename** paramter to be the name of the picture in the directory
for height and width set **height** parameter to be a positive number and **width** to be a positive number

## Code explained
the code is very systematic. it consists of one endpoint that is used along with two middlewares. The first one called imageExist is used to check that filename is not empty
then searches for the filename parameter in the images directory after finding the image the next middleware checks for the height and width parameters to make sure they are valid
after everything is checked the main get function in the /image route is accessed were the image is first searched to check that the image was not already created in the directory as 
a resized image. if the image is found it is send as a result and if not found sharp module is called to resize and send the image.

### error handling
if any error rises it is handled and sent to the user as a response to ensure that the error is clear. in case of any invalid input the input is rejected and a clear message is sent


