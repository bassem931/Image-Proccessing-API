import app from '../main';
import supertest from 'supertest';
import path from 'path';
import * as fs from 'fs';
import { getMetaData, resizeImg } from '../routes/sharpModule';
//import { request } from 'express';

describe('API testbench', () => {
  //suite for API endpoint
  describe('Tests using supertest', () => {
    it('test API endpoint base url', () => {
      //start app on different ports
      const app1 = app.listen(8000);
      //test
      supertest(app1)
        .get('/')
        .expect(200)
        .expect('Main route')
        .end(err => {
          if (err) {
            fail(err);
          }
        });
    });

    //localhost:port/image
    it('test API endpoint with no query parameters', () => {
      //start app on different ports
      const app1 = app.listen(4000);
      //test
      supertest(app1)
        .get('/image')
        .expect(400)
        .expect('no filename is given')
        .end(err => {
          if (err) {
            fail(err);
          }
        });
    });
    //localhost:3000/image?filename=foxdxfkl
    it('test API with filename', () => {
      //start app on different ports
      const app1 = app.listen(5000);
      //test
      supertest(app1)
        .get('/image?filename=foxdxfkl')
        .expect(404)
        .end(err => {
          if (err) {
            fail(err);
          }
        });
    });
    it('test API with negative width', () => {
      //start app on different ports
      const app1 = app.listen(7000);
      //test
      supertest(app1)
        .get('/image?filename=fjord&width=-200')
        .expect(400)
        .expect('please provide a positive width')
        .end(err => {
          if (err) {
            fail(err);
          }
        });
    });
  });

  //tests for sharp functions
  describe('tests for sharp functions', () => {
    //variables needed for function to run
    const filePath = path.join(__dirname, '../../images/fjord.jpg');

    // afterEach(() => {
    //   fs.unlink(path.join(__dirname, '../../images/fjordW100H100.jpg'), err => {
    //     if (err) throw err;
    //   });
    // });

    it('test sharp get metadata function', async () => {
      const metadata = await getMetaData(filePath);
      expect(metadata?.width).toBeGreaterThan(0);
      expect(metadata?.format).toEqual('jpeg');
    });

    it('test sharp for resize image', async () => {
      const imgLocation = await resizeImg(filePath, 'fjord', 100, 100);
      expect(imgLocation).toBe(path.join('fjordW100H100.jpg'));
      fs.unlink(
        path.join(__dirname, '../../images/fjordW100H100.jpg'),
        error => {
          if (error) {
            fail(error);
          }
        },
      );
    });
  });
});
