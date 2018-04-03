let sceneObjects = [];

var glContext;
let camera;

let rotationAroundZ = 0;

function rotateOnYEverySecond() {
    rotationAroundZ += 0.1;
    setTimeout(rotateOnYEverySecond, 16)
}

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
	sceneObjects.push(new Triangle(0.8, {r:0.14,g:0.29,b:0.80}, -0.2));
	sceneObjects.push(new Triangle(0.6, {r:0.14,g:0.39,b:0.90}, -0.4));
	sceneObjects.push(new Triangle(0.4, {r:0.14,g:0.49,b:1.0}, -0.6));
	sceneObjects.push(new Triangle(0.2, {r:0.14,g:0.59,b:1.0}, -0.8));
	sceneObjects.push(new Triangle(0.1, {r:0.14,g:0.69,b:1.0}, -1.0));

	rotateOnYEverySecond();
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

    camera.setPositionOfCamera(0,0,1);
    camera.perspective(degToRad(60), c_width/c_height, 0.1, 10000);
    // camera.setOrtho(-3,3,-3,3,0.1,100);

	initProgram();

	initScene();
}

function updatePosition() {
    let x = document.getElementById("x_range").value;
    let y = document.getElementById("y_range").value;
    let z = document.getElementById("z_range").value;

    camera.setPositionOfCamera(x,y,z);
}