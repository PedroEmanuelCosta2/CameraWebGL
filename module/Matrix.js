class Matrix {

	constructor(size){

		switch(size){
			case 2:
				this.module = mat2;
				break;
			case 3:
				this.module = mat3;
				break;
			case 4:
				this.module = mat4;
				break;
			default:
				console.log("Declare a correct matrix's size.")
				break;
		}
		this.matrix = this.module.create();
		this.identity();
	}

	identity(){
		this.module.identity(this.matrix);
	}

	translate(matrixToTranslate, vectorToTranslateBy){
		this.module.translate(this.matrix,matrixToTranslate.matrix,vectorToTranslateBy);
	}

	multiply(firstMatrix,secondMatrix){
		this.module.multiply(this.matrix,firstMatrix.matrix,secondMatrix.matrix);
	}

	rotateY(matrixToRotate, angleToRotate){
		return this.module.rotateY(this.matrix, matrixToRotate.matrix, angleToRotate);
	}

	perspective(radianAngle, viewPortRatio, nearBound, farBound){
	    this.module.perspective(this.matrix, radianAngle, viewPortRatio, nearBound, farBound);
    }

    lookAt(eye, center, up){
	    this.module.lookAt(this.matrix, eye, center, up);
    }

    frustum(left, right, bottom, top, near, far){
	    this.module.frustum(this.matrix, left, right, bottom, top, near, far);
    }

    ortho(left, right, bottom, top, near, far){
	    this.module.ortho(this.matrix, left, right, bottom, top, near, far);
    }

    inverse(matrixToInvert){
	    this.module.invert(this.matrix, matrixToInvert.matrix);
    }
}