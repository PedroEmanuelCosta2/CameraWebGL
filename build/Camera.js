class Camera {

	constructor(){
		this.mvMatrix = new Matrix(4);
		this.pMatrix = new Matrix(4);

		this.direction = vec3.fromValues(0,0,1);
		this.up = vec3.fromValues(0,1,0);
		this.position = vec3.create();

        this.viewportWidth = 0;
        this.viewportHeight = 0;

        this.tmpVec3 = vec3.create();
	}

	uniform(){
	    this.uniformPMatrix();
        this.uniformMvMatrix();
        this.update();
	}

    uniformPMatrix(){
        glContext.uniformMatrix4fv(prg.pMatrixUniform, false, this.pMatrix.matrix);
    }

    uniformMvMatrix(){
        glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, this.mvMatrix.matrix);
    }

    perspective(radianAngle, viewPortRatio, nearBound, farBound){
		this.pMatrix.perspective(radianAngle, viewPortRatio, nearBound, farBound);
    }

	rotate(vectorToTranslateBy){
		let translationMat = new Matrix(4);
		translationMat.translate(translationMat, vectorToTranslateBy);
		this.mvMatrix.multiply(translationMat, this.mvMatrix);
	}

	rotateY(matrixToRotate, angleToRotate){
		this.mvMatrix.matrix = this.mvMatrix.rotateY(matrixToRotate, angleToRotate);
	}

	translateCamera(x,y,z){
	    if (typeof x === "object"){
            this.position[0] = x[0] || 0;
            this.position[1] = x[1] || 0;
            this.position[2] = x[2] || 0;
        }else{
	        this.position[0] = x || 0;
            this.position[1] = y || 0;
            this.position[2] = z || 0;
        }
    }

    // lookAtCamera(x, y, z) {
    //     let dir = this.direction;
    //     let up = this.up;
    //
    //     if (typeof x === "object") {
    //         dir.copy(x);
    //     } else {
    //         dir.set(x, y, z);
    //     }
    //
    //     dir.sub(this.position).normalize();
    //
    //     vec3.copy(this.tmpVec3, dir).croos(up).normalize();
    //     // this.tmpVec3.copy(dir).cross(up).normalize();
    //
    //     up.copy(tmpVec3).cross(dir).normalize();
    // }

    update(){
        this.mvMatrix.lookAt(this.position, this.tmpVec3, this.up);
    }
}