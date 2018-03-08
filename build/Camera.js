class Camera {

	constructor(){
		this.mvMatrix = new Matrice(4);
		this.pMatrix = new Matrice(4);
	}

	uniform(){
	    this.uniformPMatrix();
		this.uniformMvMatrix();
	}

    uniformPMatrix(){
        glContext.uniformMatrix4fv(prg.pMatrixUniform, false, this.pMatrix.matrix);
    }

    uniformMvMatrix(){
        glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, this.mvMatrix.matrix);
    }

    perspective(radianAngle, viewPortRatio, nearBound, farBound){
        mat4.perspective(this.pMatrix.matrix, viewPortRatio, nearBound, farBound);
    }

	rotate(vectorToTranslateBy){
		let translationMat = new Matrice(4);
		translationMat.translate(translationMat, vectorToTranslateBy);
		this.mvMatrix.multiply(translationMat, this.mvMatrix);
	}

	rotateY(matrixToRotate, angleToRotate){
		this.mvMatrix.matrix = this.mvMatrix.rotateY(matrixToRotate, angleToRotate);
	}

}