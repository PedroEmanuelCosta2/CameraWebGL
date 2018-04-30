let sceneObjects = [];

var glContext;
let camera;

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
	sceneObjects.push(new Cube([0,0,0], {r:0.14,g:0.29,b:0.80}));
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

	initProgram();
	initScene();
}

function rotateAroundCube() {
    camera.easeRotation(vec3.fromValues(0,0,0),8,degToRad(360),100);
}