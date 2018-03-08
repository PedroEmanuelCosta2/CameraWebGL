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

	draw(){
		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexBuffer);
		glContext.vertexAttribPointer(prg.vertexPositionAttribute, 3, glContext.FLOAT, false, 0, 0);

		glContext.bindBuffer(glContext.ARRAY_BUFFER, this.colorBuffer);
		glContext.vertexAttribPointer(prg.colorAttribute, 4, glContext.FLOAT, false, 0, 0);

		glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		glContext.drawElements(glContext.TRIANGLES, this.indices.length, glContext.UNSIGNED_SHORT,0);
	}
}