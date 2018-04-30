let sceneObjects = [];

var glContext;
let camera;
let vecPosCamera = vec3.create();
let vecFocusCamera = vec3.create();

function initShaderParameters(prg)
{
	prg.vertexPositionAttribute = glContext.getAttribLocation(prg,"aVertexPosition");
	glContext.enableVertexAttribArray(prg.vertexPositionAttribute);

	prg.colorAttribute = glContext.getAttribLocation(prg,"aColor");
	glContext.enableVertexAttribArray(prg.colorAttribute);

    prg.pMatrixUniform  = glContext.getUniformLocation(prg, 'uPMatrix');
    prg.mvMatrixUniform = glContext.getUniformLocation(prg, 'uMVMatrix');
}

function initScene()
{
	sceneObjects.push(new Cube([-6,4,-6], {r:0.14,g:0.29,b:0.80}));
	sceneObjects.push(new Cube([4,4,-9], {r:0.14,g:0.39,b:0.90}));
	sceneObjects.push(new Cube([7,2,-4], {r:0.14,g:0.49,b:1.0}));

	renderLoop();
}

function drawScene()
{
	glContext.clearColor(0.9, 0.9, 0.9, 1.0);
	glContext.enable(glContext.DEPTH_TEST);
	glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
	glContext.viewport(0, 0, c_width, c_height);

	for(let i= 0;i<sceneObjects.length;i++)
	{
		sceneObjects[i].draw(camera);
	}

    camera.update();
}


function initWebGL()
{
	glContext = getGLContext('webgl-canvas');

	camera = new Camera();

    camera.setPositionOfCamera(0,0,8);
    camera.perspective(degToRad(60), c_width/c_height, 0.1, 10000);
    // camera.orthogonal(-10,10,-10,10,0.1,1000);

	initProgram();
	initScene();
}

function focusOnCube1(){
    camera.easeTargetOfCamera(-6,4,-6,100);
    vec3.set(vecPosCamera,-6, 5, -2);
    vec3.set(vecFocusCamera, 0, 1, 0);
}

function focusOnCube2(){
    camera.easeTargetOfCamera(4,4,-9,100);
    vec3.set(vecPosCamera,4, 5, -5);
    vec3.set(vecFocusCamera, 4, 4, -9);
}

function focusOnCube3(){
    camera.easeTargetOfCamera(7,2,-4,100);
    vec3.set(vecPosCamera,7, 3, 0);
    vec3.set(vecFocusCamera, 7, 2, -4);
}

function setPositionSmooth() {
    camera.easePositionOfCamera(vecPosCamera[0],vecPosCamera[1], vecPosCamera[2], 100);
}