let sceneObjects = [];

var glContext;
let camera;
let vecPosCamera = vec3.create();

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
	sceneObjects.push(new Triangle([[-6,0,-6],[-3,0,-6],[-4.5,3,-6]], {r:0.14,g:0.29,b:0.80}));
	sceneObjects.push(new Triangle([[4,0,-9],[7,0,-9],[5.5,3,-9]], {r:0.14,g:0.39,b:0.90}));
	sceneObjects.push(new Triangle([[7,4,-4],[10,4,-4],[8.5,7,-4]], {r:0.14,g:0.49,b:1.0}));

	renderLoop();
}

function drawScene()
{
	glContext.clearColor(0.9, 0.9, 0.9, 1.0);
	glContext.enable(glContext.DEPTH_TEST);
	glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
	glContext.viewport(0, 0, c_width, c_height);

	camera.update();

	for(let i= 0;i<sceneObjects.length;i++)
	{
		sceneObjects[i].draw(camera);
	}
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

function focusOnTriangle1(){
    camera.easeTargetOfCamera(-5.5,1.5,-6,100);
    vec3.set(vecPosCamera,-5.5, 0, -2);
}

function focusOnTriangle2(){
    camera.easeTargetOfCamera(5.5,1.5,-9,100);
    vec3.set(vecPosCamera,5.5, 0, -5);
}

function focusOnTriangle3(){
    camera.easeTargetOfCamera(8.5,8.5,-4,100);
    vec3.set(vecPosCamera,8.5, 4, 0);
}

function setPositionSmooth() {
    camera.easePositionOfCamera(vecPosCamera[0],vecPosCamera[1], vecPosCamera[2], 100);
}