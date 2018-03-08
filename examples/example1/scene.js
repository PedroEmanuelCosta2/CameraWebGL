let sceneObjects = [];

var glContext;
let camera;

let perspective = 0;
let rotationAroundZ = 0;

function rotateOnYEverySecond() {
    rotationAroundZ += 0.1;
    setTimeout(rotateOnYEverySecond, 16)
}

function perspectiveChange(){
	perspective = perspective ? 0 : 1;
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

	let a = 0.03 * Math.cos(rotationAroundZ);
    let b = 0.03 * Math.sin(rotationAroundZ);

	if (perspective){
		camera.rotate(vec3.fromValues(a,b,-2));
		camera.rotateY(camera.mvMatrix,Math.PI);
	}else{
		camera.rotate(vec3.fromValues(a,b,0));
	}

    camera.uniform();

	for(let i= 0;i<sceneObjects.length;i++)
	{
		sceneObjects[i].draw();
	}
}


function initWebGL()
{
	glContext = getGLContext('webgl-canvas');

	camera = new Camera();

	initProgram();

	initScene();
}