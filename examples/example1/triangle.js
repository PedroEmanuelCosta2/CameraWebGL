class Triangle 
{
	constructor(radius, color, depth){
		this.color = color;
		this.radius = radius;
		this.depth = depth;

		this.vertexBuffer = null;
		this.indexBuffer = null;
		this.colorBuffer = null;

		this.indices = [];
		this.vertices = [];
		this.colors = [];
		this.mvMatrix = mat4.create();
		this.pMatrix = mat4.create();

		mat4.identity(this.mvMatrix);

		this.init();
	}

	init(){
		this.vertices.push(-1.0 * this.radius , -1.0 * this.radius , this.depth);
		this.vertices.push( 1.0 * this.radius , -1.0 * this.radius , this.depth);
		this.vertices.push( 0.0 , 1.0 * this.radius , this.depth);

		for(let i =0;i<3;i++)
		{
			this.colors.push(this.color.r, this.color.g, this.color.b, 1.0);
		}

		this.indices = [0,1,2];

		this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
		this.colorBuffer  = getVertexBufferWithVertices(this.colors);
		this.indexBuffer  = getIndexBufferWithIndices(this.indices);
	}

	rotate(){
        let a = 0.1 * Math.cos(rotationAroundZ);
        let b = 0.1 * Math.sin(rotationAroundZ);

        this.mvMatrix = mat4.rotateY(this.mvMatrix, this.mvMatrix, Math.PI);

        let translationMat = mat4.create();
        mat4.identity(translationMat);

        mat4.translate(translationMat, translationMat, vec3.fromValues(a,b,-1));
        mat4.multiply(this.mvMatrix, translationMat, this.mvMatrix);
    }

	draw(camera){
	    mat4.identity(this.mvMatrix);
	    mat4.identity(this.pMatrix);

		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexBuffer);
		glContext.vertexAttribPointer(prg.vertexPositionAttribute, 3, glContext.FLOAT, false, 0, 0);

		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.colorBuffer);
		glContext.vertexAttribPointer(prg.colorAttribute, 4, glContext.FLOAT, false, 0, 0);

		glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		this.rotate();

        let mvMatrix = camera.multMvMatrix(this.mvMatrix);
        let pMatrix = camera.multPMatrix(this.pMatrix);

        glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);
        glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);

		glContext.drawElements(glContext.TRIANGLES, this.indices.length, glContext.UNSIGNED_SHORT,0);
	}
}