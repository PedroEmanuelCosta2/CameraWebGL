class Cube
{
	constructor(position, color){
		this.color = color;
		this.position = position;

		this.vertexBuffer = null;
		this.indexBuffer = null;
		this.colorBuffer = null;

		this.indices = [];
		this.vertices = [];
		this.colors = [];

        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();
		this.init();
	}

	init(){

		this.vertices = [
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
            1.0, -1.0, -1.0,
            1.0,  1.0, -1.0,
            1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0, -1.0,
            1.0,  1.0,  1.0,
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,
            1.0, -1.0, -1.0,
            1.0, -1.0,  1.0,
            -1.0,  1.0, -1.0,
            1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            1.0,  1.0, -1.0,
            1.0,  1.0,  1.0,
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
            -1.0,  1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0,  1.0, -1.0,
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0 ];


		for(let i =0;i<=35;i++)
		{
			this.colors.push(this.color.r, this.color.g, this.color.b, 1.0);
            this.indices.push(i);
		}

        mat4.fromTranslation(this.mvMatrix, this.position);

		this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
		this.colorBuffer  = getVertexBufferWithVertices(this.colors);
		this.indexBuffer  = getIndexBufferWithIndices(this.indices);
	}

	draw(camera){
		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexBuffer);
		glContext.vertexAttribPointer(prg.vertexPositionAttribute, 3, glContext.FLOAT, false, 0, 0);

		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.colorBuffer);
		glContext.vertexAttribPointer(prg.colorAttribute, 4, glContext.FLOAT, false, 0, 0);

		glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        let mvMatrix = camera.multMvMatrix(this.mvMatrix);
        let pMatrix = camera.multPMatrix(this.pMatrix);

        glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);
        glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);

		glContext.drawElements(glContext.TRIANGLES, this.indices.length, glContext.UNSIGNED_SHORT,0);
	}
}