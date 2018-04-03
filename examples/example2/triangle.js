class Triangle
{
    constructor(verticesPositions, color){
        this.color = color;
        this.verticesPosition = verticesPositions;

        this.vertexBuffer = null;
        this.indexBuffer = null;
        this.colorBuffer = null;

        this.indices = [];
        this.vertices = [];
        this.colors = [];

        this.pMatrix = mat4.create();
        this.mvMatrix = mat4.create();

        this.init();
    }

    init(){
        this.vertices.push(this.verticesPosition[0][0] , this.verticesPosition[0][1] , this.verticesPosition[0][2]);
        this.vertices.push(this.verticesPosition[1][0] , this.verticesPosition[1][1] , this.verticesPosition[1][2]);
        this.vertices.push(this.verticesPosition[2][0] , this.verticesPosition[2][1] , this.verticesPosition[2][2]);

        for(let i =0;i<3;i++)
        {
            this.colors.push(this.color.r, this.color.g, this.color.b, 1.0);
        }

        this.indices = [0,1,2];

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

        glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
        glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);

        glContext.drawElements(glContext.TRIANGLES, this.indices.length, glContext.UNSIGNED_SHORT,0);
    }
}