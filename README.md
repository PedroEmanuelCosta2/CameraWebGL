# CameraWebGL

A JavaScript module that will facilitate the use of cameras in your WebGL project.

## Goal

Cameras in WebGL are quite hard to manipulate and to understand how they work. 
So this module will provide functions that will ease the way you use cameras in WebGL.

## How to use it

First, you need to import the following js files : ```gl-matrix-min.js```, ```webglTools.js``` and ```camgl.js``` if one of these file is missing, there will be an alert that will tell you to import it. 

When all these files are imported, you'll need to create a camera object with the following line.

``` javascript
  var camera = new Camera();
```

Then, the camera needs to know how it's frustum will work and what will be it's dimensions. So you need to call one of these two functions.

``` javascript
  //It will set the pMatrix of the camera with a perspective view.
  camera.perspective(radianAngle, viewPortRatio, nearBound, farBound); 
  
  //It will set the pMatrix of the camera with an orthogonal view.
  camera.orthogonal(left, right, bottom, top, near, far);
  
  //ps : if you already have one of these lines in your code, you could replace it
  //with one of the preceding lines.
```

If you want to change the dimensions of the frustum after you've set it with one of these two functions, you can use the following function.

``` javascript
  //It will set the dimensions of the frustum
  camera.setFrustum(left, right, bottom, top, near, far);
```

Now you would like to set the position of the camera, at any moment of your project you can easily change the camera's position with the following function.

``` javascript
  camera.setPositionOfCamera(x, y, z);
```

Ok, now that you've init the camera, we'd like to update it to take in count all the future camera's movements. To do that, you'll need to call the update function in the drawScene function of your project so it'll constently update the camera's settings.

``` javascript
  camera.update();
```

Finally, you'll need to pass the pMatrix and mvMatrix of the camera to the vertexShader. To do that, you need to do it in the draw function of your objects because you want to pass the matrices just once.
The following function will do that for you.

``` javascript
  //multMvMatrix and multPMatrix will multiply the matrices in arguments
  //with the matrices of the camera
  let mvMatrix = camera.multMvMatrix(this.mvMatrix); //this.mvMatrix is the mvMatrix of your objects
  let pMatrix = camera.multPMatrix(this.pMatrix); //this.pMatrix is the pMatrix of your objects

  //The matrices that are return could now be passed to the vertexShader
  glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);
  glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
```

Now you have set the camera, your project should work the same as before. But, you'll be able now to move the camera all around the scene and observe your project from differents points of view.

To move the camera, you have plenty of functions that will update the camera's movements. 

``` javascript
  //Will set the target that the camera will point in the scene.
  setTargetOfCamera(x, y, z);
  
  //Will set the camera's position with an animation.
  //If the dt is high, the speed of the movement will be slow.
  //On the other hand if the dt is low the speed will be high.
  easePositionOfCamera(x, y, z, dt);
  
  //Will set the camera's target with an animation.
  easeTargetOfCamera(x, y, z, dt);
  
  //Will set a movement for the camera with geometrical functions.
  //x, y and z are the functions for the differents axes.
  easeGeometricalFunction(x, y, z, value, dt);
  
  //Exemple that use easeGeometricalFunction()
  easeRotation(point, radius, angle, dt);
```

For more details and see how it works with some projects. See the examples folder.
